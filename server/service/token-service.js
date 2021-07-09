require('dotenv').config();

const jwt = require('jsonwebtoken');

const tokenModel = require('../models/token-model');

const { JWT_ACCESS_KEY, JWT_REFRESH_KEY } = process.env;

const EXPIRES_ACCESS = '1d';
const EXPIRES_REFRESH = '30d';

class TokenService {
  generateTokens(payload) {
    // Generate access token
    const accessToken = jwt.sign(payload, JWT_ACCESS_KEY, {
      expiresIn: EXPIRES_ACCESS,
    });

    // Generate refresh token
    const refreshToken = jwt.sign(payload, JWT_REFRESH_KEY, {
      expiresIn: EXPIRES_REFRESH,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, JWT_ACCESS_KEY);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, JWT_REFRESH_KEY);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(params) {
    const { userId, refreshToken } = params;

    // !!! Token will rewrite if login from another device/browser, so the user can stay logged in only from ONE device/browser
    const tokenData = await tokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return tokenData.save();
    }

    const token = await tokenModel.create({ user: userId, refreshToken });

    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ refreshToken });
    return tokenData;
  }
}

module.exports = new TokenService();
