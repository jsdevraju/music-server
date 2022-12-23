import catchAsyncError from "../../middleware/catchAsyncError.js";
import ErrorHandler from "../../utils/errorHandler.js";
import Artist from "../../models/artits/index.js";

export const createNewArtists = catchAsyncError(
  async (req, res, next) => {
    const newArtist = new Artist({ ...req.body });

    await newArtist.save();
    res.status(201).json({
      message: "Artist saved successfully",
      artist: newArtist,
    });
  }
);

export const getArtist = catchAsyncError(
  async (req, res, next) => {
    const artist = await Artist.findOne({ _id: req.params.id });
    if (!artist) return next(new ErrorHandler("Artist not found", 404));

    res.status(201).json({
      message: "Artist get successfully",
      artist,
    });
  }
);

export const getAllArtist = catchAsyncError(
  async (req, res, next) => {
    const artist = await Artist.find({ sort: { createdAt: 1 } });

    res.status(201).json({
      message: "Artist get successfully",
      artist,
    });
  }
);

export const deleteArtist = catchAsyncError(
  async (req, res, next) => {
    const artist = await Artist.findByIdAndDelete({ _id: req.params.id });
    if (!artist) return next(new ErrorHandler("Artist not found", 404));

    res.status(201).json({
      message: "Delete successfully",
    });
  }
);

export const updateArtist = catchAsyncError(
  async (req, res, next) => {
    // if user id match then update the user
    const update = await Artist.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    //  Data
    res.status(200).json({
      message: "Update Successfully",
      update,
    });
  }
);
