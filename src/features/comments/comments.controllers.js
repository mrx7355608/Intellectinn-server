import { CommentsServices } from "./comments.services.js";
import { commentsDB } from "./comments.data.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";

const commentsServices = CommentsServices({ commentsDB });

const getAllCommentsOfArticle = catchAsyncError(async (httpObject) => {
    const { articleId } = httpObject.params;
    const comments = await commentsServices.listCommentByArticle(articleId);
    return {
        status: 200,
        data: comments,
    };
});

const createNewComment = catchAsyncError(async (httpObject) => {
    const { articleId } = httpObject.params;
    const data = httpObject.body;
    const newComment = await commentsServices.addComment(articleId, data);
    return {
        status: 201,
        data: newComment,
    };
});

const updateComment = catchAsyncError(async (httpObject) => {
    const { articleId } = httpObject.params;
    const { _id } = httpObject.user;
    const changes = httpObject.body;
    const updatedComment = await commentsServices.editComment(
        articleId,
        _id,
        changes,
    );
    return {
        status: 200,
        data: updatedComment,
    };
});

const deleteComment = catchAsyncError(async (httpObject) => {
    const { articleId } = httpObject.params;
    const { _id } = httpObject.user;
    await commentsServices.removeComment(articleId, _id);
    return {
        status: 204,
        data: null,
    };
});

export const commentsControllers = {
    getAllCommentsOfArticle,
    createNewComment,
    updateComment,
    deleteComment,
};
