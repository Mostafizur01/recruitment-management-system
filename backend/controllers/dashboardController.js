import Application from "../models/application.js";
import Position from "../models/position.js";
import CV from "../models/cv.js";
import Activity from "../models/activity.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments();
    const openPositions = await Position.countDocuments({ status: "Active" });
    const active = await Position.countDocuments({ status: "Active" });
    const closed = await Position.countDocuments({ status: "Closed" });
    const newAppsToday = await Application.countDocuments({
      appliedAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    });
    const recentActivities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(5);
    return res.status(200).json({
      stats: {
        totalApplications,
        openPositions,
        pendingCVs: 0,
        active,
        closed,
        newAppsToday,
      },
      recentActivities,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Dashboard data fetch failed", error: error.message });
  }
};
