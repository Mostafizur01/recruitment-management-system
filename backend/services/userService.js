import User from "../models/user.js";

export const getUserById = (id) => User.findById(id).select("-password");
export const getAllUsers = () => User.find().select("-password");
