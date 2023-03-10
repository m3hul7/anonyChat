const Message = require('../models/messageModel')

module.exports = (io) => {

    let users= {}
    let count = 0
    let mapper = []
    let flag = false

    const onTyping = function (data) {
        this.broadcast.emit(`typing`, data)
    }

    const onChat = async function (data) {

        await Message.create(data)

        const mapperfix = mapper
        const receiverSocketId = mapperfix.filter(ele => ele.userId == data.receiver)

        if(receiverSocketId.length != 0) {
            console.log('inside IF')
            this.to(receiverSocketId[0]['socketId']).emit('chat',  data )
        } else {
            console.log('inside ELSE')
        }
    }

    const onDisconnect = function () {
        if(Object.keys(users).length){
            Object.keys(users).forEach((ele) => {
                if(users[`${ele}`]== this.id) {
                    delete users[`${ele}`]
                }
            })
        }
    }

    const onSetMapper = function (response) {
        if(response) {
            mapper.forEach(ele => {
                if(ele.userId == response.userId) {
                    ele.socketId = response.socketId
                    flag = true
                }
            })
            if(!flag) {
                mapper.push(response)
            }
    
            console.log(mapper, "mapper on welcome")
            console.log(response, "response no mapper")
        }
    }
 
    return {
        onTyping,
        onChat,
        onDisconnect,
        onSetMapper,
    }
}