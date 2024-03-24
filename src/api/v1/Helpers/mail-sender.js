const nodemailer = require('nodemailer');

const sendMail = async (sub,msg,receiver) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    secureConnection: false,
    tls: {
      ciphers: "SSLv3",
    },
    requireTLS: true,
    port: 465,
    debug: true,
    service: 'gmail',
    auth: {
      user: 'tourplanner.ai@gmail.com',
      pass: 'lsic vvnx ablv aqfx',
      // user: 'abdullahansari9768@gmail.com',
      // pass: 'vgvk fdhs ikdo ljze',
    },
  });

  const mailOptions = {
    from: 'tourplanner.ai@gmail.com',
    to: receiver,
    subject: sub,
    // html: `Click <a href="http://yourdomain.com/verify?token=${"token"}">here</a> to verify your email.`,
    html: msg,
  };
  await transporter.sendMail(mailOptions);

}

module.exports = {
  sendMail
}