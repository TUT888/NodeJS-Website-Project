const express = require('express');
const controller = require('../controllers/login_controller');

const router = express.Router();

router.get('/login', controller.displayLoginView);
router.post('/login', controller.userLogin);

router.get('/register', controller.displayRegisterView);
router.post('/register', controller.userRegister);

module.exports = router;