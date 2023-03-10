const morgan = require('morgan')
const cors = require('cors')
const express = require('express')
const app = express()
const server = require('http').Server(app)

const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')
const chatRoutes = require('./routes/chatRoutes')

app.use(cors({ origin: true, credentials: true }))

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/messages', messageRoutes)
app.use('/api/v1/chats', chatRoutes)


const io = require('socket.io')(server, {
    cors: { origin: '*' }
})
const socketControllers = require('./listeners/socketManager')(io)

const onConnection = (socket) => {

    socket.emit('welcome', { msg: 'Welcome to our chat Service!', id: socket.id })

    socket.on('setMapper', socketControllers.onSetMapper)

    socket.on('disconnect', socketControllers.onDisconnect)

    socket.on('typing', socketControllers.onTyping)

    socket.on('chat', socketControllers.onChat)

    // if(Object.keys(users).length) {
        // setInterval(() => {
        //     // console.log(socket.client.conn.server.clientsCount,[...io.sockets.sockets.keys()])
        //     socket.emit('alive', { users })
        // }, 1000)
    // }
}

io.use((socket, next) => {
    next()
})

io.on('connection', onConnection)

module.exports = server