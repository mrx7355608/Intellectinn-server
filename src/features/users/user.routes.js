import { Router } from "express";
import { userControllers } from "./user.controllers.js";

const userRouter = Router();

userRouter.get("/me", userControllers.getLoggedInUser)
userRouter.get("/profile/:userID", userControllers.getUserProfile)
userRouter.patch("/update-account", userControllers.editUser);
userRouter.delete("/delete-account", userControllers.deleteUser);
userRouter.patch("/follow/:followingID", userControllers.followUser);
userRouter.patch("/unfollow/:followingID", userControllers.unfollowUser);

export { userRouter };
