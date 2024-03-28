import { ArticleServices } from "./articles.services.js";
import { articlesDB } from "./articles.data.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";

const articleServices = ArticleServices({ articlesDB });

const getAllArticles = catchAsyncError(async () => {
    const articles = await articleServices.listAllArticles();
    return {
        status: 200,
        data: articles,
    };
});

const getPublishedArticles = catchAsyncError(async () => {
    const articles = await articleServices.listPublishedArticles();
    return {
        status: 200,
        data: articles,
    };
});

const getArticlesByCategory = catchAsyncError(async (httpObject) => {
    const { category } = httpObject.params;
    const articles = await articleServices.listArticlesByCategory(category);
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
        status: 201,
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

const likeArticle = catchAsyncError(async (httpObject) => {
    const { articleId } = httpObject.params;
    const userId = String(httpObject.user._id);
    const updatedArticle = await articleServices.likeArticle(articleId, userId);
    return {
        status: 200,
        data: updatedArticle,
    };
});

const unlikeArticle = catchAsyncError(async (httpObject) => {
    const { articleId } = httpObject.params;
    const userId = String(httpObject.user._id);
    const updatedArticle = await articleServices.unlikeArticle(
        articleId,
        userId,
    );
    return {
        status: 200,
        data: updatedArticle,
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
    getAllArticles,
    getPublishedArticles,
    getArticlesByCategory,
    getOneArticleBySlug,
    createArticle,
    updateArticle,
    deleteArticle,
    likeArticle,
    unlikeArticle,
    publishArticle,
    unpublishArticle,
};
