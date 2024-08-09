import jwt from "jsonwebtoken";

export function generateToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "10m",
    });

    return token;
}

export function verifyToken(token) {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload;
}
