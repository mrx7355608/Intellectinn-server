import { Router } from "express";
import { UserModel } from "../users/user.model.js";
import { ArticleModel } from "../articles/articles.model.js";

export const searchRouter = Router();

searchRouter.get("/", async (req, res, next) => {
    const query = req.query.q;
    const regexQueryObject = {
        $regex: new RegExp(query),
        $options: "i",
    };
    try {
        // Users
        const users = await UserModel.find(
            {
                fullname: regexQueryObject,
            },
            "-password -email -__v -updatedAt",
        );

        // Articles
        const articles = await ArticleModel.find({
            $or: [
                {
                    title: regexQueryObject,
                },
                {
                    summary: regexQueryObject,
                },
                { tags: regexQueryObject },
            ],
        }).populate("author", "profilePicture fullname");

        // Tags
        const allTags = [];
        articles.forEach((article) => {
            allTags.push(...article.tags);
        });

        const tags = Array.from(new Set(allTags));

        return res.status(200).json({
            ok: true,
            data: {
                users,
                articles,
                tags,
            },
        });
    } catch (err) {
        next(err);
    }
});
