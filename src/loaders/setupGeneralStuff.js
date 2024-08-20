import express from "express";
// import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import path from "path";

export function setupGenerals(app) {
    // TODO: udpate csp
    // app.use(helmet());
    app.use(hpp());
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.resolve("dist")));
}
