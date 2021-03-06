const express = require('express');
const { check } = require('express-validator');

const controllers = require('../controllers/messages-controllers');

const router = express.Router();

router.post('/:gid', controllers.addMessage);

router.get('/:gid', controllers.getMessages);

module.exports = router;
