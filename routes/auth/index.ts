import { Router } from "express";
import { register, login, google, logout, getUser } from "../../controllers/auth";
import Joi from 'joi';
import { createValidator } from 'express-joi-validation'
import { isAuthenticated } from "../../middleware/auth";

const router = Router();
const validator = createValidator({});

// Server Side Validation
const registerSchema = Joi.object({
    name:Joi.string().min(3).max(15).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(8).max(32).required(),
})

// Server Side Validation
const loginSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(8).max(32).required(),
})

// When user try to register fire this function
router.post("/register", validator.body(registerSchema), register);
// When user try to login fire this function
router.post("/login", validator.body(loginSchema), login);
// When user try to google fire this function
router.post("/google", google);
// When user try to logout fire this function
router.get("/logout", isAuthenticated, logout);
router.get("/getAllUser", isAuthenticated, getUser);

export default router;