import "dotenv/config";
import supertest from "supertest";
import { createAndSetupApp } from "../../src/app.js";
import { connectDB, disconnectDB } from "../../src/utils/db.js";

let agent;

describe("User tests", () => {
    let cookies;

    beforeAll(async () => {
        await connectDB(process.env.TESTS_DB_URL);
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

    describe("Get Users Profiles", () => {
        it("should return user's profile without sensitive fields", async () => {
            const response = await agent
                .get("/api/users/66118f817d5b29b8a598aacb")
                .set("Cookie", cookies)
                .expect(200);
            expect(response.body.ok).toBe(true);
            expect(response.body.data).toStrictEqual({
                _id: expect.any(String),
                fullname: expect.any(String),
                about: expect.any(String),
                profilePicture: expect.any(String),
                createdAt: expect.any(String),
                following: expect.any(Array),
                followers: expect.any(Array),
            });
        });
    });

    describe("Follow / Unfollow user", () => {
        it("should follow user", async () => {
            const response = await agent
                .patch("/api/users/follow/6611914868b4fc11a9812ba1")
                .set("Cookie", cookies)
                .expect(200);
            expect(response.body.ok).toBe(true);
            // Check if my followings contain the id of the user I followed
            // Here response.body.data is a list of users I am following
            expect(response.body.data).toContain("6611914868b4fc11a9812ba1");

            // Check if the user i followed received me as a follower or not
            const response2 = await agent
                .get("/api/users/6611914868b4fc11a9812ba1")
                .expect(200);
            expect(response2.body.data.followers).toContain(
                "66118f817d5b29b8a598aacb"
            );
        });
        it("should unfollow user", async () => {
            const response = await agent
                .patch("/api/users/unfollow/6611914868b4fc11a9812ba1")
                .set("Cookie", cookies)
                .expect(200);
            expect(response.body.ok).toBe(true);
            // Check if he is no longer in my followings list
            // response.body.data is a list of users I am following
            expect(response.body.data).not.toContain(
                "6611914868b4fc11a9812ba1"
            );

            // Check if I am removed from his followers list
            const response2 = await agent
                .get("/api/users/6611914868b4fc11a9812ba1")
                .expect(200);
            expect(response2.body.data.followers).not.toContain(
                "66118f817d5b29b8a598aacb"
            );
        });
    });
});
