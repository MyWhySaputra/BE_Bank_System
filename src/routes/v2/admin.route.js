const express = require('express')
const router = express.Router()
const { Register, Get, GetUser, Update, UpdateUser, Delete, DeleteUser } = require('../../controller/admin.controller')
const { Auth } = require('../../middleware/middleware')

const multer = require("multer")()

/**
 * @swagger
 * /api/v2/admin:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Admin"
 *     summary: example to register admin (SUPER ADMIN ONLY)
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
router.post('/admin/', multer.single("profile_picture"), Register)

/**
 * @swagger
 * /api/v2/admin:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Admin"
 *     summary: Check your id
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.get('/admin/', Auth, Get)

/**
 * @swagger
 * /api/v2/admin/get-user:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Admin"
 *     summary: Get user
 *     requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                name:
 *                  type: string
 *                email:
 *                  type: string
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
 */
router.get('/admin/get-user/', Auth, GetUser)

/**
 * @swagger
 * /api/v2/admin:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Admin"
 *     summary: Update admin
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
 *       400:
 *         description: Bad request
 */
router.put('/admin/', Auth, multer.single("profile_picture"), Update)

/**
 * @swagger
 * /api/v2/admin/update-user:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Admin"
 *     summary: Update admin
 *     requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
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
router.put('/admin/update-user/', Auth, multer.single("profile_picture"), UpdateUser)

/**
 * @swagger
 * /api/v2/admin/{email}:
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
router.delete('/admin/:email', Auth, Delete)

/**
 * @swagger
 * /api/v2/admin/delete-user/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Admin"
 *     summary: Delete user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.delete('/admin/delete-user/:id', Auth, DeleteUser)

module.exports = router