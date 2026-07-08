import mongoose from "mongoose";

const positionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    requiredAttributes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attribute",
      },
    ],
    status: {
      type: String,
      enum: ["Active", "Closed"],
      default: "Active",
    },
    version: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
);

const Position = mongoose.model("Position", positionSchema);
export default Position;
