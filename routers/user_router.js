const express = require('express');
const verifyToken = require('../middlewares/authMiddleware');
const userController = require('../controllers/user_controller');

const router = express.Router();

router.get('/user', verifyToken, userController.displayView);

router.get('/logout', verifyToken, userController.userLogout);

module.exports = router;