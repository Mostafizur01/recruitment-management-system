import CV from "../models/cv.js";

export const getCandidateCv = async (req, res) => {
  try {
    const cv = await CV.findOne({ candidate: req.params.candidateId });
    if (!cv) {
      return res.status(404).json({ message: "CV not found for this candidate" });
    }
    res.json(cv);
  } catch (error) {
    console.log("the error is on getCandidateCV");
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

    if (cv.version !== version) {
      return res
        .status(409)
        .json({ message: "Data outdated. Please refresh." });
    }

    cv.cvData = cvData;
    cv.version = version + 1;

    await cv.save();

    res.status(200).json({ message: "CV updated successfully", cv });
  } catch (error) {
    console.error("the problem is on cvController", error);
    res.status(500).json({ message: "Server error", error: error.message });
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
