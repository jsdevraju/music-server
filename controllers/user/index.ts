import catchAsyncError from "../../middleware/catchAsyncError";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../../utils/errorHandler";
import User from "../../models/user";
import { IReqAuth, IUser } from "../../utils/interface";

export const getAllUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.find({});

    res.status(201).json({
      message: "user get successfully",
      user,
    });
  }
);

export const getUser = catchAsyncError(
  async (req: IReqAuth, res: Response, next: NextFunction) => {
    if (!req.user) return;
    const getUser = await User.findById(req.user._id);
    if (!getUser) next(new ErrorHandler("Not Found User", 404));
    const { password, ...otherInfo } = getUser?._doc as IUser;

    res.status(404).json({ message: "User found", user: otherInfo });
  }
);
