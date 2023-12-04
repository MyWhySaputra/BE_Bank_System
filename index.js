require('dotenv').config()

const express = require('express')
const app = express()

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})