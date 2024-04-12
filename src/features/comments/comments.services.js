import { ApiError } from "../../utils/ApiError.js";
import { filterUnwantedFields } from "../../utils/filterUnwantedFields.js";
import { validateMongoID } from "../../utils/validateMongoId.js";
import { commentValidator } from "./comments.validators.js";

export function CommentsServices({ commentsDB, articlesDB }) {
    const listCommentsByArticle = async (articleId) => {
        // Validate articleId
        validateMongoID(articleId, "article");

        // Check if article exists
        const article = await articlesDB.findById(articleId);
        if (!article) {
            throw new ApiError("Article not found", 404);
        }

        // Fetch  comments from database
        const comments = await commentsDB.findByArticleId(articleId);
        return comments;
    };

    const addComment = async (articleId, userId, data) => {
        // Validate articleId
        validateMongoID(articleId, "article");

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
            user: userId,
        };

        const newComment = await commentsDB.insertData(commentDataObject);
        const populatedComment = newComment.populate(
            "user",
            "profilePicture fullname",
        );
        return populatedComment;
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
        if (userId !== comment.user) {
            throw new ApiError("You cannot edit this comment", 403);
        }

        // Finally, update comment
        const updatedComment = await commentsDB.udpateData(id, changes);
        const populatedUpdatedComment = await updatedComment.populate(
            "author",
            "profilePicture fullname",
        );
        return populatedUpdatedComment;
    };

    const removeComment = async (commentId, userId) => {
        // Validate comment id
        validateMongoID(commentId);

        // Check if comment exists
        const comment = await commentsDB.findById(commentId);
        if (!comment) {
            throw new ApiError("Comment not found", 404);
        }

        // Check if user is the author of the comment
        if (userId !== String(comment.user)) {
            throw new ApiError("You cannot delete this comment", 403);
        }

        await commentsDB.deleteData(commentId);
        return null;
    };

    return {
        listCommentsByArticle,
        addComment,
        editComment,
        removeComment,
    };
}
