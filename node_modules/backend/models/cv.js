import mongoose from "mongoose";

const cvSchema = mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    positionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Position",
      required: true,
    },
    cvData: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      required: true,
    },
    version: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: { updatedAt: true, createdAt: false } },
);

const CV = mongoose.model("CV", cvSchema);
export default CV;
