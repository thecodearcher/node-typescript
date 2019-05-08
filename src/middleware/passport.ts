import bcrypt from "bcrypt";
import _ from "lodash";
import { ExtractJwt, Strategy as JWTstrategy } from "passport-jwt";
import { Strategy as localStrategy } from "passport-local";
import { UsersModel } from "../api/User";
import { IUser } from "./../api/User/IUser";
import { JWT_SECRET } from "./../config/index";
import { AppError } from "./../utils/app-error";

export const signupStrategy = new localStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
}, async (req, username, password, done) => {
    try {
        const body: any = _.pick(req.body,
            ["username", "email", "phone_number", "first_name", "last_name", "gender", "date_of_birth"]);
        // TODO: check for phone number
        const exUser = await UsersModel.findOne({ where: { username } });

        if (exUser) {
            return done(new AppError(`An account with "${username}" already exist. Please login to continue`));
        }
        const passwordHash = bcrypt.hashSync(password, 10);
        const user = await UsersModel.create(
            {
                username,
                password: passwordHash,
                ...body,
            });

        // Send the user information to the next middleware
        return done(null, user);
    } catch (error) {
        done(Error(error));
    }
});

export const loginStrategy = new localStrategy({
    usernameField: "username",
    passwordField: "password",
}, async (username, password, done) => {
    try {
        const user = <IUser> await UsersModel.findOne({ where: { username } });
        if (!user) {
            return done(null, false, { message: "User not found" });
        }
        const validate = await bcrypt.compare(password, user.password);
        if (!validate) {
            return done(null, false, { message: "Wrong Password" });
        }
        // Send the user information to the next middleware
        return done(null, user, { message: "Logged in Successfully" });
    } catch (error) {
        return done(error);
    }
});

export const jwtStrategy = new JWTstrategy({
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, async (token, done) => {
    try {
        // Pass the user details to the next middleware
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
});
