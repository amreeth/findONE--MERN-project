import nodemailer from "nodemailer"

const verifyEmail = async (email, subject, text) => {
  // console.log('hiiiiiiiiiiiiiiii');
  // console.log(email);
  try {
    console.log('try inside');
    const transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      service: process.env.SMPT_SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMPT_MAIL,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

export default verifyEmail