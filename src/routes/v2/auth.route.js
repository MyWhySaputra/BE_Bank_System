const express = require('express')
const router = express.Router()
const { login, register, verifyEmail, forgetPassword, resetPassword } = require('../../controller/auth.controller')
const { midd_register, midd_login, midd_forget } = require('../../middleware/middleware')

const multer = require("multer")();

/**
 * @swagger
 * /api/v2/auth/register:
 *   post:
 *     tags:
 *      - "Auth"
 *     summary: example to register user/admin
 *     requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                role:
 *                  type: string
 *                profile_picture:
 *                  type: string
 *                  format: binary
 *                identity_type:
 *                  type: string
 *                identity_number:
 *                  type: string
 *                address:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/auth/register", multer.single("profile_picture"), midd_register, register);

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
 *          application/json:
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
 *       500:
 *         description: Internal server error
 */
router.post('/auth/login', midd_login, login)

router.get('/auth/verify-email', verifyEmail)

/**
 * @swagger
 * /api/v2/auth/forget-password:
 *   post:
 *     tags:
 *      - "Auth"
 *     summary: example to forget password
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/auth/forget-password', midd_forget, forgetPassword)

router.get("/auth/reset-password", (req, res) => {
    const token = req.query.token
    res.render("reset-password.ejs", { token })
})

router.post('/auth/reset-password', resetPassword)

module.exports = router