import passport from "passport";
import passportSetup from "../passportSetup.js";

export function setupPassport(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    passportSetup();
}
