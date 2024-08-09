import { ApiError } from "../../utils/ApiError.js";
import { verifyToken } from "../../utils/token.js";
import { signupValidator } from "./auth.validators.js";

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

    const resetPassword = async () => {};

    return { signup, verifyAccount, resetPassword };
}
