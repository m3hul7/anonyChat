const mongoose = require('mongoose')

const User = require('../models/userModel')

const chatSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.ObjectId
    },
    chat_type: {
        type: String,
        enum: ['dm', 'channel', 'thread', 'bot']
    },
    title: {
        type: String
    },
    members: {
        type: [{
            type: mongoose.Schema.ObjectId,
            ref:'User'
        }]
    }
})

chatSchema.pre(/^find/, function (next) {
    this.populate({
      path: 'members',
      select: 'first_name last_name'
    })
    next()
  })

chatSchema.post('save',async function () {
    
    const all = await Promise.all(this.members.map(async ele => await User.find({_id: ele})))
    
    all.forEach(ele => {ele[0]['chats'].push(this._id); })

    await Promise.all(all.map(async ele => await User.findByIdAndUpdate({_id: ele[0]['_id']}, {chats: ele[0]['chats']})))
    
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat