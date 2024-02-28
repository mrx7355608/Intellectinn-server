import { ApiError } from "./ApiError.js";

export function catch404(_req, _res, next) {
    return next(new ApiError("Page not found", 404));
}

export function errorHandler(err, _req, res, _next) {
    const status = err.statusCode || 500;
    const message = err.message || "Internal server error";
    console.log({ message });

    if (process.env.NODE_ENV === "production") {
        res.status(status).json({
            ok: false,
            error: message,
        });
    } else {
        res.status(status).json({
            ok: false,
            error: message,
            stack: err.stack,
        });
    }
}
