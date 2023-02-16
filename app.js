const express = require('express')
const http = require('http')
const cors = require('cors')

const app = express()

const server = http.createServer(app)

const io = require('socket.io')(server, {
    cors: { origin: '*' }
})

let users= {}
let count = 0

io.use((socket, next) => {
    // socket.on('setUserName', (userName) => {
    //     if(![...Object.keys(users)].includes(userName)) {
    //         users[`${userName}`] = socket.id
    //         next()
    //     }
    //     else {
    //         next(new Error('User Name already exists!'))
    //     }
    // })
    next()
})

io.on('connection', (socket) => {

    console.log('user number', ++count, 'connected')

    socket.emit('welcome', { msg: 'Welcome to our chat Service!', id: socket.id }, (response) => {
        console.log(response)
    })

    socket.on('disconnect', function () {
        if(Object.keys(users).length){
            Object.keys(users).forEach((ele) => {
                if(users[`${ele}`]== socket.id) {
                    delete users[`${ele}`]
                }
            })
        }
        console.log(`user number ${count} disconnected`)
        count--
    })

    socket.on("typing", function (data) {
        socket.broadcast.emit(`typing`, data);
    })

    socket.on('setUserName', (userName) => {
        if(![...Object.keys(users)].includes(userName)) {
            users[`${userName}`] = socket.id
        }
        else {
            // next(new Error('User Name already exists!'))
        }
    })

    // if(Object.keys(users).length) {
        setInterval(() => {
            // console.log(socket.client.conn.server.clientsCount,[...io.sockets.sockets.keys()])
            socket.emit('alive', { users })
        }, 10000)
    // }

    // room

    socket.on('create', function (room) {
        socket.join(room)
        // console.log(socket.rooms.keys())
        io.sockets.in(room).emit('connected_to_room', `You're in ${room} room`)
    })

    socket.on('room_chat', function (data) {
        socket.to(data.room).emit('room_chat', data)
    })

    socket.on('chat', function (data) {
        // console.log(data, users[`${data.name}`])
        socket.to(users[`${data.receiver}`]).emit('chat', { data })
    })

    socket.on('open_chat', function (data) {
        socket.broadcast.emit('open_chat', { message: data })
    })

})

module.exports = server