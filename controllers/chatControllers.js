const Chat = require('../models/chatModel')
const catchAsync = require('../utils/catchAsync')

exports.createChat = catchAsync(async (req, res, next) => {
    const doc = await Chat.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            doc
        }
    })
})

exports.getAllChat = catchAsync(async (req, res, next) => {
    const doc = await Chat.find()

    res.status(200).json({
        status: 'success',
        data: {
            doc
        }
    })
})

exports.getChatById = catchAsync(async (req, res, next) => {
    const doc = await Chat.findById(req.params.id).populate({
        path: 'members'
    })

    res.status(200).json({
        status: 'success',
        data: {
            doc
        }
    })
})