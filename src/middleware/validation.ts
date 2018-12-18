import Joi from "joi";
import _ from "lodash";

/**
 *  Validates incoming input in the body of a request.
 *  Runs only on POST or PUT requests
 *
 * @export
 * @param {*} schema validationSchema for this route
 * @returns
 */
export default (schema: Joi.ObjectSchema) => {

    // enabled HTTP methods for request data validation
    const _supportedMethods = ["post", "put"];

    // Joi validation options
    const _validationOptions = {
        abortEarly: false, // abort after the last validation error
        allowUnknown: true, // allow unknown keys that will be ignored
        stripUnknown: true, // remove unknown keys from the validated data
    };

    // return the validation middleware
    return (req, res, next) => {
        const method = req.method.toLowerCase();

        if (_.includes(_supportedMethods, method) && schema) {

            // Validate req.body using the schema and validation options
            return Joi.validate(req.body, schema, _validationOptions, (err, data) => {

                if (err) {

                    // Joi Error
                    const JoiError = {
                        status: false,
                        error: {
                            original: err._object,

                            // fetch only message and type from each error
                            details: _.map(err.details, ({ message, type }) => ({
                                message: message.replace(/['"]/g, ""),
                                type,
                            })),
                        },
                    };

                    // Send back the JSON error response
                    res.status(400).json(JoiError);

                } else {
                    // Replace req.body with the data after Joi validation
                    req.body = data;
                    next();
                }

            });

        }

        next();
    };
};
