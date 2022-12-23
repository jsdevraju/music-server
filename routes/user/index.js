import { Router } from "express";
import { getAllUser, getUser } from "../../controllers/user";
import { adminRole, isAuthenticated } from "../../middleware/auth";

const router = Router();

// When user try to register fire this function
router.get("/users", isAuthenticated, adminRole("admin"), getAllUser);
router.get("/user/details", isAuthenticated, getUser);

export default router;
