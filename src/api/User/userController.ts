import { BaseController } from "./../baseController";
import { IUser } from "./IUser";
import { UserService } from "./userService";

/**
 * User controller
 *
 * @export
 * @class UserController
 */
export class UserController extends BaseController {
    private _userService = new UserService();

    public getUserDetails = async (id) => {
        let user = await this._userService.getUser(id);
        return this.sendResponse(user);
    }

    public addUser = async (user: IUser) => {
        let response = await this._userService.saveUser(user);
        return this.sendResponse(response);
    }
}
