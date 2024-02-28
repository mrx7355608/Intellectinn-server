import { AuthServices } from "../services/auth.services.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import { usersDB } from "../data/user.data.js";

const authServices = AuthServices({ usersDB });

const signup = catchAsyncError(async (httpObject) => {
    const signupData = httpObject.body;
    const newUser = await authServices.signup(signupData);
    return {
        status: 201,
        data: newUser,
    };
});

export const authControllers = {
    signup,
};
