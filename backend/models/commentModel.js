import mongoose from "mongoose";

const rating = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Rating = mongoose.model("Rating", rating);
export default Rating;
