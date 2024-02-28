import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import passportSetup from "./passportSetup.js";
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
app.use(passport.initialize());
app.use(passport.session());
passportSetup();

// ROUTES

// ERROR HANDLERS
app.use(catch404);
app.use(errorHandler);

export { app };
