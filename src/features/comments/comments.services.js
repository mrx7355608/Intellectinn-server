import { ApiError } from "../../utils/ApiError.js";
import validator from "validator";

export function CommentsServices({ commentsDB }) {
    const listCommentByArticle = async (articleId) => {
        const comments = await commentsDB.findByArticleId(articleId);
        const populatedComments = await comments.populate(
            "author",
            "profilePicture fullname",
        );
        return populatedComments;
    };

    const addComment = async (data) => {
        // TODO: validate comment data
        const newComment = await commentsDB.insertData(data);
        return newComment;
    };

    const editComment = async (id, userId, changes) => {
        // Validate comment id
        if (validator.isMongoId(id)) {
            throw new ApiError("Invalid comment id", 400);
        }

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
            "profilePicture fullname",
        );
        return populatedUpdatedComment;
    };

    const removeComment = async (id, userId) => {
        // Validate comment id
        if (validator.isMongoId(id)) {
            throw new ApiError("Invalid comment id", 400);
        }

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
