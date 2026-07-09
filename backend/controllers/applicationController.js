import Application from "../models/application.js";

export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("positionId")
      .populate("candidateId");
    res.status(200).json(applications);
  } catch (error) {
    console.error("problem on getAllApplications", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createApplication = async (req, res) => {
  try {
    const { applicantName, email, resumeLink } = req.body;
    const application = new Application({
      userId: req.user.id,
      positionId: req.params.positionId,
      applicantName,
      email,
      resumeLink,
    });
    await application.save();
    return res.status(201).json(application);
  } catch (error) {
    console.error("problem on createApplication", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(200).json(updatedApplication);
  } catch (error) {
    console.error("problem on updateApplication", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("problem on deleteApplication", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
