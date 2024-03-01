import { ApiError } from "./ApiError.js";
import validator from "validator";

export function validateMongoID(id, entity) {
    if (validator.isMongoId(id) === false) {
        throw new ApiError(`Invalid ${entity} id`, 400);
    }
}
