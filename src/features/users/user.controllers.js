import { UserServices } from "./users.services.js";
import { usersDB } from "./user.data.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";

const userServices = UserServices({ usersDB });

const searchUsers = catchAsyncError(async (httpObject) => {
    const fullname = httpObject.query.user;
    const users = await userServices.searchUsers(fullname);
    return {
        status: 200,
        data: users,
    };
});

const followUser = catchAsyncError(async (httpObject) => {
    const user = httpObject.user;
    const { followingID } = httpObject.params;
    const updatedFollowings = await userServices.followUser(followingID, user);
    return {
        status: 200,
        data: updatedFollowings,
    };
});

const unfollowUser = catchAsyncError(async (httpObject) => {
    const user = httpObject.user;
    const { followingID } = httpObject.params;
    const updatedFollowings = await userServices.unfollowUser(
        followingID,
        user
    );
    return {
        status: 200,
        data: updatedFollowings,
    };
});

const editUser = catchAsyncError(async (httpObject) => {
    const userId = httpObject.user._id;
    const changes = httpObject.body;
    const editedUser = await userServices.editUser(userId, changes);
    return {
        status: 200,
        data: editedUser,
    };
});

const deleteUser = catchAsyncError(async (httpObject) => {
    const userId = httpObject.user._id;
    await userServices.removeUser(userId);
    return {
        statsus: 204,
        data: null,
    };
});

const getUserProfile = catchAsyncError(async (httpObject) => {
    const { userID } = httpObject.params;
    const user = await userServices.listUserProfile(userID);
    return {
        status: 200,
        data: user,
    };
});

const getUserFollowings = catchAsyncError(async (httpObject) => {
    const userID = httpObject.params.userID;
    const following = await userServices.listUserFollowing(userID);
    return {
        status: 200,
        data: following,
    };
});

const getUserFollowers = catchAsyncError(async (httpObject) => {
    const userID = httpObject.params.userID;
    const followers = await userServices.listUserFollowers(userID);
    return {
        status: 200,
        data: followers,
    };
});

const getLoggedInUser = catchAsyncError(async (httpObject) => {
    const { user } = httpObject;

    user.password = undefined;
    user.email = undefined;
    user.__v = undefined;
    user.updatedAt = undefined;
    user.googleId = undefined;

    return {
        status: 200,
        data: user,
    };
});

export const userControllers = {
    followUser,
    unfollowUser,
    editUser,
    deleteUser,
    getUserProfile,
    getLoggedInUser,
    searchUsers,
    getUserFollowers,
    getUserFollowings,
};
