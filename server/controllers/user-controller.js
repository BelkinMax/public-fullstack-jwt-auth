const UserService = require('../service/user-service');

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;

      const userData = await UserService.registration({ email, password });

      const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      console.log('UserController/registration');
      console.error(e);
    }
  }

  async login(req, res, next) {
    try {
    } catch (e) {
      console.error(e);
    }
  }

  async logout(req, res, next) {
    try {
    } catch (e) {
      console.error(e);
    }
  }

  async activate(req, res, next) {
    try {
    } catch (e) {
      console.error(e);
    }
  }

  async refresh(req, res, next) {
    try {
    } catch (e) {
      console.error(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      res.json('Hello world!');
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = new UserController();
