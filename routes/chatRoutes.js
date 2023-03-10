const express = require('express')

const chatControllers = require('../controllers/chatControllers')

const router = express.Router()

router.route('/').post(chatControllers.createChat)
router.route('/:id').get(chatControllers.getChatById)



module.exports = router