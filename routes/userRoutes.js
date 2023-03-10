const express = require('express')

const authControllers = require('../controllers/authControllers')
const userControllers = require('../controllers/userControllers')

const router = express.Router()

router.post('/log-in', authControllers.login)

router.route('/').get(userControllers.getAllUser)
router.route('/:id').get(userControllers.getOneUser)

module.exports = router