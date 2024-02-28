import express from "express";
import { setupGenerals } from "./loaders/setupGeneralStuff.js";
import { setupSessions } from "./loaders/setupSessions.js";
import { setupPassport } from "./loaders/setupPassport.js";
import { catch404, errorHandler } from "./utils/errorHandler.js";
import { authRouter } from "./routes/auth.js";

export function createAndSetupApp() {
    const app = express();

    // App configuration
    setupGenerals(app);
    setupSessions(app);
    setupPassport(app);

    // ROUTES
    app.use("/api/auth", authRouter);

    // ERROR HANDLERS
    app.use(catch404);
    app.use(errorHandler);

    return app;
}
