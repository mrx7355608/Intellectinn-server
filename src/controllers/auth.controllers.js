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
        createSessions(req, res, next);
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

export const authControllers = {
    signup,
    login,
    logout,
};

/*
    Utility Functions
*/
function createSessions(req, res, next) {
    req.login(user, (err) => {
        if (err) {
            return next(err);
        }
        return res.status(200).json({
            ok: true,
            data: user,
        });
    });
}
