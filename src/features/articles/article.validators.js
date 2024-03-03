import joi from "joi";
import { ApiError } from "../../utils/ApiError";

const slugValidationSchema = joi.string().required().min(5).max(30).messages({
    "string.empty": "Article slug cannot be empty",
    "string.min": "Article slug should be 5 characters long at least",
    "string.max": "Article slug cannot be longer than 30 characters",
    "string.base": "Invalid article slug",
});

const allowedCategories = [
    "Web development",
    "Software development",
    "Programming languages",
    "Database",
    "Game development",
    "Workout",
    "Philosophy",
    "Psychology",
    "Literature",
    "Religion",
];
const categoryValidationSchema = joi
    .string()
    .required()
    .valid(...allowedCategories)
    .messages({
        "string.empty": "Category cannot be empty",
        "string.base": "Invalid category",
        "any.only": "Unknown category",
    });

export function categoryValidator(category) {
    const { error } = categoryValidationSchema.validate(category);
    if (error) {
        throw new ApiError(error.message, 400);
    }
}

export function slugValidator(slug) {
    const { error } = slugValidationSchema.validate(slug);
    if (error) {
        throw new ApiError(error.message, 400);
    }
}
