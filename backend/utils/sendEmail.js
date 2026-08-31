import nodemailer from "nodemailer";


// ========================================
// CREATE MAIL TRANSPORTER
// ========================================

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
    
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


// ========================================
// REGISTRATION EMAIL
// ========================================

const sendRegistrationEmail = async (lead) => {

    const mailOption = {
        from: `"Rise & Rebuild" <${process.env.EMAIL_USER}>`,

        to: lead.email,

        subject: "Registration Successful — Rise & Rebuild Season 2",

        html: `
            <div style="font-family: Arial, sans-serif; padding: 30px;">


                <h1 style="color:#c9973f;">
                    You're In.
                </h1>

                <p>Hi ${lead.fullName},</p>

                <p>
                    Your registration for the
                    <strong>Rise & Rebuild Season 2 Priority List</strong>
                    has been successfully received.
                </p>

                <p>
                    You will be among the first to know when Season 2 is revealed.
                </p>

                <hr />

                <p>
                    <strong>Rise & Rebuild</strong>
                </p>

                <p>
                    From Inspiration to Transformation.
                </p>

            </div>
        `,
    };

    await transporter.sendMail(mailOption);
};


// ========================================
// PASSWORD RESET EMAIL
// ========================================

export const sendPasswordResetEmail = async ({
    email,
    fullName,
    resetUrl,
}) => {

    const mailOption = {
        from: `"Rise & Rebuild" <${process.env.EMAIL_USER}>`,

        to: email,

        subject: "Reset Your Password — Rise & Rebuild",

        html: `
            <div style="
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: 0 auto;
                padding: 30px;
                background-color: #ffffff;
                color: #333333;
            ">

                <h1 style="
                    color: #c9973f;
                    margin-bottom: 20px;
                ">
                    Reset Your Password
                </h1>

                <p>
                    Hi ${fullName},
                </p>

                <p>
                    We received a request to reset the password
                    for your Rise & Rebuild account.
                </p>

                <p>
                    Click the button below to create a new password.
                </p>

                <div style="margin: 30px 0;">

                    <a
                        href="${resetUrl}"
                        style="
                            display: inline-block;
                            padding: 14px 28px;
                            background-color: #c9973f;
                            color: #ffffff;
                            text-decoration: none;
                            border-radius: 6px;
                            font-weight: bold;
                        "
                    >
                        RESET PASSWORD
                    </a>

                </div>

                <p>
                    This password reset link will expire in
                    <strong>15 minutes</strong>.
                </p>

                <p>
                    If you did not request a password reset,
                    you can safely ignore this email.
                </p>

                <hr style="
                    margin: 30px 0;
                    border: none;
                    border-top: 1px solid #dddddd;
                " />

                <p>
                    <strong>Rise & Rebuild</strong>
                </p>

                <p>
                    From Inspiration to Transformation.
                </p>

            </div>
        `,
    };

    await transporter.sendMail(mailOption);
};


export default sendRegistrationEmail;