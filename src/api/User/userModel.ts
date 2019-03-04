import Sequelize from "sequelize";
import { DB } from "../../shared/database";
import { logger } from "../../utils/logger";

export const UsersModel = DB.define("users", {
    displayName: {
        type: Sequelize.STRING,
        validate: { notEmpty: { msg: "Display name cannot be empty" } },
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
    phoneNumber: {
        type: Sequelize.STRING,
        validate: { isNumeric: { msg: "Please confirm phonenumber contains valid characters" } },
    },

});

// force: true will drop the table if it already exists
UsersModel.sync({ alter: true }).then(() => {
    logger.info("Users table migrated");
    // Table created
});
