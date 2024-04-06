import { BookmarkServices } from "./bookmark.services.js";
import { articlesDB } from "../articles/articles.data.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";

const bookmarkServices = BookmarkServices({ articlesDB });

const addBookmark = catchAsyncError(async (httpObject) => {
    const user = httpObject.user;
    const { articleID } = httpObject.params;
    const newBookmarkList = await bookmarkServices.addBookmark(articleID, user);
    return {
        status: 200,
        data: newBookmarkList,
    };
});

const removeBookmark = catchAsyncError(async (httpObject) => {
    const user = httpObject.user;
    const { articleID } = httpObject.params;
    const newBookmarkList = await bookmarkServices.removeBookmark(
        articleID,
        user
    );
    return {
        status: 200,
        data: newBookmarkList,
    };
});

const getBookmarkedArticles = catchAsyncError(async (httpObject) => {
    const userID = String(httpObject.user._id);
    const bookmarkedArticles = await bookmarkServices.listBookmarkedArticles(
        userID
    );
    return {
        status: 200,
        data: bookmarkedArticles,
    };
});

export const bookmarkControllers = {
    addBookmark,
    removeBookmark,
    getBookmarkedArticles,
};
