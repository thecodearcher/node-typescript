import { IUser } from "./IUser";
import { UserModel } from "./userModel";

export class UserService {
    public getUser(_id: string) {
          return UserModel.findById({ _id });
    }

    public saveUser(user: IUser) {
        return new UserModel(user).save();
    }
}
