import { ArticleModel } from "./articles.model.js";
import { BaseDataLayerFunctions } from "../../utils/BaseDataLayerFunctions.js";

const baseFunctions = BaseDataLayerFunctions(ArticleModel);

// FIND BY FILTER
async function findByFilter(filter) {
    const articles = await ArticleModel.find(filter)
        .populate("author", "profilePicture fullname")
        .sort("-createdAt");
    return articles;
}

// FIND ONE BY SLUG
async function findOneBySlug(slug) {
    const article = await ArticleModel.findOne({ slug });
    return article;
}

async function addRemoveLikes(articleID, userID, operationType) {
    let operation;

    switch (operationType) {
        case "add":
            operation = {
                $push: { likes: userID },
            };
            break;

        case "remove":
            operation = {
                $pull: { likes: userID },
            };
            break;
        default:
            throw new Error("Invalid Like Operation");
    }

    const article = await ArticleModel.findByIdAndUpdate(articleID, operation, {
        select: { likes: 1, _id: 0 },
        new: true,
    });
    return article;
}

async function insertInBookmarks(articleID, userID) {
    const article = await ArticleModel.findByIdAndUpdate(
        articleID,
        {
            $push: { bookmarkedBy: userID },
        },
        { select: { bookmarkedBy: 1 }, new: true },
    );
    return article;
}

async function removeFromBookmarks(articleID, userID) {
    const article = await ArticleModel.findByIdAndUpdate(
        articleID,
        {
            $pull: { bookmarkedBy: userID },
        },
        { select: { bookmarkedBy: 1 }, new: true },
    );
    return article;
}

export const articlesDB = {
    ...baseFunctions,
    findOneBySlug,
    findByFilter,
    insertInBookmarks,
    removeFromBookmarks,
    addRemoveLikes,
};
