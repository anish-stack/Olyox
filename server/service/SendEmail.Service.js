const nodemailer = require('nodemailer');

class SendEmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_EMAIL_ID,
                pass: process.env.SMTP_EMAIL_PASSWORD
            }
        });
    }

    async sendEmail(to, subject, text) {
        const mailOptions = {
            from: process.env.SMTP_EMAIL_ID,
            to: to,
            subject: subject,
            html: text
        };

        try {
            let info = await this.transporter.sendMail(mailOptions);
           return true
        } catch (error) {
            console.error('Error sending email: ', error);
            return false

        }
    }
}

module.exports = SendEmailService;