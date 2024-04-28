import mongoose, { Types } from "mongoose";

interface user {
  name: string;
  email: string;
  password: string;
  otp: number;
  isVerified: boolean;
  todos: Types.ObjectId[];
}

const userSchema = new mongoose.Schema<user>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
