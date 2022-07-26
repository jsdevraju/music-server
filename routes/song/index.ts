import { Router } from "express";
import Joi from "joi";
import { createValidator } from "express-joi-validation";
import { isAuthenticated } from "../../middleware/auth";
import { createSong, deleteSong, getAllSong, getSong, updateSong } from "../../controllers/song";

const router = Router();
const validator = createValidator({});

// Server Side Validation
const songSchema = Joi.object({
  name: Joi.string().min(5).max(25).required(),
  imageUrl: Joi.string().required(),
  instagramLink: Joi.string(),
  linkedinLink: Joi.string(),
});

// When user try to register fire this function
router.post("/create", validator.body(songSchema), isAuthenticated, createSong);
router.get("/song/:id", getSong);
router.get("/getAllSong", getAllSong);
router.delete("/delete/:id", isAuthenticated, deleteSong);
router.put("/update/:id", isAuthenticated, updateSong);

export default router;
