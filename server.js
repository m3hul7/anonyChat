const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({
    path: './config.env'

})

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB).then(con => console.log('database connected!'))

const server = require('./app')

server.listen(21321, '172.16.3.107', () => console.log('server starts'))