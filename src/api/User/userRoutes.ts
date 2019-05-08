import express from "express";
import { authorize, validation } from "../../middleware";
import { controllerHandler } from "./../../shared/controllerHandler";
import { UserController } from "./userController";
import { UserValidationSchema } from "./userValidation";

const router = express.Router();
const call = controllerHandler;
const User = new UserController();

router.use(authorize);
router.use(validation(UserValidationSchema));

router.get("/:id", call(User.getUserDetails, (req, _res, _next) => [req.params.id]));

router.post("/", call(User.addUser, (req, _res, _next) => [req.body]));

export const userRouter = router;
