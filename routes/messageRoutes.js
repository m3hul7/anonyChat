const express = require('express')

const messageControllers = require('../controllers/messageControllers')

const router = express.Router()

router.route('/').post(messageControllers.createMessage).get(messageControllers.getAllMessages)

module.exports = router