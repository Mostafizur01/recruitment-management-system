import User from "../models/user.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserPhoto = async (req, res) => {
  try {
    const { userId } = req.params;
    const { photoUrl } = req.body;

    if (req.user?.id !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this photo" });
    }

    if (!photoUrl) {
      return res.status(400).json({ message: "Photo data is missing" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { Photo: photoUrl },
      { new: true },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "Success", user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update photo" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
