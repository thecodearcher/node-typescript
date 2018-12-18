import mongoose, { Document, Model } from "mongoose";
import { IUser } from "./IUser";

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
}, { timestamps: true });

export interface IUserDocument extends IUser, Document {
    fullName(v?: string);
    fullName(): string;
}

export interface IUserModel extends Model<IUserDocument> {
    findByFullName(v: string): mongoose.DocumentQuery<IUserDocument, IUserDocument>;
}

class User extends mongoose.Model {
    // `fullName` becomes a virtual
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    set fullName(v) {
        const firstSpace = v.indexOf(" ");
        this.firstName = v.split(" ")[0];
        this.lastName = firstSpace === -1 ? "" : v.substr(firstSpace + 1);
    }

    // `findByFullName()` becomes a static
    public static findByFullName(name: string) {
        const firstSpace = name.indexOf(" ");
        const firstName = name.split(" ")[0];
        const lastName = firstSpace === -1 ? "" : name.substr(firstSpace + 1);
        return UserModel.findOne({ firstName });
    }

    // `getFullName()` becomes a document method
    public getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

UserSchema.loadClass(User);
export const UserModel = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);
