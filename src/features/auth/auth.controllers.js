import { AuthServices } from "./auth.services.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import { usersDB } from "../users/user.data.js";
import passport from "passport";
import { verifyToken } from "../../utils/token.js";

const authServices = AuthServices({ usersDB });

const signup = catchAsyncError(async (httpObject) => {
    const signupData = httpObject.body;
    const newUser = await authServices.signup(signupData);
    return {
        status: 201,
        data: newUser,
    };
});

const login = async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(400).json({
                ok: false,
                error: info.message,
            });
        }

        // Create session for the user
        createSessions(user, req, res, next);
    })(req, res, next);
};

const logout = async (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }

        return res.status(200).json({
            ok: true,
            data: null,
        });
    });
};

const verifyAccount = catchAsyncError(async (req, res, next) => {
    const { token } = req.query;
    await authServices.verifyUserAccount(token);
    return res.status(200).json({
        ok: true,
        data: null,
    });
});

export const authControllers = {
    signup,
    login,
    logout,
    verifyAccount,
};

/*
    Utility Functions
*/
function createSessions(user, req, res, next) {
    req.login(user, (err) => {
        if (err) {
            return next(err);
        }

        // Remove sensitive fields from user object
        user.password = undefined;
        user.__v = undefined;
        user.updatedAt = undefined;
        user.googleId = undefined;

        return res.status(200).json({
            ok: true,
            data: user,
        });
    });
}
