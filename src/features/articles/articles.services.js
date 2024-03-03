import slugify from "slugify";
import { ApiError } from "../../utils/ApiError.js";
import { categoryValidator, slugValidator } from "./article.validators.js";
import { validateMongoID } from "../../utils/validateMongoId.js";

export function ArticleServices({ articlesDB }) {
    const listAllArticles = async () => {
        const articles = await articlesDB.findByFilter({ is_published: true });
        const populatedArticles = await articles.populate(
            "author",
            "fullname profilePicture"
        );
        return populatedArticles;
    };

    const listArticlesByCategory = async (category) => {
        categoryValidator(category);
        const articles = await articlesDB.findByFilter({ category });
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

    const addArticle = async (data) => {
        if (Object.keys(data).length < 1) {
            throw new ApiError("Article data is missing", 404);
        }

        // TODO: validate article data

        // Create article data object
        const articleDataObject = {
            ...data,
            slug: slugify(data.title),
        };
        const newArticle = await articlesDB.insertData(articleDataObject);
        return newArticle;
    };

    const editArticle = async (id, userId) => {
        const article = await verifyArticle(id);

        // Check if user is the author
        if (article.author !== userId) {
            throw new ApiError("You cannot edit this article", 403);
        }

        // Delete article
        const updatedArticle = await articlesDB.updateData(id);
        return updatedArticle;
    };

    const removeArticle = async (id, userId) => {
        const article = await verifyArticle(id);

        // Check if user is the author
        if (article.author !== userId) {
            throw new ApiError("You cannot delete this article", 403);
        }

        // Delete article
        await articlesDB.deleteData(id);
        return null;
    };

    const publishArticle = async () => {};

    const unPublishArticle = async () => {};

    const likeArticle = async (id, userId) => {
        const article = await verifyArticle(id);

        // Check if user has already liked the article
        if (article.likes.includes(userId)) {
            throw new ApiError("You have already liked this article", 400);
        }

        // like article
        const updatedArticle = await articlesDB.insertLike(id);
        return updatedArticle;
    };

    const unlikeArticle = async (id, userId) => {
        const article = await verifyArticle(id);

        // Check if user has already previously not liked the article
        if (article.likes.includes(userId) === false) {
            throw new ApiError("You have not liked this article yet", 400);
        }

        // like article
        const updatedArticle = await articlesDB.removeLike(id);
        return updatedArticle;
    };

    /*
        ===============================
                UTILITY FUNCTIONS
        ==============================
    */

    // This function validates the article id and
    // also checks whether or not this article exists in database
    const verifyArticle = async (id) => {
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
        listAllArticles,
        unPublishArticle,
        listOneArticleBySlug,
        listArticlesByCategory,
        verifyArticle,
    };
}
