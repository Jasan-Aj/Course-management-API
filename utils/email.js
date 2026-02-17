import nodemailer from "nodemailer";

export const sendEmail = async ({to, subject, text, html}) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.example.com",
        port: 587,
        secure: false,
        auth: {
            user: "your_email@example.com",
            pass: "your_password"
        }
    });

    const mailOptions = {
        from: "your_email@example.com",
        to,
        subject,
        text,
        html
    };

    await transporter.sendMail(mailOptions);
};
