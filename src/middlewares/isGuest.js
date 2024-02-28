export function isGuest(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    return res.status(403).json({
        ok: false,
        error: "You are already logged in, please logout to continue",
    });
}
