import nodemailer from 'nodemailer';
// const functions = require('firebase-functions')
// Importing necessary modules for nodemailer configuration
const email = 'danieltestingemail2@gmail.com';
// Importing necessary modules for nodemailer configuration
const pass = 'powdfxsiicewpwth'
// Importing necessary modules for nodemailer configuration

 export const transporter = nodemailer.createTransport({
    service:"gmail",
    auth :{
        user: email,
        pass: pass
    },
    tls :{
        rejectUnauthorized:false
    }
});


