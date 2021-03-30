"use strict";

var nodemailer = require('nodemailer');

var sender_email = process.env.NODEMAILER_EMAIL;
var sender_password = process.env.NODEMAILER_PASSWORD;
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: sender_email,
    pass: sender_password
  }
});

var sendWelcomeEmail = function sendWelcomeEmail(email, name) {
  var mailOptions = {
    form: sender_email,
    to: email,
    subject: 'Welcome!',
    text: "Welcome to the app, ".concat(name, ". Let me know how you get along with the app.")
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
};

var sendGoodbyeEmail = function sendGoodbyeEmail(email, name) {
  var mailOptions = {
    form: sender_email,
    to: email,
    subject: 'Goodbye!',
    text: "Goodbye, ".concat(name, "! We are sorry to see you go. We would like to know what prompted you leave us.")
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
};

module.exports = {
  sendWelcomeEmail: sendWelcomeEmail,
  sendGoodbyeEmail: sendGoodbyeEmail
};