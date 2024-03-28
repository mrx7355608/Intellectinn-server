import { ArticleModel } from "./articles.model.js";
import { BaseDataLayerFunctions } from "../../utils/BaseDataLayerFunctions.js";

const baseFunctions = BaseDataLayerFunctions(ArticleModel);

// FIND BY FILTER
async function findByFilter(filter) {
    const articles = await ArticleModel.find(filter).populate(
        "author",
        "profilePicture fullname",
    );
    return articles;
}

// FIND ONE BY SLUG
async function findOneBySlug(slug) {
    const article = await ArticleModel.findOne({ slug });
    return article;
}

export const articlesDB = {
    ...baseFunctions,
    findOneBySlug,
    findByFilter,
};
