import joi from "joi";
import { ApiError } from "../../utils/ApiError.js";

const signupValidationSchema = joi.object({
    fullname: joi.string().min(8).max(30).required().messages({
        "any.required": "Full name is required",
        "string.empty": "Full name cannot be empty",
        "string.min": "Full name should be 8 characters long at least",
        "string.max": "Full name cannot be longer than 30 characters",
        "string.base": "Full name should be a text value",
    }),

    email: joi.string().email().required().messages({
        "any.required": "Email is required",
        "string.empty": "Email cannot be empty",
        "string.email": "Invalid email",
        "string.base": "Email should be a text value",
    }),

    password: joi.string().min(10).max(30).required().messages({
        "any.required": "Password is required",
        "string.empty": "Password cannot be empty",
        "string.min": "Password should be 10 characters long at least",
        "string.max": "Password cannot be longer than 30 characters",
        "string.base": "Password should be a text value",
    }),

    confirm_password: joi
        .string()
        .valid(joi.ref("password"))
        .required()
        .messages({
            "any.required": "Please confirm your password",
            "any.only": "Passwords do not match",
            "string.empty": "Please confirm your password",
            "string.base": "Confirm Password should be a text value",
        }),
});

export function signupValidator(data) {
    const { error } = signupValidationSchema.validate(data);
    if (error) {
        throw new ApiError(error.message, 400);
    }
}
