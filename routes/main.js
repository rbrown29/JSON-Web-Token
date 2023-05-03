const express = require('express');

const router = express.Router();

const { login, dashboard } = require('../controllers/main.js');
const authMiddleware = require('../middleware/auth.js');

router.route('/dashboard').get(authMiddleware, dashboard);
router.route('/login').post(login);

module.exports = router;

