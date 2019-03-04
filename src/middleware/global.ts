import appRoot from "app-root-path";
import bodyParser = require("body-parser");
import cors = require("cors");
import { Express } from "express";
import express = require("express");
import logger from "morgan";
export default (app: Express) => {
    app.use(cors({ maxAge: 1728000 }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // api documentaion route
    // TODO: confirm if route is same on live server
    app.use(express.static(`${appRoot}/dist/apidoc`));

    app.use(logger("dev"));
    // app.use((req, res, next) => {
    //     if (!req.headers.authorization) {
    //       return res.status(403).json({ error: 'No credentials sent!' });
    //     }
    //     next();
    //   });
};
