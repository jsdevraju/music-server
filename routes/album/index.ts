import { Router } from "express";
import Joi from "joi";
import { createValidator } from "express-joi-validation";
import { isAuthenticated } from "../../middleware/auth";
import {
  createAlbum,
  deleteAlbum,
  getAlbum,
  getAllAlbum,
  updateAlbum,
} from "../../controllers/album";

const router = Router();
const validator = createValidator({});

// Server Side Validation
const albumSchema = Joi.object({
  name: Joi.string().min(5).max(25).required(),
  imageUrl: Joi.string().required(),
});

// When user try to register fire this function
router.post(
  "/create-album",
  validator.body(albumSchema),
  isAuthenticated,
  createAlbum
);
router.get("/getAllAlbum", isAuthenticated, getAllAlbum);
router.get("/getAlbum/:id", isAuthenticated, getAlbum);
router.put("/update/:id", isAuthenticated, updateAlbum);
router.delete("/delete/:id", isAuthenticated, deleteAlbum);

export default router;
