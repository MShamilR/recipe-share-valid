import mongoose from "mongoose";

const rating = mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
    ratedBy: {
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
