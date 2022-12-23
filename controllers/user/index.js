import catchAsyncError from "../../middleware/catchAsyncError";
import ErrorHandler from "../../utils/errorHandler";
import User from "../../models/user";

export const getAllUser = catchAsyncError(
  async (req, res, next) => {
    const user = await User.find({});

    res.status(201).json({
      message: "user get successfully",
      user,
    });
  }
);

export const getUser = catchAsyncError(
  async (req, res, next) => {
    if (!req.user) return;
    const getUser = await User.findById(req.user._id);
    if (!getUser) next(new ErrorHandler("Not Found User", 404));
    const { password, ...otherInfo } = getUser?._doc

    res.status(200).json({ message: "User found", user: otherInfo });
  }
);
