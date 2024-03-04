import { CommentModel } from "./comment.model.js";
import { BaseDataLayerFunctions } from "../../utils/BaseDataLayerFunctions.js";

const baseFunctions = BaseDataLayerFunctions(CommentModel);

// FIND BY ARTICLE
async function findByArticleId(articleId) {
    const comments = await CommentModel.find({ articleId });
    return comments;
}

export const commentsDB = {
    ...baseFunctions,
    findByArticleId,
};
