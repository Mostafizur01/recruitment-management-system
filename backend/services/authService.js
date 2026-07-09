import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const findUserByEmail = (email) => User.findOne({ email });

export const createUser = async ({
  firstName,
  lastName,
  email,
  password,
  role,
  location,
}) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    location,
  });
  return newUser.save();
};

export const signAccessToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.KEY, {
    expiresIn: "7d",
  });

export const sanitizeUser = (user) => {
  if (!user) return null;
  const object = user.toObject ? user.toObject() : { ...user };
  delete object.password;
  return object;
};
