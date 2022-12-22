"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const artistSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    instagramLink: {
        type: String,
    },
    linkedinLink: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("artist", artistSchema);
