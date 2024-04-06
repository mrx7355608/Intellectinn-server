import { ApiError } from "../../utils/ApiError.js";
import { validateMongoID } from "../../utils/validateMongoId.js";

export function BookmarkServices({ articlesDB }) {
    const addBookmark = async (articleID, me) => {
        // Validate article id
        validateMongoID(articleID, "article");

        // Check if article exists
        const article = await articlesDB.findById(articleID);
        if (!article) {
            throw new ApiError("Article not found", 404);
        }

        // Check if user has bookmarked the article already
        if (article.bookmarkedBy.includes(me._id)) {
            throw new ApiError("You have already bookmarked this article", 403);
        }

        // Bookmark article
        const updatedArticle = await articlesDB.insertInBookmarks(
            articleID,
            me.id
        );
        return updatedArticle.bookmarkedBy;
    };

    const removeBookmark = async (articleID, me) => {
        // Validate article id
        validateMongoID(articleID, "article");

        // Check if article exists
        const article = await articlesDB.findById(articleID);
        if (!article) {
            throw new ApiError("Article not found", 404);
        }

        // Check if user has bookmarked the article already
        if (article.bookmarkedBy.includes(me._id) === false) {
            throw new ApiError("You haven't bookmarked this article yet", 403);
        }

        // Bookmark article
        const updatedArticle = await articlesDB.removeFromBookmarks(
            articleID,
            me.id
        );
        return updatedArticle.bookmarkedBy;
    };

    const listBookmarkedArticles = async (userID) => {
        // Validate user id
        validateMongoID(userID, "user");

        const bookmarkedArticles = await articlesDB.findByFilter({
            bookmarkedBy: userID,
        });
        return bookmarkedArticles;
    };

    return {
        addBookmark,
        removeBookmark,
        listBookmarkedArticles,
    };
}
