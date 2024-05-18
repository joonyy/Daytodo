const express =require('express');
const router = express.Router();
const controller = require('../controller/Cother')

router.get('/createNew',controller.createNew);

module.exports = router;