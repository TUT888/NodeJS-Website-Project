const express = require('express');
const controller = require('../controllers/home_controller');

const router = express.Router();

router.get('/', controller.displayView);

module.exports = router;