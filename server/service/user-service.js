const UserModel = require('../models/user-model');

const bcrypt = require('bcrypt');

const uuid = require('uuid');

const EmailService = require('./email-service');

const TokenService = require('./token-service');

const UserDto = require('../dtos/user-dto');

const ApiError = require('../exceptions/api-errors');

class UserService {
  async registration(params) {
    const { email, password } = params;

    // Check if email already in use
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(
        `User with email address: ${email} already exists!`
      );
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

  async activate(activationLink) {
    try {
      const user = await UserModel.findOne({ activationLink });

      if (!user) {
        throw ApiError.BadRequest('Bad activation url');
      }

      user.isActivated = true;

      await user.save();
    } catch (e) {
      console.log('👾 user-service/activate 👾');
      console.error(e);
    }
  }

  async login(props) {
    const { email, password } = props;

    // Check if email exists in ddbb
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest(`Email: ${email} not exists!`);
    }

    // Compare hash password
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      throw ApiError.BadRequest('Password is not correct!');
    }

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
