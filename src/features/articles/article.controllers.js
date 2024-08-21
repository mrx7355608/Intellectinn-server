import { ArticleServices } from "./articles.services.js";
import { articlesDB } from "./articles.data.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";

const articleServices = ArticleServices({ articlesDB });

const searchTags = catchAsyncError(async (httpObject) => {
    const query = httpObject.query.tags;
    const tags = await articleServices.searchTags(query);
    return {
        status: 200,
        data: tags,
    };
});

const searchArticles = catchAsyncError(async (httpObject) => {
    const query = httpObject.query.articles;
    const articles = await articleServices.searchArticles(query);
    return {
        status: 200,
        data: articles,
    };
});

const getAllArticles = catchAsyncError(async () => {
    const articles = await articleServices.listAllArticles();
    return {
        status: 200,
        data: articles,
    };
});

const getPublishedArticles = catchAsyncError(async (httpObject) => {
    const tag = httpObject.query.tag;
    const articles = await articleServices.listPublishedArticles(tag);
    return {
        status: 200,
        data: articles,
    };
});

const getPublishedArticlesOfUser = catchAsyncError(async (httpObject) => {
    const { userID } = httpObject.params;
    const articles = await articleServices.listPublishedArticlesOfUser(userID);
    return {
        status: 200,
        data: articles,
    };
});

const getArticlesByTag = catchAsyncError(async (httpObject) => {
    const { tag } = httpObject.params;
    const articles = await articleServices.listArticlesByCategory(tag);
    return {
        status: 200,
        data: articles,
    };
});

const getOneArticleBySlug = catchAsyncError(async (httpObject) => {
    const { slug } = httpObject.params;
    const article = await articleServices.listOneArticleBySlug(slug);
    return {
        status: 200,
        data: article,
    };
});

const createArticle = catchAsyncError(async (httpObject) => {
    const data = httpObject.body;
    const userId = String(httpObject.user._id);
    const newArticle = await articleServices.addArticle(data, userId);
    return {
        status: 201,
        data: newArticle,
    };
});

const updateArticle = catchAsyncError(async (httpObject) => {
    const changes = httpObject.body;
    const { articleId } = httpObject.params;
    const userId = String(httpObject.user._id);
    const newArticle = await articleServices.editArticle(
        articleId,
        userId,
        changes,
    );
    return {
        status: 200,
        data: newArticle,
    };
});

const deleteArticle = catchAsyncError(async (httpObject) => {
    const { articleId } = httpObject.params;
    const userId = String(httpObject.user._id);
    await articleServices.removeArticle(articleId, userId);
    return {
        status: 204,
        data: null,
    };
});

const toggleLikes = catchAsyncError(async (httpObject) => {
    const { articleId } = httpObject.params;
    const userId = String(httpObject.user._id);
    const updatedLikes = await articleServices.likeDislikeArticle(
        articleId,
        userId,
    );
    return {
        status: 200,
        data: updatedLikes,
    };
});

const publishArticle = catchAsyncError(async (httpObject) => {
    const { articleId } = httpObject.params;
    const userId = String(httpObject.user._id);
    const updatedArticle = await articleServices.publishArticle(
        articleId,
        userId,
    );
    return {
        status: 200,
        data: updatedArticle,
    };
});

const unpublishArticle = catchAsyncError(async (httpObject) => {
    const { articleId } = httpObject.params;
    const userId = String(httpObject.user._id);
    const updatedArticle = await articleServices.unPublishArticle(
        articleId,
        userId,
    );
    return {
        status: 200,
        data: updatedArticle,
    };
});

export const articleControllers = {
    searchArticles,
    searchTags,
    getAllArticles,
    getPublishedArticles,
    getArticlesByTag,
    getOneArticleBySlug,
    getPublishedArticlesOfUser,
    createArticle,
    updateArticle,
    deleteArticle,
    toggleLikes,
    publishArticle,
    unpublishArticle,
};
