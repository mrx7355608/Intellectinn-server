import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy } from "passport-local";
import { UserModel } from "./features/users/user.model.js";
import bc from "bcryptjs";

export default function passportSetup() {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
            },
            async function (accessToken, refreshToken, profile, done) {
                // Check if user has previously logged in with google
                const user = await UserModel.findOne({ googleId: profile.id });
                if (user) {
                    return done(null, user);
                }
                // Create and save new user in database
                const newUserData = {
                    googleId: profile.id,
                    fullname: `${profile.name.givenName} ${profile.name.familyName}`,
                    email: profile.emails[0].value,
                    password: null,
                    profilePicture: profile.photos[0].value,
                    topicsInterestedIn: [],
                };
                const newUser = await UserModel.create(newUserData);
                return done(null, newUser);
            },
        ),
    );
    passport.use(
        new Strategy(
            { usernameField: "email" },
            async (email, password, done) => {
                // Check if email is registered or not
                const user = await UserModel.findOne({ email });
                if (!user) {
                    return done(null, false, {
                        message: "Incorrect email or password",
                    });
                }

                // TODO: un-comment later
                // if (!user.isVerified) {
                //     return done(null, false, {
                //         message: "Please verify your email to login",
                //     });
                // }

                // Validate password
                const isValidPassword = await bc.compare(
                    password,
                    user.password,
                );
                if (!isValidPassword) {
                    return done(null, false, {
                        message: "Incorrect email or password",
                    });
                }

                return done(null, user);
            },
        ),
    );

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        UserModel.findById(id)
            .then((doc) => done(null, doc))
            .catch((err) => done(err));
    });
}
