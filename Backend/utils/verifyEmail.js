import nodemailer from "nodemailer"

const verifyEmail = async (email, subject, text) => {
  
  try {
    console.log('try inside');
    console.log(process.env.SMPT_MAIL);
    console.log(process.env.SMPT_PASSWORD);
    
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
    // console.log(transporter,'transporte');

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