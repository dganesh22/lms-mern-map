const nodemailer = require('nodemailer')

const mailsend = async (to,subject,template,files=[]) => {
      try {
          // transporter
    const transporter = await nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    // sending mail
    let info = await transporter.sendMail({
        from: process.env.MAIL_USER,
        to,
        subject,
        html: `<div> ${template} </div>`,
        attachments: files
    })
    return info
      } catch (err) {
        return err.message
      }
}

module.exports = mailsend