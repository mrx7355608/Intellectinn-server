import "dotenv/config";
import supertest from "supertest";
import { createAndSetupApp } from "../../src/app.js";
import { connectDB, disconnectDB } from "../../src/utils/db.js";

let agent;

describe("Articles e2e tests", () => {
    let cookies;
    let myId;

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
        myId = response.body.data._id;
    });

    afterAll(async () => await disconnectDB());

    describe("Auth check", () => {
        it("should throw error if user is not authenticated", async () => {
            const response = await agent.post("/api/articles").expect(401);
            expect(response.body.error).toBe("Please login to continue");
        });
    });

    describe("Create articles", () => {
        it("should create article", async () => {
            const data = {
                title: "Test article - 1",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla diam ut risus vehicula, nec blandit urna luctus. Fusce hendrerit neque nec ex aliquet, nec lacinia magna vestibulum. Phasellus volutpat augue in nisi tempus, id interdum velit rutrum. Pellentesque sed ultrices nunc. Quisque id purus eu orci lobortis commodo. Integer at erat vel turpis fringilla lacinia. Nam euismod urna et augue pellentesque dapibus. Donec in justo ut elit aliquam iaculis. Sed nec sodales elit. Nullam vel semper purus.",
                summary:
                    "Nam vel sapien nec ipsum mattis commodo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed sodales mauris vitae metus molestie",
                thumbnail: "https://www.example.com/image.png",
                tags: ["testing", "api", "jest"],
                timeToReadInMinutes: "2",
                is_published: true,
            };
            const response = await agent
                .post("/api/articles")
                .set("Cookie", cookies)
                .send(data)
                .expect(201);
            expect(response.body.data).toStrictEqual({
                _id: expect.any(String),
                title: data.title,
                content: data.content,
                thumbnail: data.thumbnail,
                tags: data.tags,
                timeToReadInMinutes: data.timeToReadInMinutes,
                is_published: data.is_published,
                summary: data.summary,
                slug: expect.any(String),
                author: expect.any(String),
                __v: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                likes: [],
                bookmarkedBy: [],
            });
        });
    });
    describe("Edit articles", () => {
        const articleID = "6612bb9433e2d725a58b1489";
        it("should validate new article data", async () => {
            const changes = {
                thumbnail: "jsdfkasjdfkasdf",
            };
            const response = await agent
                .patch(`/api/articles/${articleID}`)
                .set("Cookie", cookies)
                .send(changes)
                .expect(400);
            expect(response.body.error).toBe("Invalid thumbnail link");
        });
        it("should edit article", async () => {
            const response = await agent
                .patch(`/api/articles/${articleID}`)
                .set("Cookie", cookies)
                .send({
                    title: "Updated test article - 1",
                    tags: ["updated", "jest"],
                })
                .expect(200);
            expect(response.body.data.slug).toMatch(/updated-test-article/);
            expect(response.body.data.tags).toContain("updated");
        });
    });

    describe("Like / Dislike Articles", () => {
        it("Like article", async () => {
            const response = await agent
                .patch("/api/articles/like-dislike/1123123123")
                .expect(200);
            expect(response.body.data.likes).toContain(myId);
        });
        it.todo("Dislike article");
    });
});
