const express = require('express');
const router = express.Router();
const controller = require('../controller/Ctodo');

//메인 : 기본 접속 시, 달력을 렌더링한다.
router.get('/', controller.main);

//week : date => 클릭 시, controller
router.get('/week',controller.week);
router.get('/date',controller.date);
router.get('/getThisMonthTodos', controller.thisMonth);

module.exports = router;