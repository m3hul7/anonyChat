const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({
    path: './config.env'
})

mongoose.connect(process.env.DATABASE_LOCAL).then(con => console.log('database connected!'))

const server = require('./app')

server.listen(21321, '172.16.3.107', () => console.log('server starts'))