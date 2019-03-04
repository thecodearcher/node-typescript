import { SchemaMap } from "joi";

export interface IBaseInterface extends SchemaMap {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
