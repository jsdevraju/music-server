import catchAsyncError from "../../middleware/catchAsyncError";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../../utils/errorHandler";
import User from "../../models/user";

export const getAllUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.find({});

    res.status(201).json({
      message: "user get successfully",
      user,
    });
  }
);
