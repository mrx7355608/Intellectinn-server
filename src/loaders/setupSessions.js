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

    const cookieOptions = {
        secure: process.env.NODE_ENV === "production" ? true : false,
        httpOnly: true,
        sameSite: "none",
        maxAge: 24 * 3600 * 1000,
    };

    app.use(
        sessions({
            secret: process.env.SESSIONS_SECRET,
            proxy: true,
            resave: false,
            saveUninitialized: false,
            name: "side",
            store: mongoStore,
            cookie: cookieOptions,
        }),
    );
}
