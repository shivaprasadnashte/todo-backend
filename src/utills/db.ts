import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI as string);
    console.log("New mongodb connection established");
  } catch (error) {
    console.log(error);
  }
}

export default connectDb;
