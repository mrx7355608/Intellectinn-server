import joi from "joi";
import { ApiError } from "../../utils/ApiError.js";

const commentValidationSchema = joi.object({
    text: joi.string().min(1).required().messages({
        "any.required": "Comment text is required",
        "string.empty": "Comment text cannot be empty",
        "string.base": "Comment text should be a text",
    }),
});

export function commentValidator(data) {
    const { error } = commentValidationSchema.validate(data);
    if (error) {
        throw new ApiError(error.message, 400);
    }
}
