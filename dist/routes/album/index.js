"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const joi_1 = __importDefault(require("joi"));
const express_joi_validation_1 = require("express-joi-validation");
const auth_1 = require("../../middleware/auth");
const album_1 = require("../../controllers/album");
const router = (0, express_1.Router)();
const validator = (0, express_joi_validation_1.createValidator)({});
// Server Side Validation
const albumSchema = joi_1.default.object({
    name: joi_1.default.string().min(5).max(25).required(),
    imageUrl: joi_1.default.string().required(),
});
// When user try to register fire this function
router.post("/create-album", validator.body(albumSchema), auth_1.isAuthenticated, (0, auth_1.adminRole)("admin"), album_1.createAlbum);
router.get("/getAllAlbum", auth_1.isAuthenticated, album_1.getAllAlbum);
router.get("/getAlbum/:id", auth_1.isAuthenticated, album_1.getAlbum);
router.put("/update/:id", auth_1.isAuthenticated, (0, auth_1.adminRole)("admin"), album_1.updateAlbum);
router.delete("/delete/:id", auth_1.isAuthenticated, (0, auth_1.adminRole)("admin"), album_1.deleteAlbum);
exports.default = router;
