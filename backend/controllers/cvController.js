import CV from "../models/cv.js";

export const getCandidateCv = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const { id: loggedInUserId, role } = req.user;

    const userRole = String(role).trim().toLowerCase();
    const isOwner = loggedInUserId === candidateId;
    const isAdmin = userRole === "admin";
    const isRecruiter = userRole === "recruiter";

    if (!isOwner && !isAdmin && !isRecruiter) {
      return res
        .status(403)
        .json({ message: "You don't have permission to access this CV" });
    }

    const cv = await CV.findOne({ candidateId });
    if (!cv) {
      return res
        .status(404)
        .json({ message: "CV not found for this candidate" });
    }

    return res.json(cv);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const createCV = async (req, res) => {
  try {
    const { id: userId, role } = req.user;
    const userRole = String(role).trim().toLowerCase();

    if (userRole !== "candidate") {
      return res
        .status(403)
        .json({ message: "Only candidates can create CVs" });
    }

    const { cvData, positionId } = req.body;

    if (!cvData) {
      return res.status(400).json({ message: "cvData is required" });
    }

    const existingCV = await CV.findOne({ candidateId: userId });
    if (existingCV) {
      return res
        .status(409)
        .json({ message: "CV already exists. Use update instead." });
    }

    const newCV = new CV({
      candidateId: userId,
      cvData,
      version: 1,
      ...(positionId ? { positionId } : {}),
    });

    const savedCV = await newCV.save();
    return res.status(201).json(savedCV);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create CV" });
  }
};

export const updateCV = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const { role } = req.user;
    const userRole = String(role).trim().toLowerCase();

    if (userRole !== "admin") {
      return res
        .status(403)
        .json({ message: "Only administrators can edit CVs" });
    }

    const existingCV = await CV.findOne({ candidateId });
    if (!existingCV) {
      return res.status(404).json({ message: "CV not found" });
    }

    const { cvData, positionId } = req.body;

    const updateData = {
      cvData: cvData || existingCV.cvData,
      version: (existingCV.version || 1) + 1,
    };

    if (positionId) {
      updateData.positionId = positionId;
    }

    const updatedCV = await CV.findOneAndUpdate({ candidateId }, updateData, {
      new: true,
    });

    return res.status(200).json(updatedCV);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update CV" });
  }
};

export const getAllCVs = async (req, res) => {
  try {
    const { role } = req.user;
    const userRole = String(role).trim().toLowerCase();

    if (!["admin", "recruiter"].includes(userRole)) {
      return res
        .status(403)
        .json({ message: "You don't have permission to access all CVs" });
    }

    const allCVs = await CV.find()
      .populate("candidateId", "firstName lastName email role location Photo")
      .populate("positionId", "title company");

    return res.status(200).json(allCVs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
