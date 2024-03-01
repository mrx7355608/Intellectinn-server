import { validateMongoID } from "../../utils/validateMongoId.js";
import { ApiError } from "../../utils/ApiError.js";

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
                404
            );
        }

        // If yes, then unfollow user
        const updatedUser = await usersDB.updatedUser(user._id, {
            $pull: { following: followingID },
        });
        return updatedUser.following;
    };

    // EDIT USER
    const editUser = async (id, changes) => {
        validateMongoID(id, "user");

        // TODO: validate user changes

        if (_userExists(id)) {
            throw new ApiError("Account not found", 404);
        }

        const updatedUser = await usersDB.updateUser(id, changes);
        return updatedUser;
    };

    // REMOVE USER
    const removeUser = async (id) => {
        validateMongoID(id, "user");

        // Check if user exists
        if (_userExists(id)) {
            throw new ApiError("Account no longer exists");
        }

        // Delete user's account
        await usersDB.deleteUser(id);

        return null;
    };

    return { followUser, unfollowUser, editUser, removeUser };
}
