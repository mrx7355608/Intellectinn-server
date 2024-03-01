import { validateMongoID } from "../../utils/validateMongoId.js";
import { ApiError } from "../../utils/ApiError.js";
import { editDataValidator } from "./user.validators.js";
import { filterUnwantedFields } from "../../utils/filterUnwantedFields.js";

export function UserServices({ usersDB }) {
    const _userExists = async (id) => {
        const user = await usersDB.findUserById(id);
        return user;
    };

    // FOLLOW USER
    const followUser = async (followingID, user) => {
        validateMongoID(followingID, "user");

        // Check if user exists
        if (!(await _userExists(followingID))) {
            throw new ApiError("User does not exist");
        }

        if (user.following.includes(followingID)) {
            throw new ApiError("You are already following this user", 400);
        }

        const updatedUser = await usersDB.updateUser(user._id, {
            $push: { following: followingID },
        });
        await usersDB.updateUser(followingID, {
            $push: { followers: user._id },
        });

        return updatedUser.following;
    };

    // UN-FOLLOW USER
    const unfollowUser = async (followingID, user) => {
        validateMongoID(followingID, "user");
        // Check if user is following him
        if (user.following.includes(followingID) === false) {
            throw new ApiError(
                "User is already not in your followings list",
                404,
            );
        }

        // If yes, then unfollow user
        const updatedUser = await usersDB.updatedUser(user._id, {
            $pull: { following: followingID },
        });
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

        return user;
    };
    return { followUser, unfollowUser, editUser, removeUser, listUserProfile };
}
