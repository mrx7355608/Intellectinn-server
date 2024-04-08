import joi from "joi";
import { ApiError } from "../../utils/ApiError.js";

const editUserValidationSchema = joi.object({
    profilePicture: joi.string().messages({
        "string.empty": "Profile picture url cannot be empty",
        "string.base": "Invalid profile picture url",
    }),
    topicsInterestedIn: joi.array().items(joi.string()).messages({
        "array.empty": "Add at least 1 topic you are interested in",
        "array.base": "Invalid topics",
    }),
    about: joi.string().min(50).max(500).messages({
        "string.empty": "About cannot be empty",
        "string.base": "Invalid about content",
        "string.min": "About should be 50 characters long at least",
        "string.max": "About cannot be longer than 500 characters",
    }),
});

export function editDataValidator(data) {
    const { error } = editUserValidationSchema.validate(data);
    if (error) {
        throw new ApiError(error.message, 400);
    }
}
