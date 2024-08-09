import jwt from "jsonwebtoken";

export function generate(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "10m",
    });

    return token;
}

export function verify(token) {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    return isValid;
}
