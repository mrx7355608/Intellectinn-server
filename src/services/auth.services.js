import { ApiError } from "../utils/ApiError.js";

export function AuthServices({ usersDB }) {
    const signup = async (data) => {
        // TODO: Validate data

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
        return newUser;
    };

    const resetPassword = async () => {};

    return { signup, resetPassword };
}
