const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    is_read: {
        type: Boolean
    },
    chat: {
        type: mongoose.Schema.ObjectId,
        ref: 'Chat'
    },
    sender: {
        type: mongoose.Schema.ObjectId,
        ref:'User',
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        ref:'User',
    },
    time: {
        type: Date
    },
    type: {
        type: String
    },
    content: {
        type: Object
    }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message