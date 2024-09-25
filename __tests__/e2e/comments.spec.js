import "dotenv/config";
import supertest from "supertest";
import { createAndSetupApp } from "../../src/app.js";
import { connectDB, disconnectDB } from "../../src/utils/db.js";

let agent;

describe("Comments e2e tests", () => {
    let cookies;
    beforeAll(async () => {
        await connectDB(process.env.TEST_DB_URL);
        const app = createAndSetupApp();
        agent = supertest(app);

        // Login user
        const response = await agent.post("/api/auth/login").send({
            email: "fwd@gmail.com",
            password: "123123123123",
        });
        cookies = response.headers["set-cookie"][0];
    });

    afterAll(async () => await disconnectDB());

    const articleID = "6612bb9433e2d725a58b1489";

    describe("Get comments", () => {
        it("should validate article id", async () => {
            const articleID = "invalid-id";
            const response = await agent
                .get(`/api/comments/${articleID}`)
                .expect(400);
            expect(response.body.error).toBe("Invalid article id");
        });
        it("should throw error if article does not exist", async () => {
            const articleID = "6612b31ce549999140624707";
            const response = await agent
                .get(`/api/comments/${articleID}`)
                .expect(404);
            expect(response.body.error).toBe("Article not found");
        });
        it("should fetch comments of an article in the desired format", async () => {
            const response = await agent
                .get(`/api/comments/${articleID}`)
                .expect(200);
            expect(response.body.data[0]).toStrictEqual({
                _id: expect.any(String),
                text: expect.any(String),
                articleId: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                __v: expect.any(Number),
                user: {
                    _id: expect.any(String),
                    profilePicture: expect.any(String),
                    fullname: expect.any(String),
                },
            });
        });
    });
    describe("Post comments", () => {
        it.skip("should create comment", async () => {
            const response = await agent
                .post(`/api/comments/${articleID}`)
                .set("Cookie", cookies)
                .send({
                    text: "I was wondering about this and finally this article helped me",
                })
                .expect(201);
            expect(response.body.data.text).toBe(
                "I was wondering about this and finally this article helped me"
            );
        });
    });
});
