import { ArticleServices } from "../../src/features/articles/articles.services.js";
import jest from "jest-mock";

const mockArticle = {
    _id: "65e44a2f701161ae7a5ff624",
    likes: ["65e44a401b2d7b2678969fca"],
};
const mockArticle2 = {
    _id: "65e44a2f701161ae7a5ff624",
    likes: [],
};

const articlesDB = {
    findOneBySlug: jest.fn().mockReturnValue(null), // returning null indicates that article was not found
    findById: jest
        .fn()
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(mockArticle)
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(mockArticle2),
};

const articleServices = ArticleServices({ articlesDB });

describe("Article Services Tests", () => {
    describe("Edit article", () => {});

    describe("Delete article", () => {});

    describe("Like article", () => {
        it("should throw error if article id is invalid", async () => {
            try {
                await articleServices.likeArticle(2311231);
            } catch (err) {
                expect(err.message).toBe("Invalid article id");
            }
        });
        it("should throw error if article does not exist", async () => {
            try {
                await articleServices.likeArticle("65e448ba95c33ebb3a906aec");
            } catch (err) {
                expect(err.message).toBe("Article not found");
            }
        });
        it("should throw error if user has already liked the article", async () => {
            try {
                const articleID = "65e44a2f701161ae7a5ff624";
                const userID = "65e44a401b2d7b2678969fca";
                await articleServices.likeArticle(articleID, userID);
            } catch (err) {
                expect(err.message).toBe("You have already liked this article");
            }
        });
    });

    describe("Unlike article", () => {
        it("should throw error if article id is invalid", async () => {
            try {
                await articleServices.unlikeArticle(2311231);
            } catch (err) {
                expect(err.message).toBe("Invalid article id");
            }
        });
        it("should throw error if article does not exist", async () => {
            try {
                await articleServices.unlikeArticle("65e448ba95c33ebb3a906aec");
            } catch (err) {
                expect(err.message).toBe("Article not found");
            }
        });
        it("should throw error if user has not liked the article yet", async () => {
            try {
                const articleID = "65e44a2f701161ae7a5ff624";
                const userID = "65e44a401b2d7b2678969fca";
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

    describe("List articles by category", () => {
        it("should throw error if an unknown category is provided", async () => {
            try {
                await articleServices.listArticlesByCategory("asdjfklasdj");
            } catch (err) {
                expect(err.message).toBe("Unknown category");
            }
        });
    });
});
