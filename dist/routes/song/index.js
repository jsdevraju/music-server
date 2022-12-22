"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const song_1 = require("../../controllers/song");
const router = (0, express_1.Router)();
// When user try to register fire this function
router.post("/create", auth_1.isAuthenticated, (0, auth_1.adminRole)("admin"), song_1.createSong);
router.get("/song/:id", auth_1.isAuthenticated, song_1.getSong);
router.get("/getAllSong", auth_1.isAuthenticated, song_1.getAllSong);
router.delete("/delete/:id", auth_1.isAuthenticated, (0, auth_1.adminRole)("admin"), song_1.deleteSong);
router.put("/update/:id", auth_1.isAuthenticated, (0, auth_1.adminRole)("admin"), song_1.updateSong);
exports.default = router;
