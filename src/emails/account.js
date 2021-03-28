const nodemailer = require('nodemailer');

const sender_email = process.env.NODEMAILER_EMAIL;
const sender_password = process.env.NODEMAILER_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: sender_email,
        pass: sender_password
    }
});

const sendWelcomeEmail = (email, name) => {
    const mailOptions = {
        form: sender_email,
        to: email,
        subject: 'Welcome!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
    });
}

const sendGoodbyeEmail = (email, name) => {
    const mailOptions = {
        form: sender_email,
        to: email,
        subject: 'Goodbye!',
        text: `Goodbye, ${name}! We are sorry to see you go. We would like to know what prompted you leave us.`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
    });
}


module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}