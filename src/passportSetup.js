import passport from "passport";
import { Strategy } from "passport-local";
import { UserModel } from "./models/user.model.js";
import bc from "bcryptjs";

export default function passportSetup() {
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
