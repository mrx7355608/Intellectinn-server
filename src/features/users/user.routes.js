import { Router } from "express";
import { userControllers } from "./user.controllers.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";

const userRouter = Router();

userRouter.get("/profile/:userID", userControllers.getUserProfile);
userRouter.get("/search", userControllers.searchUsers);

userRouter.use(isAuthenticated);
userRouter.get("/me", userControllers.getLoggedInUser);
userRouter.patch("/update-account", userControllers.editUser);
userRouter.delete("/delete-account", userControllers.deleteUser);
userRouter.patch("/follow/:followingID", userControllers.followUser);
userRouter.patch("/unfollow/:followingID", userControllers.unfollowUser);

export { userRouter };
