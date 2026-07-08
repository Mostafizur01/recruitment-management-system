import Application from "../models/application.js";
import Position from "../models/position.js";
import CV from "../models/cv.js";
import Activity from "../models/activity.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments();
    const openPositions = await Position.countDocuments({ status: "Active" });
    const pendingCVs = await CV.countDocuments({ status: "Pending" });
    const recentActivities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(5);
    res.status(200).json({
      stats: {
        totalApplications,
        openPositions,
        pendingCVs,
      },
      recentActivities,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Dashboard data fetch failed", error: error.message });
  }
};
