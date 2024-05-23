const express = require('express');
const controller = require('../controllers/query_controller');

const router = express.Router();

router.get('/queryform', controller.displayView)
router.post('/queryform', controller.submitQuery)

router.get('/querylist', controller.getQueries)

module.exports = router;