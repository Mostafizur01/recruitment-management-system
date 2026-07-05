import User from "../models/user.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error(
      "the problem on getUserProfile on userController file",
      error,
    );
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    console.log("the problem on getAlluser on userController file", error);
  }
};
