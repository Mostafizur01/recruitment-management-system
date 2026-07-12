import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
  status: String,
});

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;
