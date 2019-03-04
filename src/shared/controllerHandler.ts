/**
 * Handles controller execution and responds to user (API Express version).
 * @param promise Controller Promise. I.e. ControllerInstance().getUser.
 * @param params A function (req, res, next), all of which are optional
 * that maps our desired controller parameters. I.e. (req) => [req.params.username, ...].
 */
// tslint:disable-next-line:ban-types
export const controllerHandler = (promise: Function, params) => {
    return async (req, res, next) => {
        const boundParams = params ? params(req, res, next) : [];
        try {
            const result = await promise(...boundParams);
            return res.status(result.statusCode).json({
                status: result.status,
                data: result.data,
                message: result.message,
            });
        } catch (error) {
            next(error);
        }
    };
};
