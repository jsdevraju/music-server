"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../../controllers/user");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
// When user try to register fire this function
router.get("/users", auth_1.isAuthenticated, (0, auth_1.adminRole)("admin"), user_1.getAllUser);
router.get("/user/details", auth_1.isAuthenticated, user_1.getUser);
exports.default = router;
