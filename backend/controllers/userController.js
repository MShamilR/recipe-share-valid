import User from "../models/userModel.js";
import bcrypt from "bcrypt"
import { errorHandler } from "../utils/errorHandler.js";

export const test = (req, res) => {
  res.json({ message: "API is working" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can update only your account"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  /*   if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can delete only your account"));
  } */
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json("USER_DELETED_SUCCESSFULLY");
  } catch (error) {
    next(error);
  }
};
