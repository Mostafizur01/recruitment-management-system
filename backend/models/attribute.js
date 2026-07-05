import mongoose from "mongoose";

const attributeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["text", "number", "dropdown"],
      required: true,
    },
    option: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Attribute = mongoose.model("Attribute", attributeSchema);
export default Attribute;
