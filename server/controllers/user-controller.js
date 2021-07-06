require('dotenv').config();

const UserService = require('../service/user-service');

const { CLIENT_URL } = process.env;

const { validationResult } = require('express-validator');

const ApiError = require('../exceptions/api-errors');

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }

      const { email, password } = req.body;

      const userData = await UserService.registration({ email, password });

      const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const userData = await UserService.login({ email, password });

      const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const token = await UserService.logout(refreshToken);

      res.clearCookie('refreshToken');

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
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      res.json('Hello world!');
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
