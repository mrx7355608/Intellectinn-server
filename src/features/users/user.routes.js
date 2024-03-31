import { Router } from "express";
import { userControllers } from "./user.controllers.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";

const userRouter = Router();

userRouter.get("/profile/:userID", userControllers.getUserProfile);
userRouter.get("/search", userControllers.searchUsers);
userRouter.get("/followers/:userID", userControllers.getUserFollowers);
userRouter.get("/following/:userID", userControllers.getUserFollowings);

userRouter.use(isAuthenticated);
userRouter
    .route("/me")
    .get(userControllers.getLoggedInUser)
    .patch(userControllers.editUser)
    .delete(userControllers.deleteUser);
userRouter.get("/me/following");
userRouter.get("/me/followers");

userRouter.patch("/follow/:followingID", userControllers.followUser);
userRouter.patch("/unfollow/:followingID", userControllers.unfollowUser);

export { userRouter };
