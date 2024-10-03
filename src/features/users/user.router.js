import { Router } from "express";
import { userControllers } from "./user.controllers.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
import { ArticleModel } from "../articles/articles.model.js";
import { UserModel } from "./user.model.js";
import { ApiError } from "../../utils/ApiError.js";

const userRouter = Router();

userRouter.get("/me", isAuthenticated, userControllers.getLoggedInUser);
userRouter.get("/search", userControllers.searchUsers);
userRouter.get("/:userID", userControllers.getUserProfile);
userRouter.get("/:userID/:contentType", async (req, res, next) => {
    try {
        const { userID, contentType } = req.params;

        const user = await UserModel.findById(userID);
        if (!user) {
            return next(new ApiError("User not found", 404));
        }

        let data;
        switch (contentType) {
            case "publications":
                data = await ArticleModel.find(
                    { author: userID },
                    "-content -updatedAt -likes -is_published",
                ).populate("author", "profilePicture fullname");
                break;

            case "bookmarks":
                data = await ArticleModel.find(
                    { bookmarkedBy: { $in: userID } },
                    "-content -updatedAt -likes -is_published",
                ).populate("author", "profilePicture fullname");
                break;

            case "followers": {
                const populated = await user.populate(
                    "followers",
                    "fullname profilePicture",
                );
                data = populated.followers;
                break;
            }

            case "following": {
                const populated = await user.populate(
                    "following",
                    "fullname profilePicture",
                );
                data = populated.following;
                break;
            }

            default:
                data = await ArticleModel.find(
                    { author: userID },
                    "-content -updatedAt -likes -is_published",
                ).populate("author", "profilePicture fullname");
                break;
        }

        return res.status(200).json({
            ok: true,
            data: data,
        });
    } catch (error) {
        next(error);
    }
});

userRouter.use(isAuthenticated);
userRouter
    .route("/me")
    .patch(userControllers.editUser)
    .delete(userControllers.deleteUser);

userRouter.patch("/follow/:followingID", userControllers.followUser);
userRouter.patch("/unfollow/:followingID", userControllers.unfollowUser);

export { userRouter };
