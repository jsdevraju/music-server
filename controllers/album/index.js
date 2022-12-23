import catchAsyncError from "../../middleware/catchAsyncError.js";
import ErrorHandler from "../../utils/errorHandler.js";
import Album from "../../models/album/index.js";

export const createAlbum = catchAsyncError(async (req, res, next) => {
  const newAlbum = new Album({ ...req.body });

  await newAlbum.save();
  res.status(201).json({
    message: "Artist saved successfully",
    album: newAlbum,
  });
});

export const getAlbum = catchAsyncError(async (req, res, next) => {
  const album = await Album.findOne({ _id: req.params.id });
  if (!album) return next(new ErrorHandler("album not found", 404));

  res.status(201).json({
    message: "album get successfully",
    album,
  });
});

export const getAllAlbum = catchAsyncError(async (req, res, next) => {
  const album = await Album.find({ sort: { createdAt: 1 } });

  res.status(201).json({
    message: "album get successfully",
    album,
  });
});

export const deleteAlbum = catchAsyncError(async (req, res, next) => {
  const artist = await Album.findByIdAndDelete({ _id: req.params.id });
  if (!artist) return next(new ErrorHandler("Artist not found", 404));

  res.status(201).json({
    message: "Delete successfully",
  });
});

export const updateAlbum = catchAsyncError(async (req, res, next) => {
  // if user id match then update the user
  const update = await Album.findByIdAndUpdate(
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
});
