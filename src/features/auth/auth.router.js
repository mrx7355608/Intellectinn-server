import { Router } from "express";
import { authControllers } from "./auth.controllers.js";
import { isGuest } from "../../middlewares/isGuest.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
import passport from "passport";

const authRouter = Router();

authRouter.post("/signup", isGuest, authControllers.signup);
authRouter.post("/login", isGuest, authControllers.login);
authRouter.post("/logout", isAuthenticated, authControllers.logout);
authRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/api/auth/failure",
        successRedirect: process.env.CLIENT_URL,
    })
);

authRouter.get("/failure", (req, res) => {
    res.json({ ok: false, error: "Unable to authenticate with google" });
});

export { authRouter };
