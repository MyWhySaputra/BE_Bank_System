const express = require('express')
const router = express.Router()
const { Register, Get, Update, Delete } = require('../../controller/admin.controller')
const { Auth } = require('../../middleware/middleware')

const multer = require("multer")()

/**
 * @swagger
 * /api/v2/admins:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Admin"
 *     summary: example to register admin
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
 *       500:
 *         description: Internal server error
 */
router.post('/admins/', multer.single("profile_picture"), Register)

/**
 * @swagger
 * /api/v2/admins:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Admin"
 *     summary: Check all id user
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.get('/admins/', Auth, Get)

/**
 * @swagger
 * /api/v2/admins:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Admin"
 *     summary: Update admin
 *     requestBody:
 *        required: false
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
 *       400:
 *         description: Bad request
 */
router.put('/admins/', Auth, multer.single("profile_picture"), Update)

/**
 * @swagger
 * /api/v2/admins/{email}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Admin"
 *     summary: Delete admin
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
router.delete('/admins/:email', Auth, Delete)

module.exports = router