import { ApiError } from "./ApiError.js";

export function validateMongoID(id, entity) {
    if (validator.isMongoId(id)) {
        throw new ApiError(`Invalid ${entity} id`);
    }
}
