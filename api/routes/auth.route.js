import express from "express";
import { google, signin, signout, signup } from "../controllers/auth.controller.js";
import { mySchema } from "../utils/inputCheck.js";
import { validate } from "../middlewares/validate.middleware.js";


const router = express.Router()

router.post('/sign-up',validate(mySchema),signup)
router.post("/sign-in",signin)
router.post("/google",google)
router.get("/sign-out",signout)

export default router