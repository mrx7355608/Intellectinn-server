import { createTransport } from "nodemailer";

const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.NODE_ENV === "production", // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendVerificationMail(userEmail, token) {
    await transporter.sendMail({
        from: process.env.EMAIL_SENDER,
        to: userEmail,
        subject: "Email Verification",
        html: `
                <h3>Thank you for signing up!</h3>
                <p>Click the link below to verify your  Intellectinn account</p>
                <a href="${process.env.SERVER_URL}/auth/verify-email?token=${token}">Verify</a>

            `,
    });
}

export async function sendPasswordResetMail(userEmail, token) {
    await transporter.sendMail({
        from: process.env.EMAIL_SENDER,
        to: userEmail,
        subject: "Password Reset",
        html: `
                <h3>Reset your password</h3>
                <p>Click the link below to reset your password</p>
                <a href="${process.env.SERVER_URL}/auth/reset-password?token=${token}">Verify</a>

            `,
    });
}
