const nodeMailer = require("nodemailer");
const  { ResetPasswordToken} = require("../utils/auth")
const { Html } = require("./html/mailTemplate")
async function Mailing (id, email, name) {

    const tranporter = nodeMailer.createTransport({
        service: "gmail",
        type: "SMTP",
        host: "smtp.gmail.com",
        secure: true,
        auth: {
            user: process.env.BOTMAIL,
            pass: process.env.PASSWORDMAIL
        }
    });
    
    // const token = ResetPasswordToken(id, name)
    const html = Html(id, name)

    const message = {
        from: process.env.email,
        to: email,
        subject: "Link to reset your password",
        html: html
    }

    const res =  await tranporter.sendMail(message)
    if (res.accepted.length == 0) {
        return { message: "Error sending email", isValid: false }
    } else {
        return { message: "Email sent", isValid: true }
    }
}

module.exports = {
    Mailing
}