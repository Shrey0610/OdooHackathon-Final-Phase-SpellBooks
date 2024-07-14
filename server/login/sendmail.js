const nodemailer=require('nodemailer');


exports.sendEmail=async(options)=>{
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6faacab63950f8",
      pass: "44b7a9f3b7d8d6"
    }
  });


        const mailOptions={
            from: "process.env.SMTP_EMAIL",
            to:options.email,
            subject:options.subject,
            text:options.message,
        }

        await transport.sendMail(mailOptions);
    


}