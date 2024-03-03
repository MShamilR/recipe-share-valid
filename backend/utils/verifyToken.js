import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "MISSING_TOKEN"));
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) return next(errorHandler(403, "INVALID_TOKEN"));
    req.user = decodedToken;
    next();
  });
};
