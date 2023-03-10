const Message = require('../models/messageModel')
const catchAsync = require('../utils/catchAsync')

exports.createMessage = catchAsync(async (req, res, next) => {
    const doc = await Message.create(req.body)

    res.status(201).json({
        status: 'success',
        data : {
            doc
        }
    })
})

exports.getAllMessages = catchAsync(async (req, res, next) => {
    const doc = await Message.find(req.query) 

    res.status(200).json({
        status: 'success',
        data: {
            doc
        }
    })
})