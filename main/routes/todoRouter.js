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

//viewtodo 페이지 렌더
router.get('/viewtodo',controller.viewTodo);

//todo 추가하기 : date페이지에서 새로운 todos를 추가합니다.
router.post('/addTodos',controller.addTodos);

//todo 수정하기 : date 페이지에서 todos를 수정합니다.
router.patch('/updateTodos', controller.updateTodos);

//todo 완료여부 선택하기 : date페이지에서 투두 완료여부를 체크합니다.
router.patch('/toggleTodo',controller.toggleTodos);

//todo 삭제하기 : date 페이지에서 todos를 삭제합니다.
router.delete('/deleteTodos', controller.deleteTodos);

module.exports = router;