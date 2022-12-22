"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const joi_1 = __importDefault(require("joi"));
const express_joi_validation_1 = require("express-joi-validation");
const auth_1 = require("../../middleware/auth");
const artits_1 = require("../../controllers/artits");
const router = (0, express_1.Router)();
const validator = (0, express_joi_validation_1.createValidator)({});
// Server Side Validation
const artistSchema = joi_1.default.object({
    name: joi_1.default.string().min(5).max(25).required(),
    imageUrl: joi_1.default.string().required(),
    instagramLink: joi_1.default.string(),
    linkedinLink: joi_1.default.string(),
});
// When user try to register fire this function
router.post("/create", validator.body(artistSchema), auth_1.isAuthenticated, (0, auth_1.adminRole)("admin"), artits_1.createNewArtists);
router.get("/artist/:id", artits_1.getArtist);
router.get("/getAllArtist", artits_1.getAllArtist);
router.delete("/deleteArtist/:id", auth_1.isAuthenticated, (0, auth_1.adminRole)("admin"), artits_1.deleteArtist);
router.put("/updateArtist/:id", auth_1.isAuthenticated, (0, auth_1.adminRole)("admin"), artits_1.updateArtist);
exports.default = router;
