import passport from "passport";
import { UsersModel } from "./../api/User";
import { AppError } from "./../utils/app-error";

/**
 * middleware for checking authorization with jwt
 */
export const authorize = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (error, token) => {
        if (error || !token) {
            return next(new AppError("Unauthorized", null, 401));
        }
        try {
            const user = await UsersModel.findOne({ where: { username: token.username } });
            req.user = user;
        } catch (error) {
            return next(error);
        }
        next();
    })(req, res, next);
};
