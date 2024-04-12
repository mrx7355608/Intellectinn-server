import { Router } from "express";
import { commentsControllers } from "./comments.controllers.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";

const commentsRouter = Router();

commentsRouter.get("/:articleId", commentsControllers.getAllCommentsOfArticle);

commentsRouter.use(isAuthenticated);
commentsRouter.post("/:articleId", commentsControllers.createNewComment);
commentsRouter.patch("/:commentId", commentsControllers.updateComment);
commentsRouter.delete("/:commentId", commentsControllers.deleteComment);

export { commentsRouter };
