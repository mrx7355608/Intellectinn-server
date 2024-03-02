export function ArticleServices({ articlesDB }) {
    const listAllArticles = async () => {
        const articles = await articlesDB.findAll();
        const populatedArticles = await articles.populate(
            "author",
            "fullname profilePicture",
        );
        return populatedArticles;
    };
    const listArticlesByCategory = async () => {};
    const addArticle = async () => {};
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
