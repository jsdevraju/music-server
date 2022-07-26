import { Router } from "express";
import Joi from "joi";
import { createValidator } from "express-joi-validation";
import { isAuthenticated } from "../../middleware/auth";
import { createNewArtists, getArtist, getAllArtist, deleteArtist, updateArtist } from "../../controllers/artits";

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
router.post("/create", validator.body(artistSchema), isAuthenticated, createNewArtists);
router.get("/artist/:id", getArtist);
router.get("/getAllArtist", getAllArtist);
router.delete("/deleteArtist/:id", isAuthenticated, deleteArtist);
router.put("/updateArtist/:id", isAuthenticated, updateArtist);
export default router;
