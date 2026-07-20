import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const formatName = (body) => {
  if (body.firstName && body.lastName) {
    return { firstName: body.firstName, lastName: body.lastName };
  }

  if (body.fullName) {
    const [firstName, ...rest] = body.fullName.trim().split(" ");
    return { firstName, lastName: rest.join(" ") || "" };
  }

  if (body.fastName) {
    const [firstName, ...rest] = body.fastName.trim().split(" ");
    return { firstName, lastName: rest.join(" ") || "" };
  }

  return { firstName: "", lastName: "" };
};

export const register = async (req, res) => {
  try {
    const {
      email,
      password,
      role = "candidate",
      location = "Unknown",
    } = req.body;
    const { firstName, lastName } = formatName(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const normalizedRole = String(role).trim().toLowerCase();
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      role: normalizedRole,
      location,
    });
    await newUser.save();
    return res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User account not found" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const jwtSecret = process.env.KEY;
    if (!jwtSecret) {
      throw new Error("JWT secret not configured");
    }

    const normalizedRole = String(user.role).trim().toLowerCase();
    const token = jwt.sign({ id: user._id, role: normalizedRole }, jwtSecret, {
      expiresIn: "7d",
    });

    const userObj = user.toObject ? user.toObject() : user;
    delete userObj.password;
    userObj.role = normalizedRole;

    return res.status(200).json({ token, user: userObj });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userObj = user.toObject ? user.toObject() : user;
    userObj.role = String(userObj.role).trim().toLowerCase();
    return res.status(200).json(userObj);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
