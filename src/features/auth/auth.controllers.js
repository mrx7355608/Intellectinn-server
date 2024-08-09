import { AuthServices } from "./auth.services.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import { usersDB } from "../users/user.data.js";
import passport from "passport";
import { sendVerificationMail } from "../../utils/mail.js";
import { generateToken } from "../../utils/token.js";

const authServices = AuthServices({ usersDB });

const postSignup = catchAsyncError(async (httpObject) => {
    const signupData = httpObject.body;
    const newUser = await authServices.signup(signupData);

    console.log("User registered");

    // Send verification link
    const token = generateToken({ userId: newUser._id });
    console.log("Token generated");

    await sendVerificationMail(newUser.email, token);
    console.log("Mail sent");

    return {
        status: 201,
        data: `An account verification link has been sent to ${newUser.email}, please verify your account before logging in`,
    };
});

const postLogin = async (req, res, next) => {
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

const postLogout = async (req, res, next) => {
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

const postVerifyAccount = catchAsyncError(async (req, res) => {
    const { token } = req.query;
    await authServices.verifyAccount(token);
    return {
        status: 200,
        data: "Email verified!",
    };
});

export const authControllers = {
    postSignup,
    postLogin,
    postLogout,
    postVerifyAccount,
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
