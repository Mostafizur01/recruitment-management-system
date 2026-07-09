import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  positionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Position",
    required: true,
  },
  applicantName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  resumeLink: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
  appliedAt: { type: Date, default: Date.now },
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;
