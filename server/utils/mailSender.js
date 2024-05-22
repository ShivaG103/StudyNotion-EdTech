const nodemailer = require('nodemailer');
require('dotenv').config();

const mailSender = async (email, title, body, cc) =>{
    try {
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: 'StudyNotion || EdTech - by Shivam <studynotion404@gmail.com>',
            to:`${email}`,
            subject:`${title}`,
            cc: cc ? `${cc}` : null,
            html:`${body}`,
        });
        console.log(info);
        return info;

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = mailSender;