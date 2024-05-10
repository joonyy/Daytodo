const express =require('express');
const router = express.Router();
const controller = require('../controller/Todo')

router.get('/month',controller.month);
// router.get('/week',controller);
// router.get('/date',controller);
// router.get('/date/:date',controller);
// router.get('/date/:id',controller);


module.exports = router;