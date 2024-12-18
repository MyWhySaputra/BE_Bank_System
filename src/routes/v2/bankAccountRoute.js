const express = require("express");
const router = express.Router();
const {
  AdminInsert,
  Insert,
  AdminGet,
  Get,
  AdminUpdate,
  Update,
  AdminDelete,
  Delete,
} = require("../../controllers/v2/bankAccountController");
const { Auth, Admin, midd_id } = require("../../middlewares/v2/authMiddleware");

const {
  midd_bank_accountInsert,
  midd_bank_accountGet,
  midd_bank_accountUpdate,
  midd_bank_accountAdminInsert,
  midd_bank_accountAdminGet,
  midd_bank_accountAdminUpdate,
} = require("../../middlewares/v2/bankAccountMiddleware");

/**
 * @swagger
 * /api/v2/bank_accounts:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Bank Account"
 *     summary: Create your bank account
 *     description: |
 *       **API Registration Public (No token required to access)**
 *
 *       Used for user registration so they can log in to the application.
 *
 *       *Requirements:*
 *       1. The email parameter must be validated for email format.
 *       2. The password parameter must have a minimum length of 8 characters.
 *       3. Handle responses according to the response documentation below.
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                bank_name:
 *                  type: string
 *                bank_account_number:
 *                  type: string
 *                balance:
 *                  type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Registrasi berhasil silahkan login"
 *                 data:
 *                   type: object
 *                   example: null
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: "Bad request, please check your input"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "Email is not valid"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: "Resource not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post("/bank_accounts/", Auth, midd_bank_accountInsert, Insert);

/**
 * @swagger
 * /api/v2/bank_accounts:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Bank Account"
 *     summary: Get all your bank accounts
 *     parameters:
 *       - in: query
 *         name: bank_name
 *         required: false
 *         description: The name of bank account
 *         schema:
 *           type: string
 *       - in: query
 *         name: bank_account_number
 *         required: false
 *         description: The bank_account_number of bank account
 *         schema:
 *           type: string
 *       - in: query
 *         name: balance
 *         required: false
 *         description: The balance of bank account
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.get("/bank_accounts/", Auth, midd_bank_accountGet, Get);

/**
 * @swagger
 * /api/v2/bank_accounts/{id}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Bank Account"
 *     summary: Update your bank account
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                bank_name:
 *                  type: string
 *                bank_account_number:
 *                  type: string
 *                balance:
 *                  type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */
router.put(
  "/bank_accounts/:id",
  Auth,
  midd_id,
  midd_bank_accountUpdate,
  Update
);

/**
 * @swagger
 * /api/v2/bank_accounts/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Bank Account"
 *     summary: Delete your bank account (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the bank account
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.delete("/bank_accounts/:id", Auth, midd_id, Delete);

/**
 * @swagger
 * /api/v2/bank_accounts/admin:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Bank Account"
 *     summary: Create bank account (ADMIN ONLY)
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_id:
 *                  type: integer
 *                bank_name:
 *                  type: string
 *                bank_account_number:
 *                  type: string
 *                balance:
 *                  type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
router.post(
  "/bank_accounts/admin/",
  Auth,
  Admin,
  midd_bank_accountAdminInsert,
  AdminInsert
);

/**
 * @swagger
 * /api/v2/bank_accounts/admin:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Bank Account"
 *     summary: Get all bank accounts (ADMIN ONLY)
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: false
 *         description: The ID of user
 *         schema:
 *           type: integer
 *       - in: query
 *         name: bank_name
 *         required: false
 *         description: The name of bank account
 *         schema:
 *           type: string
 *       - in: query
 *         name: bank_account_number
 *         required: false
 *         description: The bank_account_number of bank account
 *         schema:
 *           type: string
 *       - in: query
 *         name: balance
 *         required: false
 *         description: The balance of bank account
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.get(
  "/bank_accounts/admin/",
  Auth,
  Admin,
  midd_bank_accountAdminGet,
  AdminGet
);

/**
 * @swagger
 * /api/v2/bank_accounts/admin/{id}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Bank Account"
 *     summary: Update bank account (ADMIN ONLY)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of bank account
 *         schema:
 *           type: integer
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_id:
 *                  type: integer
 *                bank_name:
 *                  type: string
 *                bank_account_number:
 *                  type: string
 *                balance:
 *                  type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */
router.put(
  "/bank_accounts/admin/:id",
  Auth,
  Admin,
  midd_id,
  midd_bank_accountAdminUpdate,
  AdminUpdate
);

/**
 * @swagger
 * /api/v2/bank_accounts/admin/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Bank Account"
 *     summary: Delete bank account (ADMIN ONLY with soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the bank account
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.delete("/bank_accounts/admin/:id", Auth, Admin, midd_id, AdminDelete);

module.exports = router;
