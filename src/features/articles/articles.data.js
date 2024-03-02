import { ArticleModel } from "./articles.model.js";
import { BaseDataLayerFunctions } from "../../utils/BaseDataLayerFunctions.js";

const baseFunctions = BaseDataLayerFunctions(ArticleModel);

// FIND BY SLUG
async function findBySlug(slug) {
    const article = await ArticleModel.findOne({ slug });
    return article;
}

export const articlesDB = {
    ...baseFunctions,
    findBySlug,
};
