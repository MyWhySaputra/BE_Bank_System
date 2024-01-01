const express = require('express')
const router = express.Router()
const { Register, Get, GetUser, Update, UpdateUser, Delete, DeleteUser } = require('../../controller/admin.controller')
const { Auth, Admin } = require('../../middleware/middleware')

const multer = require("multer")()

/**
 * @swagger
 * /api/v2/admin:
 *   post:
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
router.post('/admin/', multer.single("profile_picture"), Register)

/**
 * @swagger
 * /api/v2/admin:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Admin"
 *     summary: Check your id (ADMIN ONLY)
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.get('/admin/', Auth, Admin, Get)

/**
 * @swagger
 * /api/v2/admin:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Admin"
 *     summary: Update admin (ADMIN ONLY)
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
router.put('/admin/', Auth, Admin, multer.single("profile_picture"), Update)

/**
 * @swagger
 * /api/v2/admin:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Admin"
 *     summary: Delete admin (ADMIN ONLY)
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
 *       404:
 *         description: Not found
 */
router.delete('/admin/', Auth, Admin, Delete)

/**
 * @swagger
 * /api/v2/admin/get-user:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Admin"
 *     summary: Get all user (ADMIN ONLY)
 *     requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
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
router.get('/admin/get-user/', Auth, Admin, GetUser)

/**
 * @swagger
 * /api/v2/admin/update-user/{id}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Admin"
 *     summary: Update user (ADMIN ONLY)
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
router.put('/admin/update-user/:id', Auth, Admin, multer.single("profile_picture"), UpdateUser)

/**
 * @swagger
 * /api/v2/admin/delete-user/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Admin"
 *     summary: Delete user (ADMIN ONLY)
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
router.delete('/admin/delete-user/:id', Auth, Admin, DeleteUser)

module.exports = router