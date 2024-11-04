const express = require("express");
const router = express.Router();
const {
  Get,
  Update,
  Delete,
  GetUser,
  UpdateUser,
  DeleteUser,
} = require("../../controllers/v1/userController");
const {
  Auth,
  Admin,
  midd_id,
} = require("../../middlewares/v1/authMiddleware");

const {
  midd_Update,
  midd_adminGet,
} = require("../../middlewares/v1/userMiddleware");

const multer = require("multer")();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User V1"
 *     summary: Check your id
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.get("/users/", Auth, Get);

/**
 * @swagger
 * /api/v1/users:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User V1"
 *     summary: Update your id
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
router.put(
  "/users/",
  Auth,
  multer.single("profile_picture"),
  midd_Update,
  Update
);

/**
 * @swagger
 * /api/v1/users:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User V1"
 *     summary: Delete your id (soft delete)
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.delete("/users/", Auth, Delete);

/**
 * @swagger
 * /api/v1/users/admin:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User V1"
 *     summary: Get all user (ADMIN ONLY)
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: The name of user
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         required: false
 *         description: The email of user
 *         schema:
 *           type: string
 *       - in: query
 *         name: identity_type
 *         required: false
 *         description: The identity_type of user
 *         schema:
 *           type: string
 *       - in: query
 *         name: identity_number
 *         required: false
 *         description: The identity_number of user
 *         schema:
 *           type: string
 *       - in: query
 *         name: address
 *         required: false
 *         description: The address of user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.get("/users/admin/", Auth, Admin, midd_adminGet, GetUser);

/**
 * @swagger
 * /api/v1/users/admin/{id}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User V1"
 *     summary: Update user (ADMIN ONLY)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of user
 *         schema:
 *           type: integer
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
router.put(
  "/users/admin/:id",
  Auth,
  Admin,
  multer.single("profile_picture"),
  midd_id,
  midd_Update,
  UpdateUser
);

/**
 * @swagger
 * /api/v1/users/admin/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User V1"
 *     summary: Delete user (ADMIN ONLY with soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.delete("/users/admin/:id", Auth, Admin, midd_id, DeleteUser);

module.exports = router;
