import { Router } from "express";
import { bookmarkControllers } from "./bookmark.controllers.js";

export const bookmarkRouter = Router();

bookmarkRouter.get("/articles", bookmarkControllers.getBookmarkedArticles);
bookmarkRouter.post("/:articleID", bookmarkControllers.addBookmark);
bookmarkRouter.delete("/:articleID", bookmarkControllers.removeBookmark);
