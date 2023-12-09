const express = require('express')
const router = express.Router()
const { Register, Get, Update, Delete } = require('../../controller/user.controller')
const { Auth } = require('../../middleware/middleware')

const multer = require("multer")()

/**
 * @swagger
 * /api/v2/users:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User"
 *     summary: example to register user
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
 *                image:
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
 *       500:
 *         description: Internal server error
 */
router.post('/users/', multer.single("image"), Register)

/**
 * @swagger
 * /api/v2/users:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User"
 *     summary: Check your id
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.get('/users/', Auth, Get)

/**
 * @swagger
 * /api/v2/users:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User"
 *     summary: Update user
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                images:
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
 *       400:
 *         description: Bad request
 */
router.put('/users/', Auth, multer.single("image"), Update)

/**
 * @swagger
 * /api/v2/users/{email}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User"
 *     summary: Get one user
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: The email of user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.delete('/users/:email', Auth, Delete)

module.exports = router