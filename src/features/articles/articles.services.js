import slugify from "slugify";
import { ApiError } from "../../utils/ApiError.js";

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
        const articles = await articlesDB.findByFilter({ category });
        const populatedArticles = await articles.populate(
            "author",
            "fullname profilePicture"
        );
        return populatedArticles;
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
    const editArticle = async () => {};
    const removeArticle = async () => {};
    const publishArticle = async () => {};
    const unPublishArticle = async () => {};

    return {
        addArticle,
        editArticle,
        removeArticle,
        publishArticle,
        listAllArticles,
        unPublishArticle,
        listArticlesByCategory,
    };
}
