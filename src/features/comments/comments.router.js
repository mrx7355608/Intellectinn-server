import { Router } from "express";
import { commentsControllers } from "./comments.controllers.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";

const commentsRouter = Router();

commentsRouter.get("/", commentsControllers.getAllCommentsOfArticle);

commentsRouter.use(isAuthenticated);
commentsRouter.post("/", commentsControllers.createNewComment);
commentsRouter.patch("/:articleId", commentsControllers.updateComment);
commentsRouter.delete("/:articleId", commentsControllers.deleteComment);

export { commentsRouter };
