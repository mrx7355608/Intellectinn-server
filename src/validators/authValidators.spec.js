import { signupValidator } from "./auth.validators.js";

describe("Signup Validator", () => {
    const data = {
        fullname: "Fawad Imran",
        email: "fwd@gmail.com",
        password: "123123123123123",
        confirm_password: "123123123123123",
    };
    describe("Fullname", () => {
        it("should throw error if fullname is not provided", () => {
            const d1 = { ...data };
            delete d1.fullname;
            expect(() => signupValidator(d1)).toThrow("Full name is required");
        });
        it("should throw error if fullname is empty", () => {
            expect(() => signupValidator({ ...data, fullname: "" })).toThrow(
                "Full name cannot be empty",
            );
        });
        it("should throw error if fullname is short", () => {
            expect(() => signupValidator({ ...data, fullname: "fwd" })).toThrow(
                "Full name should be 8 characters long at least",
            );
        });
        it("should throw error if fullname is way too long", () => {
            expect(() =>
                signupValidator({ ...data, fullname: "a huge huge huge name" }),
            ).toThrow("Full name cannot be longer than 15 characters");
        });
        it("should throw error if fullname is not a text value", () => {
            expect(() => signupValidator({ ...data, fullname: null })).toThrow(
                "Full name should be a text value",
            );
        });
    });
    describe("Email", () => {
        it.todo("should throw error if email is not provided");
        it.todo("should throw error if email is invalid");
        it.todo("should throw error if email is not a text value");
        it.todo("should throw error if email is empty");
    });
    describe("Password", () => {
        it.todo("should throw error if password is not provided");
        it.todo("should throw error if password is empty");
        it.todo("should throw error if password is short");
        it.todo("should throw error if password is huge");
        it.todo("should throw error if password is not a text value");
    });
    describe("Confirm Password", () => {
        it("should throw error if confirm password is not provided", () => {
            const d2 = { ...data };
            delete d2.confirm_password;

            expect(() => signupValidator(d2)).toThrow("Please confirm your ");
        });
        it("should throw error if passwords do not match", () => {
            expect(() =>
                signupValidator({ ...data, confirm_password: "1fsd" }),
            ).toThrow("Passwords do not match");
        });
    });
});
