import { ArticleServices } from "../../src/features/articles/articles.services.js";
import jest from "jest-mock";

const mockArticleWithAuthor = {
    _id: "65e44a2f701161ae7a5ff624",
    author: "65e44a401b2d7b2678969fca",
    likes: ["65e44a401b2d7b2678969fca"],
    is_published: true,
};
const notPublishedArticle = {
    _id: "65e44a2f701161ae7a5ff624",
    author: "65e44a401b2d7b2678969fca",
    likes: ["65e44a401b2d7b2678969fca"],
    is_published: false,
};

const articlesDB = {
    findOneBySlug: jest.fn().mockReturnValue(null), // returning null indicates that article was not found
    findById: jest
        .fn()
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(notPublishedArticle)
        .mockReturnValueOnce(notPublishedArticle)
        .mockReturnValue(mockArticleWithAuthor),
};

const articleServices = ArticleServices({ articlesDB });

describe("Article Services Tests", () => {
    describe("Verify article util func tests", () => {
        it("should validate article id", async () => {
            try {
                const userID = "65e44a2f701161ae7a5ff624";
                const articleID = "invalid-article-id";
                await articleServices.verifyArticleUtil(articleID, userID);
            } catch (err) {
                expect(err.message).toBe("Invalid article id");
            }
        });
        it("should throw error if article does not exist", async () => {
            try {
                const userID = "65e44a2f701161ae7a5ff624";
                const articleID = "65e4559a6fad6ae734163233";
                await articleServices.verifyArticleUtil(articleID, userID);
            } catch (err) {
                expect(err.message).toBe("Article not found");
            }
        });
    });

    describe("Un-publish article", () => {
        it("should throw error if user is not the author of the article", async () => {
            try {
                const articleID = "65e44a2f701161ae7a5ff624";
                const userID = "65e59e9f7ce16a843cc98a1d";
                await articleServices.unPublishArticle(articleID, userID);
            } catch (err) {
                expect(err.message).toBe("You cannot un-publish this article");
            }
        });
        it("should throw error if article is already un-published", async () => {
            try {
                const articleID = "65e44a2f701161ae7a5ff624";
                const userID = "65e44a401b2d7b2678969fca";
                await articleServices.unPublishArticle(articleID, userID);
            } catch (err) {
                expect(err.message).toBe("Article has not been published yet");
            }
        });
    });

    describe("Edit article", () => {
        it("should throw error if user is not the article's author", async () => {
            try {
                const userID = "65e456094561d1b9ad011776";
                const articleID = "65e448ba95c33ebb3a906aec";
                await articleServices.editArticle(articleID, userID);
            } catch (err) {
                expect(err.message).toBe("You cannot edit this article");
            }
        });
    });

    describe("Delete article", () => {
        it("should throw error if user is not the article's author", async () => {
            try {
                const userID = "65e456094561d1b9ad011776";
                const articleID = "65e448ba95c33ebb3a906aec";
                await articleServices.removeArticle(articleID, userID);
            } catch (err) {
                expect(err.message).toBe("You cannot delete this article");
            }
        });
    });

    describe("Like article", () => {
        it("should throw error if user has already liked the article", async () => {
            try {
                const userID = "65e44a401b2d7b2678969fca";
                const articleID = "65e44a2f701161ae7a5ff624";
                await articleServices.likeArticle(articleID, userID);
            } catch (err) {
                expect(err.message).toBe("You have already liked this article");
            }
        });
    });

    describe("Unlike article", () => {
        it("should throw error if user has not liked the article yet", async () => {
            try {
                const userID = "65e456094561d1b9ad011776";
                const articleID = "65e44a2f701161ae7a5ff624";
                await articleServices.unlikeArticle(articleID, userID);
            } catch (err) {
                expect(err.message).toBe("You have not liked this article yet");
            }
        });
    });

    describe("List article by slug", () => {
        it("should validate if slug is a string", async () => {
            try {
                await articleServices.listOneArticleBySlug(1212121);
            } catch (err) {
                expect(err.message).toBe("Invalid article slug");
            }
        });
        it("should throw error if article is not found", async () => {
            try {
                await articleServices.listOneArticleBySlug(
                    "some-unknown-article"
                );
            } catch (err) {
                expect(err.message).toBe("Article not found");
            }
        });
    });

    describe("Publish article", () => {
        it("should throw error if user is not the author of the article", async () => {
            try {
                const articleID = "65e44a2f701161ae7a5ff624";
                const userID = "65e462663b44220d3c18bb21";
                await articleServices.publishArticle(articleID, userID);
            } catch (err) {
                expect(err.message).toBe("You cannot publish this article");
            }
        });
        it("should throw error if article is already published", async () => {
            try {
                const articleID = "65e44a2f701161ae7a5ff624";
                const userID = "65e44a401b2d7b2678969fca";
                await articleServices.publishArticle(articleID, userID);
            } catch (err) {
                expect(err.message).toBe("Article is published already");
            }
        });
    });
});
