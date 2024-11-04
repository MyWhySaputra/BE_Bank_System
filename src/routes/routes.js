const express = require('express')
const authRouteV1 = require('./v1/authRoute')
const userRouteV1 = require('./v1/userRoute')
const bankAccountRouteV1 = require("./v1/bankAccountRoute");
const transactionRouteV1 = require("./v1/transactionRoute");
const authRouteV2 = require('./v2/authRoute')
const userRouteV2 = require('./v2/userRoute')
const bankAccountRouteV2 = require('./v2/bankAccountRoute')
const transactionRouteV2 = require('./v2/transactionRoute')
const morgan = require('morgan')

// version 1 
const v1 = express.Router()
v1.use(morgan('dev'));
v1.use('/', [authRouteV1, userRouteV1, bankAccountRouteV1, transactionRouteV1])

// version 2
const v2 = express.Router()
v2.use(morgan('dev'))
v2.use('/', [authRouteV2, userRouteV2, bankAccountRouteV2, transactionRouteV2])

const router = express.Router()
router.use('/api/v1', v1)
router.use('/api/v2', v2)

// default version
router.use('/api', v2)

module.exports = router