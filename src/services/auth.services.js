import { ApiError } from "../utils/ApiError.js";
import { signupValidator } from "../validators/auth.validators.js";

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

        // Create user object with defualt values
        const userObject = {
            ...data,
            profilePicture: process.env.DEFAULT_PROFILE_PICTURE,
            followers: [],
            following: [],
            about: "",
            googleId: null,
        };

        // Save user in database
        const newUser = await usersDB.insertNewUser(userObject);
        return newUser;
    };

    const resetPassword = async () => {};

    return { signup, resetPassword };
}
