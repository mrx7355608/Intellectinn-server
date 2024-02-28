import "dotenv/config";
import supertest from "supertest";
import { createAndSetupApp } from "../../src/app.js";
import { connectDB, disconnectDB } from "../../src/utils/db.js";

let agent;

describe("Auth tests", () => {
    beforeAll(async () => {
        await connectDB();
        const app = createAndSetupApp();
        agent = supertest(app);
    });

    afterAll(async () => await disconnectDB());

    describe("Signup tests", () => {
        const userData = {
            fullname: "Fawad Imran",
            email: "fwd@gmail.com",
            password: "123123123123",
            confirm_password: "123123123123",
        };
        it("should validate user data", async () => {
            const response = await agent
                .post("/api/auth/signup")
                .send({
                    fullname: "Fawad Imran",
                    email: "some@inva.com.ema/",
                })
                .expect(400);
            expect(response.body.ok).toBe(false);
            expect(response.body.error).toBe("Invalid email");
        });
        it("should throw error if email is already registered", async () => {
            const response = await agent
                .post("/api/auth/signup")
                .send(userData)
                .expect(400);
            expect(response.body.ok).toBe(false);
            expect(response.body.error).toBe(
                "Email is already registered, use a different email"
            );
        });

        // Passing
        it.skip("should create a new user", async () => {
            const response = await agent
                .post("/api/auth/signup")
                .send({ ...userData, email: "fwd8@gmail.com" })
                .expect(201);
            expect(response.body.ok).toBe(true);
            expect(response.body.data).toStrictEqual({
                _id: expect.any(String),
                fullname: userData.fullname,
                email: "fwd8@gmail.com",
                followers: [],
                following: [],
                profilePicture: process.env.DEFAULT_PROFILE_PICTURE,
                about: "",
                googleId: null,
                createdAt: expect.any(String),
            });
        });
        it.todo("should not allow logged in users to signup again");
    });
});
