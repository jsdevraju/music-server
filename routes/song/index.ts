import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth";
import {
  createSong,
  deleteSong,
  getAllSong,
  getSong,
  updateSong,
} from "../../controllers/song";

const router = Router();

// When user try to register fire this function
router.post("/create", isAuthenticated, createSong);
router.get("/song/:id", isAuthenticated, getSong);
router.get("/getAllSong", isAuthenticated, getAllSong);
router.delete("/delete/:id", isAuthenticated, deleteSong);
router.put("/update/:id", isAuthenticated, updateSong);

export default router;
