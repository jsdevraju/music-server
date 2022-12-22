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
exports.updateArtist = exports.deleteArtist = exports.getAllArtist = exports.getArtist = exports.createNewArtists = void 0;
const catchAsyncError_1 = __importDefault(require("../../middleware/catchAsyncError"));
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
const artits_1 = __importDefault(require("../../models/artits"));
exports.createNewArtists = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newArtist = new artits_1.default(Object.assign({}, req.body));
    yield newArtist.save();
    res.status(201).json({
        message: "Artist saved successfully",
        artist: newArtist,
    });
}));
exports.getArtist = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const artist = yield artits_1.default.findOne({ _id: req.params.id });
    if (!artist)
        return next(new errorHandler_1.default("Artist not found", 404));
    res.status(201).json({
        message: "Artist get successfully",
        artist,
    });
}));
exports.getAllArtist = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const artist = yield artits_1.default.find({ sort: { createdAt: 1 } });
    res.status(201).json({
        message: "Artist get successfully",
        artist,
    });
}));
exports.deleteArtist = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const artist = yield artits_1.default.findByIdAndDelete({ _id: req.params.id });
    if (!artist)
        return next(new errorHandler_1.default("Artist not found", 404));
    res.status(201).json({
        message: "Delete successfully",
    });
}));
exports.updateArtist = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // if user id match then update the user
    const update = yield artits_1.default.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    }, { new: true });
    //   Response Data
    res.status(200).json({
        message: "Update Successfully",
        update,
    });
}));
