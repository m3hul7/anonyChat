const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')

exports.getAllUser = catchAsync( async (req, res, next) => {
    let doc
    if(req.query) {
        doc = await User.find(req.query)
    } else {
        doc = await User.find()
    }

    res.status(200).json({
        status: 'success',
        data: {
            doc
        }
    })
})

exports.getOneUser = catchAsync( async (req, res, next) => {
    const doc = await User.findById(req.params.id).populate({
        path: 'chats'
    })

    res.status(200).json({
        status: 'success',
        data: {
            doc
        }
    })
})

