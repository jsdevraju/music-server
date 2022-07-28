import { Router } from "express";
import Joi from "joi";
import { createValidator } from "express-joi-validation";
import { adminRole, isAuthenticated } from "../../middleware/auth";
import {
  createNewArtists,
  getArtist,
  getAllArtist,
  deleteArtist,
  updateArtist,
} from "../../controllers/artits";

const router = Router();
const validator = createValidator({});

// Server Side Validation
const artistSchema = Joi.object({
  name: Joi.string().min(5).max(25).required(),
  imageUrl: Joi.string().required(),
  instagramLink: Joi.string(),
  linkedinLink: Joi.string(),
});

// When user try to register fire this function
router.post(
  "/create",
  validator.body(artistSchema),
  isAuthenticated,
  adminRole("admin"),
  createNewArtists
);
router.get("/artist/:id", getArtist);
router.get("/getAllArtist", getAllArtist);
router.delete(
  "/deleteArtist/:id",
  isAuthenticated,
  adminRole("admin"),
  deleteArtist
);
router.put(
  "/updateArtist/:id",
  isAuthenticated,
  adminRole("admin"),
  updateArtist
);
export default router;
