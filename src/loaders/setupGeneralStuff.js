import express from "express";
// import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import path from "path";

export function setupGenerals(app) {
    // app.use(helmet());
    app.use(hpp());
    app.use(morgan("dev"));
    // app.use(
    //     cors({
    //         origin: process.env.CLIENT_URL,
    //         credentials: true,
    //     }),
    // );

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.resolve("dist")));
}
