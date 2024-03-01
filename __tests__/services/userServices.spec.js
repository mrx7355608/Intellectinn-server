import { UserServices } from "../../src/features/users/users.services.js";
import jest from "jest-mock";
import { filterUnwantedFields } from "../../src/utils/filterUnwantedFields.js";

const mockUser = {
    _id: "65e145c8b8d0e806a847e22d",
    fullname: "John Doe",
    email: "john@doedoe.com",
    profilePicture: "http://example-image.com",
    following: ["65e13dfe9bfa3bbeed841441", "65e13e06ea33da20b977675b"],
    followers: [],
};

const usersDB = {
    findUserById: jest
        .fn()
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false),
};

const userServices = UserServices({ usersDB });

/*
    ------------------------------------------------------------
    NOTE: "folUser" is the user who is being followed/unfollowed
    ------------------------------------------------------------

*/

describe("User services tests", () => {
    describe("Follow users", () => {
        it("should validate the id of the -folUser-", async () => {
            try {
                await userServices.followUser("some-invalid-id", mockUser);
            } catch (err) {
                expect(err.message).toBe("Invalid user id");
            }
        });
        it("should throw error if the -folUser- does not exist", async () => {
            try {
                await userServices.followUser(
                    "65e14010610cc58f03a41e84",
                    mockUser
                );
            } catch (err) {
                expect(err.message).toBe("User does not exist");
            }
        });
        it("should throw error if user is already following the -folUser-", async () => {
            try {
                await userServices.followUser(
                    "65e13dfe9bfa3bbeed841441",
                    mockUser
                );
            } catch (err) {
                expect(err.message).toBe("You are already following this user");
            }
        });
    });
    describe("Unfollow users", () => {
        it("should validate the id of the -folUser-", async () => {
            try {
                await userServices.unfollowUser("some-invalid-id", mockUser);
            } catch (err) {
                expect(err.message).toBe("Invalid user id");
            }
        });
        it("should throw error if the user is not following the -folUser- already", async () => {
            try {
                await userServices.unfollowUser(
                    "65e14010610cc58f03a41e84",
                    mockUser
                );
            } catch (err) {
                expect(err.message).toBe("You are not following this user");
            }
        });
    });
    describe("Edit user", () => {
        it("should filter unwanted fields from new changes object", () => {
            const changes = {
                profilePicture: "https://img.com/user.jpg",
                about: "This a test for checking if un-wanted fields are removed from changes object",
                role: "admin",
                password: "000",
            };
            const filteredChangesObject = filterUnwantedFields(changes, [
                "profilePicture",
                "about",
            ]);
            expect(filteredChangesObject).toStrictEqual({
                profilePicture: "https://img.com/user.jpg",
                about: "This a test for checking if un-wanted fields are removed from changes object",
            });
        });
        it("should validate new changes", async () => {
            try {
                await userServices.editUser("65e145c8b8d0e806a847e22d", {
                    profilePicture: "https://image.com/user.png",
                    about: 123,
                });
            } catch (err) {
                expect(err.message).toBe("Invalid about content");
            }
        });
    });
    describe("List users profile", () => {
        it("should validate user's id", async () => {
            try {
                await userServices.listUserProfile("12312");
            } catch (err) {
                expect(err.message).toBe("Invalid user id");
            }
        });
        it("should return error if user does not exist", async () => {
            try {
                await userServices.listUserProfile("65df279c33408a83bba2ca94");
            } catch (err) {
                expect(err.message).toBe("User not found");
            }
        });
    });
});
