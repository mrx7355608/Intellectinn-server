import crypto from "crypto";
import slugify from "slugify";

export function customSlugBuilder(title) {
    const slug = slugify(title, { lower: true });
    const randomString = crypto.randomBytes(3).toString("hex");
    const customSlug = slug.concat("-", randomString);
    return customSlug;
}
