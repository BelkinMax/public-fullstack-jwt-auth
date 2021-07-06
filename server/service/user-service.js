const UserModel = require('../models/user-model');

const bcrypt = require('bcrypt');

const uuid = require('uuid');

const EmailService = require('./email-service');

const TokenService = require('./token-service');

const UserDto = require('../dtos/user-dto');

class UserService {
  async registration(params) {
    const { email, password } = params;

    // Check if email already in use
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw new Error(`User with email address: ${email} already exists!`);
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 5);

    // Create and send activation uuid
    const activationUUID = uuid.v4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink: activationUUID,
    });

    await EmailService.sendActivationEmail({ email, uuid: activationUUID });

    // Generate and save tokens
    const userDto = new UserDto(user);
    const tokens = await TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken({
      userId: userDto.id,
      refreshToken: tokens.refreshToken,
    });

    return {
      ...tokens,
      user: userDto,
    };
  }
}

module.exports = new UserService();
