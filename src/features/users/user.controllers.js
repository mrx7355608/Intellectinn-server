import { UserServices } from "./users.services.js";
import { usersDB } from "./user.data.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";

const userServices = UserServices({ usersDB });

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
        user,
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

export const userControllers = {
    followUser,
    unfollowUser,
    editUser,
    deleteUser,
};
