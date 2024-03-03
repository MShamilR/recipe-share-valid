import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authorise = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      console.log(req.user);
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json("INVALID_TOKEN")
      /* throw new Error("ACCESS_DENIED"); */
    }
  }
  if (!token) {
    res.status(401).json("MISSING_TOKEN");
    /*throw new Error("MISSING_TOKEN"); */
  }
};
