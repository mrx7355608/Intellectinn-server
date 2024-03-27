import joi from "joi";
import { ApiError } from "../../utils/ApiError.js";

const slugValidationSchema = joi.string().required().min(5).max(30).messages({
    "string.empty": "Article slug cannot be empty",
    "string.min": "Article slug should be 5 characters long at least",
    "string.max": "Article slug cannot be longer than 30 characters",
    "string.base": "Invalid article slug",
});

const categoryValidationSchema = joi.string().required().messages({
    "string.empty": "Category cannot be empty",
    "string.base": "Invalid category",
    "any.required": "Category is required",
});

const articleValidationSchema = joi.object({
    title: joi.string().required().min(10).max(100).messages({
        "any.required": "Title is required",
        "string.empty": "Title cannot be empty",
        "string.base": "Title should be a text value",
        "string.min": "Title should be at least 10 characters",
        "string.max": "Title cannot be longer than 100 characters",
    }),
    summary: joi.string().required().min(100).max(500).messages({
        "any.required": "Summary is required",
        "string.empty": "Summary cannot be empty",
        "string.base": "Summary should be a text value",
        "string.min": "Summary should be at least 100 characters",
        "string.max": "Summary cannot be longer than 500 characters",
    }),
    content: joi.string().required().min(500).messages({
        "any.required": "Article content is required",
        "string.empty": "Artilce content cannot be empty",
        "string.base": "Article content should be a text value",
        "string.min": "Article content should be at least 500 characters",
    }),
    thumbnail: joi.string().required().messages({
        "any.required": "Thumbnail is required",
        "string.empty": "Thumbnail cannot be empty",
        "string.base": "Invalid thumbnail",
    }),
    category: categoryValidationSchema,
    timeToReadInMinutes: joi.number().required().min(2).max(30).messages({
        "any.required": "Article's reading time is required",
        "number.empty": "Article's reading time cannot be empty",
        "number.base": "Article's reading time should be a number",
        "number.min": "Article's reading time should be 1 minute at least",
        "number.max": "Article's reading time cannot be longer than 30 minutes",
    }),
    is_published: joi.boolean().valid(true, false).required().messages({
        "any.required": "Article's publish status is required",
        "boolean.empty": "Article's publish status cannot be empty",
        "boolean.base": "Invalid article's publish status",
    }),
});

export function articleValidator(category) {
    const { error } = articleValidationSchema.validate(category);
    if (error) {
        throw new ApiError(error.message, 400);
    }
}

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
