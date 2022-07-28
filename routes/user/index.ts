import { Router } from "express";
import { getAllUser } from "../../controllers/user";
import { adminRole, isAuthenticated } from "../../middleware/auth";

const router = Router();

// When user try to register fire this function
router.get("/users", isAuthenticated, adminRole("admin"), getAllUser);

export default router;
