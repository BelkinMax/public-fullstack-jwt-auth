require('dotenv').config();

const UserService = require('../service/user-service');

const { CLIENT_URL, NODE_ENV } = process.env;

const { validationResult } = require('express-validator');

const ApiError = require('../exceptions/api-errors');

const cookieConfig = {
  secure: NODE_ENV !== 'development',
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  httpOnly: true,
};

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }

      const { username, email, password } = req.body;

      const userData = await UserService.registration({
        username,
        email,
        password,
      });

      // res.cookie('refreshToken', userData.refreshToken, cookieConfig);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const userData = await UserService.login({ email, password });

      // res.cookie('refreshToken', userData.refreshToken, cookieConfig);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const token = await UserService.logout(refreshToken);

      // res.clearCookie('refreshToken');

      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationUUID = req.params.link;

      await UserService.activate(activationUUID);

      return res.redirect(CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const userData = await UserService.refresh(refreshToken);

      // res.cookie('refreshToken', userData.refreshToken, cookieConfig);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(_, res, next) {
    try {
      const users = await UserService.getAllUsers();

      res.json(users);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
