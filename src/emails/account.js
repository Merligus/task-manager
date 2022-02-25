const sgMail = require("@sendgrid/mail")

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) =>
{
    sgMail.send
    (
        {
            to: email,
            from: "guga502008@hotmail.com",
            subject: "Welcome",
            text: `Welcome ${name}`
        }
    )
}

const sendGoodbyeEmail = (email, name) =>
{
    sgMail.send
    (
        {
            to: email,
            from: "guga502008@hotmail.com",
            subject: "Goodbye",
            text: `Goodbye ${name}`
        }
    )
}

module.exports = 
{
    sendWelcomeEmail,
    sendGoodbyeEmail
}