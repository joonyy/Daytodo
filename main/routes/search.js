const express =require('express');
const router = express.Router();
const controller = require('../controller/Csearch')

router.get('/tags',controller.searchTags);

module.exports = router;