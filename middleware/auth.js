import catchAsyncError from "./catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const isAuthenticated = catchAsyncError(
  async (req, res, next) => {
    const token =
      req.headers.authorization?.split("Bearer ")[1] || req.cookies.token;

    if (!token)
      return next(
        new ErrorHandler("Invalid authorization token. please try again", 400)
      );

    const decoded = jwt.verify(
      token,
      `${process.env.JWT_SECRET}`
    );

    const user = await User.findById(decoded.id);
    if (!user)
      return next(
        new ErrorHandler("Invalid authorization token. please try again", 400)
      );

    req.user = user;

    next();
  }
);

export const adminRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) return;
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allow to this resource`,
          403
        )
      );
    }
    next();
  };
};
