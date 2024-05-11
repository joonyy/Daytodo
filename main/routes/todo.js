const express =require('express');
const router = express.Router();
const controller = require('../controller/Todo')

router.get('/',controller.month);
router.get('/week',controller.week);
router.get('/date',controller.date);
router.get('/date/:{date}', controller.showTodo);


module.exports = router;