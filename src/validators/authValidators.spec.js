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
        it("should throw error if email is not provided", () => {
            const d4 = { ...data };
            delete d4.email;
            expect(() => signupValidator(d4)).toThrow("Email is required");
        });
        it("should throw error if email is invalid", () => {
            expect(() =>
                signupValidator({ ...data, email: "invlaid@/dfmea.com" }),
            ).toThrow("Invalid email");
        });
        it("should throw error if email is not a text value", () => {
            expect(() => signupValidator({ ...data, email: null })).toThrow(
                "Email should be a text value",
            );
        });
        it("should throw error if email is empty", () => {
            expect(() => signupValidator({ ...data, email: "" })).toThrow(
                "Email cannot be empty",
            );
        });
    });
    describe("Password", () => {
        it("should throw error if password is not provided", () => {
            const d3 = { ...data };
            delete d3.password;
            expect(() => signupValidator(d3)).toThrow("Password is required");
        });
        it("should throw error if password is empty", () => {
            expect(() => signupValidator({ ...data, password: "" })).toThrow(
                "Password cannot be empty",
            );
        });
        it("should throw error if password is short", () => {
            expect(() => signupValidator({ ...data, password: "123" })).toThrow(
                "Password should be 10 characters long at least",
            );
        });
        it("should throw error if password is huge", () => {
            expect(() =>
                signupValidator({
                    ...data,
                    password:
                        "184239482903849012839048190834-29138490-8349082394829471982748972389741897897qj9s89se",
                }),
            ).toThrow("Password cannot be longer than 30 characters");
        });
        it("should throw error if password is not a text value", () => {
            expect(() => signupValidator({ ...data, password: null })).toThrow(
                "Password should be a text value",
            );
        });
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
