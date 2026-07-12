import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
      required: true,
    },
    technologyTags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
