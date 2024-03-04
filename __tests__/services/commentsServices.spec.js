import { CommentsServices } from "../../src/features/comments/comments.services.js";
import jest from "jest-mock";

const mockComment = {
    _id: "65e5e2a0929844ae2d4a8596",
    author: "65e5e2aae565a47ad78b2465",
};

const articlesDB = {
    findById: jest.fn().mockReturnValue(Promise.resolve(null)),
};
const commentsDB = {
    findById: jest.fn().mockReturnValue(Promise.resolve(mockComment)),
};

const commentsServices = CommentsServices({ commentsDB, articlesDB });

describe("Comments services tests", () => {
    describe("List comments of articles", () => {
        it("should validate article id", async () => {
            try {
                await commentsServices.listCommentByArticle(12312);
            } catch (err) {
                expect(err.message).toBe("Invalid article id");
            }
        });

        it("should throw error if article does not exist", async () => {
            try {
                await commentsServices.listCommentByArticle(
                    "65e5e10f2cef55f8df746322"
                );
            } catch (err) {
                expect(err.message).toBe("Article not found");
            }
        });
    });
    describe("Edit comment", () => {
        it("should throw error if the user is not the author of the comment", async () => {
            try {
                const commentId = "65e5e2a0929844ae2d4a8596";
                const userId = "65e5e2bf62217e0b06501ec6";
                const changes = {};
                await commentsServices.editComment(commentId, userId, changes);
            } catch (err) {
                expect(err.message).toBe("You cannot edit this comment");
            }
        });
    });
    describe("Delete comment", () => {
        it("should throw error if the user is not the author of the comment", async () => {
            try {
                const commentId = "65e5e2a0929844ae2d4a8596";
                const userId = "65e5e2bf62217e0b06501ec6";
                const changes = {};
                await commentsServices.removeComment(
                    commentId,
                    userId,
                    changes
                );
            } catch (err) {
                expect(err.message).toBe("You cannot delete this comment");
            }
        });
    });
});
