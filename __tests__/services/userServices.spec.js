import { UserServices } from "../../src/features/users/users.services.js";
import jest from "jest-mock";

const mockUser = {
    _id: "65e145c8b8d0e806a847e22d",
    fullname: "John Doe",
    email: "john@doedoe.com",
    profilePicture: "http://example-image.com",
    following: ["65e13dfe9bfa3bbeed841441", "65e13e06ea33da20b977675b"],
    followers: [],
};

const usersDB = {
    findUserById: jest.fn().mockReturnValueOnce(false).mockReturnValue(true),
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
                expect(err.message).toBe(
                    "User is already not in your followings list"
                );
            }
        });
    });
});
