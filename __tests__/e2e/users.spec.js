import "dotenv/config";
import supertest from "supertest";
import { createAndSetupApp } from "../../src/app.js";
import { connectDB, disconnectDB } from "../../src/utils/db.js";

let agent;

describe("Auth tests", () => {
    let cookies;

    beforeAll(async () => {
        await connectDB();
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

    describe("Get logged in user", () => {
        it("should return error if user is not logged in", async () => {
            const response = await agent.get("/api/users/me").expect(401);
            expect(response.body.ok).toBe(false);
            expect(response.body.error).toBe("Not authenticated");
        });
        it("should return user without any sensitive fields", async () => {
            const response = await agent
                .get("/api/users/me")
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

    describe("Get Users Profiles", () => {
        it("should return user's profile without sensitive fields", async () => {
            const response = await agent
                .get("/api/users/profile/65df279c33408a83bba2ca94")
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

    describe("Follow user", () => {
        it.todo("should foll");
    });
});
