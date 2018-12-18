import { SchemaMap } from "joi";

export interface IBaseInterface extends SchemaMap {
    createdAt?: Date;
    modifiedAt?: Date;
}
