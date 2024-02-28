export function catchAsyncError(controllerFunc) {
    return async function (req, res, next) {
        try {
            const httpObj = {
                body: req.body,
                params: req.params,
                query: req.query,
                user: req.user,
            };
            const response = await controllerFunc(httpObj);
            res.status(response.status).json({
                ok: true,
                data: response.data,
            });
        } catch (err) {
            next(err);
        }
    };
}
