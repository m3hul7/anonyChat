const dotenv = require('dotenv')

dotenv.config({
    path: './config.env'
})

const server = require('./app')

server.listen(21321, () => console.log('server starts'))