require('dotenv').config()

const express = require('express')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const router = require('./src/routes/routes')

const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const swaggerDefinition = require('./src/helper/swagger.helper')

const port = process.env.PORT || 3000

const swaggerSpec = swaggerJsdoc(swaggerDefinition)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', router)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

http.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

io.on('connect', (socket)=>{
    console.log('user conected')
    socket.on('chat',(data)=>{
        io.sockets.emit('chat',data)
    })
})