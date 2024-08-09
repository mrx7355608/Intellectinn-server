import { ApiError } from "../../utils/ApiError.js";
import { verifyToken } from "../../utils/token.js";
import { signupValidator } from "./auth.validators.js";
import bcrypt from "bcryptjs";

export function AuthServices({ usersDB }) {
    const signup = async (data) => {
        // Validate data
        signupValidator(data);

        // Check if user exists
        const userExists = await usersDB.findUserByEmail(data.email);
        if (userExists) {
            throw new ApiError(
                "Email is already registered, use a different email",
                400,
            );
        }

        // Save user in database
        const newUser = await usersDB.insertNewUser(data);

        // Removing un-necessary fields from newUser object
        newUser.password = undefined;
        newUser.__v = undefined;
        newUser.updatedAt = undefined;

        return newUser;
    };

    const verifyAccount = async (token) => {
        if (!token) {
            throw new ApiError(
                "Token is missing, request verification link again",
                403,
            );
        }

        const payload = verifyToken(token);

        // Get user
        const user = await usersDB.findUserById(payload.userId);
        if (!user) {
            throw new ApiError("User no longer exists", 404);
        }

        if (user.isVerified) {
            throw new ApiError("Account is already verified", 400);
        }

        await usersDB.updateUser(payload.userId, {
            isVerified: true,
        });
        return null;
    };

    const changePassword = async (oldPassword, newPassword, userId) => {
        if (!oldPassword) throw new ApiError("Old password is missing", 400);
        if (!newPassword) throw new ApiError("New password is missing", 400);

        // Check if user exists
        const user = await usersDB.findUserById(userId);
        if (!user) throw new ApiError("User no longer exists", 404);

        // Check if user is loggedin using google
        if (user.googleId)
            throw new ApiError(
                "You cannot change password because you are loggedin using google",
                404,
            );

        // Check if old password is correct
        const isValid = await bcrypt.compare(oldPassword, user.password);
        if (!isValid) throw new ApiError("Old password is incorrect", 400);

        // Validate new password
        if (newPassword.length < 10)
            throw new ApiError(
                "New password should be 10 characters long",
                400,
            );

        // Update
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        await usersDB.updateUser(userId, { password: newHashedPassword });

        return;
    };

    const resetPassword = async () => {};

    return { signup, changePassword, verifyAccount, resetPassword };
}
