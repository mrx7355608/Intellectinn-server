import { Schema, model } from "mongoose";

const articleSchema = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true },
        content: { type: String, required: true },
        thumbnail: { type: String, required: true },
        summary: { type: String, required: true },
        tags: { type: [String], required: true },
        author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
        likes: { type: [String], default: [] },
        timeToReadInMinutes: { type: String, required: true },
        is_published: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    },
);

const ArticleModel = model("Article", articleSchema);

export { ArticleModel };
