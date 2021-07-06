class EmailService {
  async sendActivationEmail(params) {
    const { email, link } = params;
  }
}

module.exports = new EmailService();
