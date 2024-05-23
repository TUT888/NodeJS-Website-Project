const express = require('express');
const controller = require('../controllers/categories_controller');

const router = express.Router();

router.get('/categories', controller.displayAllByDefault);
router.get('/categories/:cateName', controller.displayAllByCategory)
router.get('/categories/:cateName/view/:productID', controller.displayProduct)

module.exports = router;