const UserModel = require('../models/user-model');

class UserService {
  async registration(params) {
    const { email, password } = params;

    // Check if email already in use
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw new Error(`User with email address: ${email} already exists!`);
    }

    // Encode password
    const encodedPassword = '';

    const user = await UserModel.create({ email, encodedPassword });
  }
}

module.exports = new UserService();
