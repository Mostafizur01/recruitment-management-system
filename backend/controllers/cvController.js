import CV from "../models/cv.js";

export const getCandidateCv = async (req, res) => {
  try {
    const candidateId = req.params.candidateId;
    const cv = await CV.findOne({ candidateId });
    if (!cv) {
      return res
        .status(404)
        .json({ message: "CV not found for this candidate" });
    }

    const userRole = String(req.user.role).toLowerCase();
    const isOwner = req.user.id === candidateId;
    const isAdmin = ["admin", "recruiter", "leader"].includes(userRole);

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Forbidden to access this CV" });
    }

    return res.json(cv);
  } catch (error) {
    console.error("the error is on getCandidateCV", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const updateCV = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const { cvData, version } = req.body;

    const cv = await CV.findOne({ candidateId });
    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    const userRole = String(req.user.role).toLowerCase();
    const isOwner = req.user.id === candidateId;
    const isAdmin = ["admin", "recruiter", "leader"].includes(userRole);
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Forbidden to update this CV" });
    }

    if (cv.version !== version) {
      return res
        .status(409)
        .json({ message: "Data outdated. Please refresh." });
    }

    cv.cvData = cvData;
    cv.version = version + 1;

    await cv.save();

    return res.status(200).json({ message: "CV updated successfully", cv });
  } catch (error) {
    console.error("the problem is on cvController", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getAllCVs = async (req, res) => {
  try {
    const allCV = await CV.find().populate("candidateId");
    res.status(200).json(allCV);
  } catch (error) {
    console.error("the problem is on getAllCVs", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
