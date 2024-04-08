import MongoStore from "connect-mongo";
import { getMongooseClient } from "../utils/db.js";
import sessions from "express-session";

export function setupSessions(app) {
    // Setups mongodb for storing sessions by using
    // existing mongoose connection so that un-necessary
    // database connections can be avoided
    // And because of this, the app should be created
    // after connecting to database because it is
    // being used by this mongo store to setup
    // session storage
    const mongoStore = MongoStore.create({
        client: getMongooseClient(),
    });

    // TODO: Refactor
    const prodSessionSettings = {
        secret: process.env.SESSIONS_SECRET,
        cookie: {
            secure: true,
            httpOnly: true,
            maxAge: 24 * 3600 * 1000,
            sameSite: "none",
        },
        resave: false,
        saveUninitialized: false,
        name: "nvm",
        store: mongoStore,
        proxy: true,
    };

    const devSessionSettings = {
        secret: process.env.SESSIONS_SECRET,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 24 * 3600 * 1000,
        },
        resave: false,
        saveUninitialized: false,
        name: "nvm",
        store: mongoStore,
    };

    if (process.env.NODE_ENV === "production") {
        app.use(sessions(prodSessionSettings));
    } else {
        app.use(sessions(devSessionSettings));
    }
}
