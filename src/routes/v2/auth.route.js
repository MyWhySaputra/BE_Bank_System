const express = require('express')
const router = express.Router()
const { login, verifyEmail, forgetPassword, resetPassword } = require('../../controller/auth.controller')

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
router.post('/auth/login', login)

router.get('/auth/verify-email', verifyEmail)

router.post('/auth/forget-password', forgetPassword)

router.get("/auth/reset-password", (res) => {
    res.render("reset-password.ejs")
})

router.put('/auth/reset-password', resetPassword)

module.exports = router