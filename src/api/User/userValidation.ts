import Joi from "@hapi/joi";
import { IUser } from "./IUser";

export const UserValidationSchema = Joi.object().keys(<IUser> {
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
});
