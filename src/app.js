import express from "express";
import { setupGenerals } from "./loaders/setupGeneralStuff.js";
import { setupSessions } from "./loaders/setupSessions.js";
import { setupPassport } from "./loaders/setupPassport.js";
import { catch404, errorHandler } from "./utils/errorHandler.js";

import { authRouter } from "./features/auth/auth.routes.js";
import { userRouter } from "./features/users/user.routes.js";
import { articleRouter } from "./features/articles/article.routes.js";
import { commentsRouter } from "./features/comments/comments.routes.js";

export function createAndSetupApp() {
    const app = express();

    // App configuration
    setupGenerals(app);
    setupSessions(app);
    setupPassport(app);

    // ROUTES
    app.use("/api/auth", authRouter);
    app.use("/api/users", userRouter);
    app.use("/api/articles", articleRouter);
    app.use("/api/comments", commentsRouter);

    // ERROR HANDLERS
    app.use(catch404);
    app.use(errorHandler);

    return app;
}
