const express = require('express');
const router = express.Router();
const controller = require('../controller/Ctodo');

//메인 : 기본 접속 시, 달력을 렌더링한다.
router.get('/', controller.main);

//week : date페이지를 거쳐야 올 수 있는 주단위 페이지
router.get('/week',controller.week);

//date : 달력에서 클릭 시 넘어오는 메인 페이지.
router.get('/date',controller.date);


//getThisMonthTodos : 이번해 + 이번달의 todo 가져오기. 
router.get('/getThisMonthTodos', controller.thisMonth);

router.get('/viewtodo',controller.viewTodo);

//todo 추가하기 : date페이지에서 새로운 todos를 추가합니다.
router.post('/addTodos',controller.addTodos);

router.patch('/updateTodos', controller.updateTodos);

router.delete('/deleteTodos', controller.deleteTodos);
module.exports = router;