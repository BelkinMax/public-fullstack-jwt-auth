require('dotenv').config();

const { PORT, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, API_URL } =
  process.env;

const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  async sendActivationEmail(params) {
    const { email, code } = params;

    const url = `${API_URL}:${PORT}/api/activate/${code}`;

    try {
      await this.transporter.sendMail({
        from: SMTP_USER,
        to: email,
        subject: `Test email activation on ${API_URL}`,
        text: '',
        html: `
        <div>
          <a href="${url}"><h1>Email activation link</h1></a>
        </div>
        `,
      });
    } catch (e) {
      console.log('email-service/sendActivationEmail');
      console.error(e);
    }
  }
}

module.exports = new EmailService();
