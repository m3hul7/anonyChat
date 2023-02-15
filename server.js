const dotenv = require('dotenv')

dotenv.config({
    path: './config.env'
})

const server = require('./app')

server.listen(2121, () => console.log('server starts'))