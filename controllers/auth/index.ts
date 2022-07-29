import catchAsyncError from "../../middleware/catchAsyncError";
import { Request, Response, NextFunction, response } from "express";
import ErrorHandler from "../../utils/errorHandler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user";
import { IReqAuth, IUser } from "../../utils/interface";

// When User try to register our app fire this function
export const register = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(201).json({
      message: "Register Successfully",
    });
  }
);
// When User try to login our app fire this function
export const login = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });
    // if not any user exits in out db
    if (!user) return next(new ErrorHandler("User not found", 404));
    // compare the password
    const hashPassword = await bcrypt.compare(req.body.password, user.password);
    // if not any user exits in out db
    if (!hashPassword)
      return next(new ErrorHandler("Invalid Credentials", 400));
    // Generate Token
    const token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`, {
      expiresIn: "1d",
    });

    // Minimize Password
    const { password, ...otherInfo } = user._doc as IUser;

    // store cookie and send response
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        user: otherInfo,
        token,
        message: "Login Successfully",
      });
  }
);
// When User try to google our app fire this function
export const google = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // Generate Token
      const token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`, {
        expiresIn: "1d",
      });

      const userDoc = user._doc as IUser;

      // store cookie and send response
      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          user: userDoc,
          token,
          message: "Login Successfully",
        });
    } else {
      const newUser = new User({
        ...req.body,
        formGoogle: true,
      });

      const saveUser = await newUser.save();
      // Generate Token
      const token = jwt.sign(
        { id: saveUser._id },
        `${process.env.JWT_SECRET}`,
        {
          expiresIn: "1d",
        }
      );

      const userDoc = saveUser._doc as IUser;

      // store cookie and send response
      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          user: userDoc,
          token,
          message: "Login Successfully",
        });
    }
  }
);
// When User try to logout our app fire this function
export const logout = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res
      .clearCookie("token", {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .status(200)
      .json({
        message: "Logged Our Successfully",
        token: null,
        user: null,
      });
  }
);

export const getUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.find({ sort: { createdAt: 1 } });
    if (user) {
      res.status(200).json({
        message: "User Successfully",
        user,
      });
    }
  }
);

export const updateUserRole = catchAsyncError(
  async (req: IReqAuth, res: Response, next: NextFunction) => {
    if (!req.user?._id) return;
    if (req.user.role === "admin") {
      const filter = { _id: req.params.id };
      const { role } = req.body;
      const admin = await User.findOneAndUpdate(
        filter,
        { role },
        { new: true }
      );
      res.status(200).json({
        message: "User successfully promote",
        admin,
      });
    }
  }
);
