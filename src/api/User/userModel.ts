import Sequelize from "sequelize";
import { DB } from "../../shared/database";
import { logger } from "../../utils/logger";

export const UsersModel = DB.define("users",
    {
        username: {
            type: Sequelize.STRING,
            validate: {
                is: /^[a-zA-Z0-9_-]{3,16}$/i,
                notEmpty: {
                    msg: "Username cannot be empty",
                },
            },
        },
        email: {
            type: Sequelize.STRING,
            unique: {
                name: "email",
                msg: "An account already exists with this email address.",
            },
            validate: {
                isEmail: { msg: "Please check this is a valid email" },
                notEmpty: { msg: "email can't be empty" },
            },
        },
        phone_number: {
            type: Sequelize.STRING,
            validate: {
                isNumeric: {
                    msg: "Please confirm phonenumber contains valid characters",
                },
            },
        },
        password: {
            type: Sequelize.STRING(255),
        },
        first_name: {
            type: Sequelize.STRING,
            validate: {
                min: 2,
            },
        },
        last_name: {
            type: Sequelize.STRING,
            validate: {
                min: 2,
            },
        },
        gender: {
            type: Sequelize.STRING,
        },
        date_of_birth: {
            type: Sequelize.STRING,
        },
        membership_type: {
            type: Sequelize.STRING,
            defaultValue: "user",
        },
        email_verification_code: {
            type: Sequelize.STRING(255),
        },
        verified: {
            type: Sequelize.TINYINT,
            defaultValue: 0,
        },
        socket_id: {
            type: Sequelize.STRING,
        },
    },
);

// force: true will drop the table if it already exists
UsersModel.sync({ alter: true }).then(() => {
    logger.info("Users table migrated");
    // Table created
});
