"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const songSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    songUrl: {
        type: String,
        required: true
    },
    album: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Album"
    },
    artist: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "artist",
        required: true
    },
    language: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("songs", songSchema);
