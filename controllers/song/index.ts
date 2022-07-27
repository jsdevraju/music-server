import catchAsyncError from "../../middleware/catchAsyncError";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../../utils/errorHandler";
import Song from "../../models/song";

export const createSong = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const newSong = new Song({ ...req.body });

    await newSong.save();
    res.status(201).json({
      message: "Artist saved successfully",
      song: newSong,
    });
  }
);

export const getSong = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const song = await Song.findOne({ _id: req.params.id }).populate("artist", "name imageUrl");
    if (!song) return next(new ErrorHandler("album not found", 404));

    res.status(201).json({
      message: "Song get successfully",
      song,
    });
  }
);

export const getAllSong = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const song = await Song.find({ sort: { createdAt: 1 } }).populate("artist", "name imageUrl");

    res.status(201).json({
      message: "album get successfully",
      song,
    });
  }
);

export const deleteSong = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const song = await Song.findByIdAndDelete({ _id: req.params.id });
    if (!song) return next(new ErrorHandler("Artist not found", 404));

    res.status(201).json({
      message: "Delete successfully",
    });
  }
);

export const updateSong= catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // if user id match then update the user
    const update = await Song.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    //   Response Data
    res.status(200).json({
      message: "Update Successfully",
      update,
    });
  }
);
