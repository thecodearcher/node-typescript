import _ from "lodash";

export const validationHandler = (err, data) => {
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
        return { status: false, data: JoiError };

    } else {
        // Return with the data after Joi validation
        return { status: true, data };
    }

};
