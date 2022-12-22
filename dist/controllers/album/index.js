"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAlbum = exports.deleteAlbum = exports.getAllAlbum = exports.getAlbum = exports.createAlbum = void 0;
const catchAsyncError_1 = __importDefault(require("../../middleware/catchAsyncError"));
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
const album_1 = __importDefault(require("../../models/album"));
exports.createAlbum = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newAlbum = new album_1.default(Object.assign({}, req.body));
    yield newAlbum.save();
    res.status(201).json({
        message: "Artist saved successfully",
        album: newAlbum,
    });
}));
exports.getAlbum = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const album = yield album_1.default.findOne({ _id: req.params.id });
    if (!album)
        return next(new errorHandler_1.default("album not found", 404));
    res.status(201).json({
        message: "album get successfully",
        album,
    });
}));
exports.getAllAlbum = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const album = yield album_1.default.find({ sort: { createdAt: 1 } });
    res.status(201).json({
        message: "album get successfully",
        album,
    });
}));
exports.deleteAlbum = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const artist = yield album_1.default.findByIdAndDelete({ _id: req.params.id });
    if (!artist)
        return next(new errorHandler_1.default("Artist not found", 404));
    res.status(201).json({
        message: "Delete successfully",
    });
}));
exports.updateAlbum = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // if user id match then update the user
    const update = yield album_1.default.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    }, { new: true });
    //   Response Data
    res.status(200).json({
        message: "Update Successfully",
        update,
    });
}));
