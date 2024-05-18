const express = require('express');
const router = express.Router();
const controller = require('../controller/Ctodo')

router.get('/', controller.main);
router.get('/week',controller.week);
router.get('/date',controller.date);
router.get('/getThisMonthTodos', controller.thisMonth);

module.exports = router;