import { Router } from "express";
import { bookmarkControllers } from "./bookmark.controllers.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";

export const bookmarkRouter = Router();

bookmarkRouter.use(isAuthenticated);
bookmarkRouter.get("/articles", bookmarkControllers.getBookmarkedArticles);
bookmarkRouter.post("/:articleID", bookmarkControllers.addBookmark);
bookmarkRouter.delete("/:articleID", bookmarkControllers.removeBookmark);
