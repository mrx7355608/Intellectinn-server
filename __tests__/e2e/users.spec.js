import "dotenv/config";
import supertest from "supertest";
import { createAndSetupApp } from "../../src/app.js";
import { connectDB, disconnectDB } from "../../src/utils/db.js";

let agent;

describe("User tests", () => {
    let cookies;
    let myId;

    beforeAll(async () => {
        await connectDB(process.env.TEST_DB_URL);
        const app = createAndSetupApp();
        agent = supertest(app);

        // Create new user
        const userData = {
            fullname: "Fawad Imran",
            email: "fwd@gmail.com",
            password: "123123123123",
            confirm_password: "123123123123",
        };
        await agent.post("/api/auth/signup").send(userData).expect(201);

        // Login newly created user
        const response = await agent.post("/api/auth/login").send({
            email: userData.email,
            password: userData.password,
        });

        // Assign global variables
        cookies = response.headers["set-cookie"][0];
        myId = response.body.data._id;
    });

    afterAll(async () => await disconnectDB());

    describe("Get Users Profiles", () => {
        it("should return user's profile without sensitive fields", async () => {
            const response = await agent
                .get("/api/users/66c5110d88af0eb0ff0093fb")
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
                isVerified: expect.any(Boolean),
                topicsInterestedIn: expect.any(Array),
            });
        });
    });

    describe("Follow / Unfollow user", () => {
        const secondUserID = "66c5110d88af0eb0ff0093fb";

        it("should follow user", async () => {
            const response = await agent
                .patch(`/api/users/follow/${secondUserID}`)
                .set("Cookie", cookies)
                .expect(200);
            expect(response.body.ok).toBe(true);

            // Check if my followings contain the id of the user I followed
            // Here response.body.data is a list of users I am following
            const myFollowings = response.body.data;
            expect(myFollowings).toContain(secondUserID);

            // Check if the user i followed received me as a follower or not
            const response2 = await agent
                .get(`/api/users/${secondUserID}`)
                .expect(200);
            const hisFollowers = response2.body.data.followers;
            expect(hisFollowers).toContain(myId);
        });

        it("should unfollow user", async () => {
            const response = await agent
                .patch(`/api/users/unfollow/${secondUserID}`)
                .set("Cookie", cookies)
                .expect(200);
            expect(response.body.ok).toBe(true);

            // Check if he is no longer in my followings list
            // response.body.data is a list of users I am following
            const myFollowings = response.body.data;
            expect(myFollowings).not.toContain(secondUserID);

            // Check if I am removed from his followers list
            const response2 = await agent
                .get(`/api/users/${secondUserID}`)
                .expect(200);
            const hisFollowers = response2.body.data.followers;
            expect(hisFollowers).not.toContain(myId);
        });
    });

    describe("Delete user", () => {
        it("should delete user", async () => {
            await agent
                .delete("/api/users/me")
                .set("Cookie", cookies)
                .expect(204);
        });
    });
});
