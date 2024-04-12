import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import morgan from "morgan";
import { __dirname } from "../utils/dirname.js";
import path from "path";

export function setupGenerals(app) {
    // app.use(helmet());
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
    app.use(express.static(path.join(__dirname, "..", "..", "dist")));
}
