import Joi from "joi";
import _ from "lodash";
import { validationHandler } from "./../shared/validationHandler";

/**
 *  Validates incoming input in the body of a request.
 *  Runs only on POST or PUT requests
 *
 * @export
 * @param {*} schema validationSchema for this route
 * @returns
 */
export default (schema: Joi.ObjectSchema, options?: Joi.ValidationOptions) => {

    // enabled HTTP methods for request data validation
    const _supportedMethods = ["post", "put"];

    // Joi validation options
    const _validationOptions = {
        abortEarly: false, // abort after the last validation error
        allowUnknown: true, // allow unknown keys that will be ignored
        stripUnknown: true, // remove unknown keys from the validated data
        ...options,
    };

    // return the validation middleware
    return (req, res, next) => {
        const method = req.method.toLowerCase();

        if (_.includes(_supportedMethods, method) && schema) {

            // Validate req.body using the schema and validation options
            const validationRes = Joi.validate(req.body, schema, _validationOptions, validationHandler);
            if (!validationRes.status) {
                res.status(400).json(validationRes.data);
            } else {
                // Replace req.body with the data after Joi validation
                req.body = validationRes.data;
                next();
            }

        }
    };
};
