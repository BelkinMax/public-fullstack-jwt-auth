const { Router } = require('express');

const router = new Router();

const UserController = require('../controllers/user-controller');

const { body } = require('express-validator');

const authMiddleware = require('../middleware/auth-middleware');

router.post(
  '/registration',
  body('username').isLength({ min: 4, max: 12 }),
  body('email').isEmail(),
  body('password').isLength({ min: 4, max: 32 }),
  UserController.registration
);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/users', authMiddleware, UserController.getUsers);
router.get(
  '/clientUsers',
  authMiddleware,
  UserController.getUsersExceptCurrent
);

module.exports = router;
