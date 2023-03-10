const jwt = require('jsonwebtoken')

const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const User = require('../models/userModel')

const signToken = id => {
    return jwt.sign( {id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXP
    })
}

const sendTokenandResponse = (doc, statusCode, res) => {
    const token = signToken(doc.id)

    doc.password = undefined

    return res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            doc
        }
    })
}

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body

    if(!email || !password) {
        return next( new AppError('Please provide email or password!', 400))
    }

    const doc = await User.findOne({email}, {}).select('+password')

    if(!doc || !(await doc.correctPassword(password, doc.password))) {
        return next(new AppError('email or password are incorrect!', 401))
    }

    sendTokenandResponse(doc, 200, res)
})