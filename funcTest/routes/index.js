const express = require('express');
const router = express.Router();
const controller = require('../controller/Ctodo')

router.get('/', controller.main);
router.get('/getThisMonthTodos', controller.thisMonth);

module.exports = router;