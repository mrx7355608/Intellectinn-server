import { validateMongoID } from "../../utils/validateMongoId.js";
import { ApiError } from "../../utils/ApiError.js";
import { editDataValidator } from "./user.validators.js";
import { filterUnwantedFields } from "../../utils/filterUnwantedFields.js";

export function UserServices({ usersDB }) {
    const _userExists = async (id) => {
        const user = await usersDB.findUserById(id);
        return user;
    };

    const searchUsers = async (fullname) => {
        // TODO: validate and escape fullname
        const users = await usersDB.findUsersByRegex(fullname);
        return users;
    };

    // FOLLOW USER
    const followUser = async (userToFollowID, me) => {
        validateMongoID(userToFollowID, "user");

        // Check if user exists
        const userToFollow = await _userExists(userToFollowID);
        if (!userToFollow) {
            throw new ApiError("User does not exist");
        }

        if (me.following.includes(userToFollowID)) {
            throw new ApiError("You are already following this user", 400);
        }

        const updatedMe = await usersDB.insertInFollowing(
            me._id,
            userToFollowID,
        );
        await usersDB.insertInFollowers(me._id, userToFollowID);

        return updatedMe.following;
    };

    // UN-FOLLOW USER
    const unfollowUser = async (unfollowUserID, me) => {
        validateMongoID(unfollowUserID, "user");
        // Check if user is following him
        if (me.following.includes(unfollowUserID) === false) {
            throw new ApiError("You are not following this user", 400);
        }

        // If yes, then unfollow user
        const updatedUser = await usersDB.removeFromFollowing(
            me._id,
            unfollowUserID,
        );
        return updatedUser.following;
    };

    // EDIT USER
    const editUser = async (userId, changes) => {
        // Remove un-necessary fields from "changes" object
        const filteredChangesObject = filterUnwantedFields(changes, [
            "profilePicture",
            "about",
        ]);

        // Validate user changes
        editDataValidator(filteredChangesObject);

        // Update user
        const updatedUser = await usersDB.updateUser(
            userId,
            filteredChangesObject,
        );
        return updatedUser;
    };

    // REMOVE USER
    const removeUser = async (id) => {
        // Delete user's account
        await usersDB.deleteUser(id);
        return null;
    };

    const listUserFollowing = async (id) => {
        validateMongoID(id, "user");
        const user = await _userExists(id);
        if (!user) {
            throw new ApiError("User not found", 404);
        }

        // Remove sensitive fields
        user.__v = undefined;
        user.updatedAt = undefined;
        user.password = undefined;
        user.email = undefined;
        user.googleId = undefined;

        const populatedUser = await user.populate(
            "following",
            "profilePicture fullname",
        );

        return populatedUser.following;
    };

    const listUserFollowers = async (id) => {
        validateMongoID(id, "user");
        const user = await _userExists(id);
        if (!user) {
            throw new ApiError("User not found", 404);
        }

        // Remove sensitive fields
        user.__v = undefined;
        user.updatedAt = undefined;
        user.password = undefined;
        user.email = undefined;
        user.googleId = undefined;

        const populatedUser = await user.populate(
            "followers",
            "profilePicture fullname",
        );

        return populatedUser.followers;
    };

    // GET PROFILE OF A USER
    const listUserProfile = async (id) => {
        validateMongoID(id, "user");
        const user = await _userExists(id);
        if (!user) {
            throw new ApiError("User not found", 404);
        }

        // Remove sensitive fields
        user.__v = undefined;
        user.updatedAt = undefined;
        user.password = undefined;
        user.email = undefined;
        user.googleId = undefined;

        const populatedUser = await user.populate(
            "followers following",
            "profilePicture fullname",
        );

        return populatedUser;
    };

    return {
        searchUsers,
        followUser,
        unfollowUser,
        editUser,
        removeUser,
        listUserProfile,
        listUserFollowers,
        listUserFollowing,
    };
}
