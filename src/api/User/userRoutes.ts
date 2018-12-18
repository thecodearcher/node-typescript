import express from "express";
import { validation } from "../../middleware";
import { controllerHandler } from "./../shared/controllerHandler";
import { UserController } from "./userController";
import { UserValidationSchema } from "./userValidation";

const router = express.Router();
const call = controllerHandler;
const User = new UserController();

router.use(validation(UserValidationSchema));

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {String} id Users unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      status:true
 *      data:{
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *   }
 *
 */
router.get("/:id", call(User.getUserDetails, (req, res, next) => [req.params.id]));

/**
 * @api {post} /user/ Add User
 * @apiName AddUser
 * @apiGroup User
 *
 * @apiParam {JSON} UserModel Json data of user model .
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      status:true
 *      data:{
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *   }
 *
 * @apiSampleRequest off
 */
router.post("/", call(User.addUser, (req, res, next) => [req.body]));

export const userRouter = router;
