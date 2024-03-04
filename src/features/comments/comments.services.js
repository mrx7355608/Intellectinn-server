import { ApiError } from "../../utils/ApiError.js";
import { filterUnwantedFields } from "../../utils/filterUnwantedFields.js";
import { validateMongoID } from "../../utils/validateMongoId.js";
import { commentValidator } from "./comments.validators.js";

export function CommentsServices({ commentsDB, articlesDB }) {
    const listCommentByArticle = async (articleId) => {
        // Validate articleId
        validateMongoID(articleId, "article");

        // Check if article exists
        const article = await articlesDB.findById(articleId);
        if (!article) {
            throw new ApiError("Article not found", 404);
        }

        // Fetch  comments from database
        const comments = await commentsDB.findByArticleId(articleId);
        const populatedComments = await comments.populate(
            "author",
            "profilePicture fullname"
        );
        return populatedComments;
    };

    const addComment = async (articleId, userId, data) => {
        // Validate articleId
        validateMongoID(article, "article");

        // Check if article exists
        const article = await articlesDB.findById(articleId);
        if (!article) {
            throw new ApiError("Article not found", 404);
        }

        // Filter un-wanted fields
        const filteredObject = filterUnwantedFields(data, ["text"]);

        // Validate comment data
        commentValidator(filteredObject);

        const commentDataObject = {
            ...filteredObject,
            articleId: articleId,
            author: userId,
        };

        const newComment = await commentsDB.insertData(commentDataObject);
        return newComment;
    };

    const editComment = async (id, userId, changes) => {
        // Validate comment id
        validateMongoID(id);

        // TODO: Validate new comment changes

        // Check if comment exists
        const comment = await commentsDB.findById(id);
        if (!comment) {
            throw new ApiError("Comment  not found", 404);
        }

        // Check if user is the author of the comment
        if (userId !== comment.author) {
            throw new ApiError("You cannot edit this comment", 403);
        }

        // Finally, update comment
        const updatedComment = await commentsDB.udpateData(id, changes);
        const populatedUpdatedComment = await updatedComment.populate(
            "author",
            "profilePicture fullname"
        );
        return populatedUpdatedComment;
    };

    const removeComment = async (id, userId) => {
        // Validate comment id
        validateMongoID(id);

        // Check if comment exists
        const comment = await commentsDB.findById(id);
        if (!comment) {
            throw new ApiError("Comment  not found", 404);
        }

        // Check if user is the author of the comment
        if (userId !== comment.author) {
            throw new ApiError("You cannot delete this comment", 403);
        }

        await commentsDB.deleteData(id);
        return null;
    };

    return {
        listCommentByArticle,
        addComment,
        editComment,
        removeComment,
    };
}
