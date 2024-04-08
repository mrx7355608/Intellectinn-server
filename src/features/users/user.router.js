import { Router } from "express";
import { userControllers } from "./user.controllers.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";

const userRouter = Router();

userRouter.get("/me", isAuthenticated, userControllers.getLoggedInUser);
userRouter.get("/search", userControllers.searchUsers);
userRouter.get("/:userID", userControllers.getUserProfile);
userRouter.get("/followers/:userID", userControllers.getUserFollowers);
userRouter.get("/following/:userID", userControllers.getUserFollowings);

userRouter.use(isAuthenticated);
userRouter
    .route("/me")
    .patch(userControllers.editUser)
    .delete(userControllers.deleteUser);

userRouter.patch("/follow/:followingID", userControllers.followUser);
userRouter.patch("/unfollow/:followingID", userControllers.unfollowUser);

export { userRouter };
