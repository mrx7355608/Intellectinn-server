import { Schema, model } from "mongoose";

const commentSchema = new Schema(
    {
        text: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
        articleId: { type: Schema.Types.ObjectId, required: true },
    },
    {
        timestamps: true,
    },
);

const CommentModel = model("Comment", commentSchema);

export { CommentModel };
