import mongoose from "mongoose";

const mongoDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);
    console.log("mongoose connected");
  } catch (error) {
    console.log("problem on mongoose connection", error);
  }
};

export default mongoDB;
