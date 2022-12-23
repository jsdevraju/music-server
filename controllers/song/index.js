import catchAsyncError from "../../middleware/catchAsyncError.js";
import ErrorHandler from "../../utils/errorHandler.js";
import Song from "../../models/song/index.js";

export const createSong = catchAsyncError(
  async (req, res, next) => {
    const newSong = new Song({ ...req.body });

    await newSong.save();
    res.status(201).json({
      message: "Artist saved successfully",
      song: newSong,
    });
  }
);

export const getSong = catchAsyncError(
  async (req, res, next) => {
    const song = await Song.findOne({ _id: req.params.id }).populate("artist", "name imageUrl");
    if (!song) return next(new ErrorHandler("album not found", 404));

    res.status(201).json({
      message: "Song get successfully",
      song,
    });
  }
);

export const getAllSong = catchAsyncError(
  async (req, res, next) => {
    const song = await Song.find({ sort: { createdAt: 1 } }).populate("artist", "name imageUrl");

    res.status(201).json({
      message: "album get successfully",
      song,
    });
  }
);

export const deleteSong = catchAsyncError(
  async (req, res, next) => {
    const song = await Song.findByIdAndDelete({ _id: req.params.id });
    if (!song) return next(new ErrorHandler("Artist not found", 404));

    res.status(201).json({
      message: "Delete successfully",
    });
  }
);

export const updateSong= catchAsyncError(
  async (req, res, next) => {
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
