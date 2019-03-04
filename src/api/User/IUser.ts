import { IBaseInterface } from "../baseInterface";

export interface IUser extends IBaseInterface {
    // type any is used to prevent error on validation level
    firstName: any;
    lastName: any;
}
