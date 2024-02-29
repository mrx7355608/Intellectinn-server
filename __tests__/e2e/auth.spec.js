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
                "Email is already registered, use a different email",
            );
        });
        it.skip("(passing) should create a new user", async () => {
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
        it("should not allow logged in users to signup again", async () => {
            const loginResponse = await agent
                .post("/api/auth/login")
                .send({
                    email: userData.email,
                    password: userData.password,
                })
                .expect(200);

            const cookies = loginResponse.headers["set-cookie"][0];

            const signupResponse = await agent
                .post("/api/auth/signup")
                .set("Cookie", cookies)
                .send(userData)
                .expect(403);
            expect(signupResponse.body.ok).toBe(false);
            expect(signupResponse.body.error).toBe(
                "You are already logged in, please logout to continue",
            );
        });
    });
    describe("Login tests", () => {
        let cookies;

        const invalidLoginCreds = {
            email: "fwd@gmail.com",
            password: "invalidapassword",
        };

        const validCreds = {
            email: "fwd@gmail.com",
            password: "123123123123",
        };

        it("should return error if credentials are not provided", async () => {
            const response = await agent
                .post("/api/auth/login")
                .send(null)
                .expect(400);
            expect(response.body.ok).toBe(false);
            expect(response.body.error).toBe("Missing credentials");
        });

        it("should return error if credentials are invalid", async () => {
            const response = await agent
                .post("/api/auth/login")
                .send(invalidLoginCreds)
                .expect(400);
            expect(response.body.ok).toBe(false);
            expect(response.body.error).toBe("Incorrect email or password");
        });

        it("should login user", async () => {
            const response = await agent
                .post("/api/auth/login")
                .send(validCreds)
                .expect(200);
            cookies = response.headers["set-cookie"][0];
            expect(response.body.ok).toBe(true);
            expect(response.body.data).toStrictEqual({
                _id: expect.any(String),
                fullname: expect.any(String),
                email: validCreds.email,
                profilePicture: expect.any(String),
                createdAt: expect.any(String),
                about: expect.any(String),
                following: expect.any(Array),
                followers: expect.any(Array),
            });
        });

        it("should not allow user to login again", async () => {
            const response = await agent
                .post("/api/auth/login")
                .set("Cookie", cookies)
                .send(validCreds)
                .expect(403);
            expect(response.body.ok).toBe(false);
            expect(response.body.error).toBe(
                "You are already logged in, please logout to continue",
            );
        });
    });
    describe("Logout tests", () => {
        const creds = {
            email: "fwd@gmail.com",
            password: "123123123123",
        };

        it("should logout users", async () => {
            const loginResp = await agent.post("/api/auth/login").send(creds);
            const cookies = loginResp.headers["set-cookie"][0];

            const response = await agent
                .post("/api/auth/logout")
                .set("Cookie", cookies)
                .expect(200);
            expect(response.body.ok).toBe(true);
        });
        it("should not allow non-logged in user to logout", async () => {
            const response = await agent.post("/api/auth/logout").expect(403);
            expect(response.body.ok).toBe(false);
            expect(response.body.error).toBe("Not authenticated");
        });
    });
});
