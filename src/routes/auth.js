import { Router } from "express";
import { authControllers } from "../controllers/auth.controllers.js";
import { isGuest } from "../middlewares/isGuest.js";

const authRouter = Router();

authRouter.post("/signup", isGuest, authControllers.signup);

export { authRouter };
