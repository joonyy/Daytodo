const express =require('express');
const router = express.Router();
const controller = require('../controller/Ctodo')

//월간 뷰 보여주기+ 해당 월 투두 제목 리스트 가져오기
router.get('/',controller.month);

//주간 뷰 보여주기+ 해당 주 투두 제목 리스트 가져오기
router.get('/week',controller.week);

//일간 뷰 보여주기 + 해당일 (투두 제목 리스트 + id) 가져오기
router.get('/date',controller.date);

//일간 뷰 -> 해당일 투두 제목의 자세한 투두 가져오기
router.get('/showTodo', controller.showTodo);

//일간 뷰 -> 새로운 투두 생성
router.post('/newTodo', controller.createTodo);

//일간 뷰 -> 수정하기 클릭
router.get('/editTodo', controller.editTodo);

//일간 뷰 -> 
router.get('/updateTodo', controller.updateTodo);

router.delete('/deleteTodo', controller.deleteTodo);

module.exports = router;