const express = require('express')
const router = express.Router()
const { Login } = require('../../controller/auth.controller')

/**
 * @swagger
 * /api/v2/auth/login:
 *   post:
 *     tags:
 *      - "Auth"
 *     summary: example to login with email and password
 *     requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */
router.post('/auth/login', Login)

module.exports = router