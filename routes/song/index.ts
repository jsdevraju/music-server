import { Router } from "express";
import { adminRole, isAuthenticated } from "../../middleware/auth";
import {
  createSong,
  deleteSong,
  getAllSong,
  getSong,
  updateSong,
} from "../../controllers/song";

const router = Router();

// When user try to register fire this function
router.post("/create", isAuthenticated, adminRole("admin"), createSong);
router.get("/song/:id", isAuthenticated, getSong);
router.get("/getAllSong", isAuthenticated, getAllSong);
router.delete("/delete/:id", isAuthenticated, adminRole("admin"), deleteSong);
router.put("/update/:id", isAuthenticated, adminRole("admin"), updateSong);

export default router;
