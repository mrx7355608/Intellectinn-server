import { AuthServices } from "../../src/services/auth.services.js";
import jest from "jest-mock";

const usersDB = {
    findUserByEmail: jest
        .fn()
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false),

    insertNewUser: (data) => data,
};

const authServices = AuthServices({ usersDB });

describe("Auth Services", () => {
    describe("Signup", () => {
        const data = {
            fullname: "Fawad Imran",
            email: "fwd@gmail.com",
        };

        it("should throw err if email is already registered", async () => {
            try {
                await authServices.signup(data);
            } catch (err) {
                expect(err.message).toBe(
                    "Email is already registered, use a different email",
                );
            }
        });
        it("should create a new user", async () => {
            const newUser = await authServices.signup(data);
            expect(newUser.email).toBe("fwd@gmail.com");
        });
    });
    // describe("Reset password", () => {
    //     it.todo("should throw err if security answer verification fails");
    //     it.todo("should validate new password");
    //     it.todo("should update the user's password");
    // });
});
