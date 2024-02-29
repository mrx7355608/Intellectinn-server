import { Router } from "express";
import { authControllers } from "../controllers/auth.controllers.js";
import { isGuest } from "../middlewares/isGuest.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const authRouter = Router();

authRouter.post("/signup", isGuest, authControllers.signup);
authRouter.post("/login", isGuest, authControllers.login);
authRouter.post("/logout", isAuthenticated, authControllers.logout);

export { authRouter };
