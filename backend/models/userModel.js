import mongoose from "mongoose";

const user = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    displayPhoto: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", user);
export default User;
