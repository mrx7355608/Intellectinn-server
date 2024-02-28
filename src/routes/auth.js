import { Router } from "express";
import { authControllers } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/signup", authControllers.signup);

export { authRouter };
