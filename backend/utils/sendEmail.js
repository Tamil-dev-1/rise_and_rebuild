import nodemailer from "nodemailer";


const sendRegistrationEmail = async (lead) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",

        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOption = {
        from:`"Rise & Rebuild" <${process.env.EMAIL_USER}>`,
        to: lead.email,

         subject: "Registration Successful — Rise & Rebuild Season 2",

         html:`<div style="font-family: Arial, sans-serif; padding: 30px;>
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

export default sendRegistrationEmail;