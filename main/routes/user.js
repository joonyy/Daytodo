const express =require('express');
const router = express.Router();
const controller = require('../controller/user')

router.get('/login',controller.login);

module.exports = router;