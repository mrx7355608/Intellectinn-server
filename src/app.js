import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import passportSetup from "./passportSetup.js";
import sessions from "express-session";
import MongoStore from "connect-mongo";
import { getMongooseClient } from "./utils/db.js";
import { catch404, errorHandler } from "./utils/errorHandler.js";

const app = express();

app.use(helmet());
app.use(hpp());
app.use(morgan("combined"));
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    sessions({
        secret: process.env.SESSIONS_SECRET,
        proxy: true,
        resave: false,
        saveUninitialized: false,
        name: "side",
        store: MongoStore.create({
            client: getMongooseClient(),
        }),
        cookie: {
            secure: process.env.NODE_ENV === "production" ? true : false,
            httpOnly: true,
            sameSite: "none",
            maxAge: 24 * 3600 * 1000,
        },
    }),
);
app.use(passport.initialize());
app.use(passport.session());
passportSetup();

// ROUTES

// ERROR HANDLERS
app.use(catch404);
app.use(errorHandler);

export { app };
