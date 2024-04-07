import { ApiError } from "../../utils/ApiError.js";
import {
    articleValidator,
    editArticleValidator,
    slugValidator,
} from "./article.validators.js";
import { validateMongoID } from "../../utils/validateMongoId.js";
import { filterUnwantedFields } from "../../utils/filterUnwantedFields.js";
import { customSlugBuilder } from "../../utils/customSlugBuilder.js";

export function ArticleServices({ articlesDB }) {
    const searchTags = async (query) => {
        const articles = await articlesDB.findByFilter(
            {
                tags: {
                    $regex: new RegExp(query),
                    $options: "i",
                },
            },
            "tags"
        );
        const tagsList = [];
        articles.forEach((a) => {
            tagsList.push(...a.tags);
        });

        const tags = Array.from(new Set(tagsList));
        return tags;
    };
    const searchArticles = async (query) => {
        const regexMongooseQueryObject = {
            $regex: new RegExp(query),
            $options: "i",
        };

        const articles = await articlesDB.findByFilter({
            $or: [
                { title: regexMongooseQueryObject },
                { summary: regexMongooseQueryObject },
                { tags: regexMongooseQueryObject },
            ],
        });
        return articles;
    };

    const listPublishedArticles = async (tag) => {
        let articles;
        if (tag) {
            articles = await articlesDB.findByFilter({
                is_published: true,
                tags: {
                    $regex: new RegExp(tag),
                    $options: "i",
                },
            });
        } else {
            articles = await articlesDB.findByFilter({
                is_published: true,
            });
        }
        return articles;
    };

    const listPublishedArticlesOfUser = async (userID) => {
        const articles = await articlesDB.findByFilter({
            is_published: true,
            author: userID,
        });
        return articles;
    };

    const listArticlesByTag = async (tag) => {
        const articles = await articlesDB.findByFilter({
            tag,
            is_published: true,
        });
        const populatedArticles = await articles.populate(
            "author",
            "fullname profilePicture"
        );
        return populatedArticles;
    };

    const listOneArticleBySlug = async (slug) => {
        // Validate slug
        slugValidator(slug);

        // Get article from db
        const article = await articlesDB.findOneBySlug(slug);
        if (!article) {
            throw new ApiError("Article not found", 404);
        }

        const populatedArticle = await article.populate(
            "author",
            "fullname profilePicture"
        );
        return populatedArticle;
    };

    const addArticle = async (data, userId) => {
        if (Object.keys(data).length < 1) {
            throw new ApiError("Article data is missing", 404);
        }

        // Filter un-wanted fields
        const allowedFields = [
            "title",
            "content",
            "thumbnail",
            "summary",
            "tags",
            "timeToReadInMinutes",
            "is_published",
        ];
        const filteredObject = filterUnwantedFields(data, allowedFields);

        // Validate article data
        articleValidator(filteredObject);

        // Create article data object
        const articleDataObject = {
            ...filteredObject,
            slug: customSlugBuilder(data.title),
            author: userId,
        };
        const article = await articlesDB.insertData(articleDataObject);
        return article;
    };

    const editArticle = async (id, userId, changes) => {
        const article = await verifyArticleUtil(id);
        let dataToUpdate;

        // Check if user is the author
        if (String(article.author) !== userId) {
            throw new ApiError("You cannot edit this article", 403);
        }

        // Filter un-wanted field from new data
        const filteredObject = filterUnwantedFields(changes, [
            "title",
            "content",
            "summary",
            "tags",
            "thumbnail",
        ]);
        dataToUpdate = filteredObject;

        // Validate new data
        editArticleValidator(dataToUpdate);

        // Update the slug if article title has changed
        const previousTitle = article.title;
        const newTitle = filteredObject.title;
        if (filteredObject.title && previousTitle !== newTitle) {
            dataToUpdate = {
                ...filteredObject,
                slug: customSlugBuilder(filteredObject.title || article.title),
            };
        }
        // Edit article
        const updatedArticle = await articlesDB.updateData(id, dataToUpdate);
        return updatedArticle;
    };

    const removeArticle = async (id, userId) => {
        const article = await verifyArticleUtil(id);

        // Check if user is the author
        if (String(article.author) !== userId) {
            throw new ApiError("You cannot delete this article", 403);
        }

        // Delete article
        await articlesDB.deleteData(id);
        return null;
    };

    const publishArticle = async (id, userId) => {
        const article = await verifyArticleUtil(id);

        // Check if the user is author of article
        if (article.author !== userId) {
            throw new ApiError("You cannot publish this article", 403);
        }

        // Check if article is already published
        if (article.is_published === true) {
            throw new ApiError("Article is published already", 400);
        }

        // Unpublish article
        await articlesDB.updateData(id, { is_published: true });
        return null;
    };

    const unPublishArticle = async (id, userId) => {
        const article = await verifyArticleUtil(id);

        // Check if the user is author of article
        if (article.author !== userId) {
            throw new ApiError("You cannot un-publish this article", 403);
        }

        // Check if article is already un-published
        if (article.is_published === false) {
            throw new ApiError("Article has not been published yet", 400);
        }

        // Unpublish article
        await articlesDB.updateData(id, { is_published: false });
        return null;
    };

    const likeArticle = async (id, userId) => {
        const article = await verifyArticleUtil(id);

        // Check if user has already liked the article
        if (article.likes.includes(userId)) {
            throw new ApiError("You have already liked this article", 400);
        }

        // like article
        const updatedArticle = await articlesDB.insertInLikes(id, userId);
        return updatedArticle.likes;
    };

    const unlikeArticle = async (id, userId) => {
        const article = await verifyArticleUtil(id);

        // Check if user has already previously not liked the article
        if (article.likes.includes(userId) === false) {
            throw new ApiError("You have not liked this article yet", 400);
        }

        // like article
        const updatedArticle = await articlesDB.removeFromLikes(id, userId);
        return updatedArticle.likes;
    };

    /*
        ===============================
                UTILITY FUNCTIONS
        ==============================
    */

    // This function validates the article id and
    // also checks whether or not this article exists in database
    const verifyArticleUtil = async (id) => {
        // Validate article id
        validateMongoID(id, "article");

        // Check if article exist
        const article = await articlesDB.findById(id);
        if (!article) {
            throw new ApiError("Article not found", 404);
        }

        return article;
    };

    return {
        addArticle,
        editArticle,
        likeArticle,
        unlikeArticle,
        removeArticle,
        publishArticle,
        unPublishArticle,
        listOneArticleBySlug,
        listPublishedArticles,
        listArticlesByTag,
        verifyArticleUtil,
        listPublishedArticlesOfUser,
        searchArticles,
        searchTags,
    };
}
