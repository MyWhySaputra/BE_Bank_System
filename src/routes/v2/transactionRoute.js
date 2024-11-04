const express = require("express");
const router = express.Router();
const {
  Insert,
  Get,
  AdminGet,
  AdminUpdate,
  AdminDelete,
} = require("../../controllers/v2/transactionController");
const { Auth, Admin, midd_id } = require("../../middlewares/v2/authMiddleware");

const {
  midd_trasactionInsert,
  midd_trasactionGet,
  midd_trasactionAdminGet,
  midd_trasactionAdminUpdate,
} = require("../../middlewares/v2/transactionMiddleware");

/**
 * @swagger
 * /api/v2/transactions:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Transaction"
 *     summary: Create transaction
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                source_bank_number:
 *                  type: string
 *                destination_bank_number:
 *                  type: string
 *                amount:
 *                  type: integer
 *     responses:
 *       200:
 *         description: Successful response
 */
router.post("/transactions/", Auth, midd_trasactionInsert, Insert);

/**
 * @swagger
 * /api/v2/transactions:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Transaction"
 *     summary: Get all your transactions
 *     parameters:
 *       - in: query
 *         name: source_bank_number
 *         required: false
 *         description: The ID of source_account
 *         schema:
 *           type: string
 *       - in: query
 *         name: destination_bank_number
 *         required: false
 *         description: The ID of destination_account
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/transactions/", Auth, midd_trasactionGet, Get);

/**
 * @swagger
 * /api/v2/transactions/admin:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Transaction"
 *     summary: Get all transactions (ADMIN ONLY)
 *     parameters:
 *       - in: query
 *         name: source_bank_number
 *         required: false
 *         description: The ID of source_account
 *         schema:
 *           type: string
 *       - in: query
 *         name: destination_bank_number
 *         required: false
 *         description: The ID of destination_account
 *         schema:
 *           type: string
 *       - in: query
 *         name: amount
 *         required: false
 *         description: The amount of bank account
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get(
  "/transactions/admin/",
  Auth,
  Admin,
  midd_trasactionAdminGet,
  AdminGet
);

/**
 * @swagger
 * /api/v2/transactions/admin/{id}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Transaction"
 *     summary: update transactions (ADMIN ONLY)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of transaction
 *         schema:
 *           type: integer
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                source_bank_number:
 *                  type: string
 *                destination_bank_number:
 *                  type: string
 *                amount:
 *                  type: integer
 *     responses:
 *       200:
 *         description: Successful response
 */
router.put(
  "/transactions/admin/:id",
  Auth,
  Admin,
  midd_id,
  midd_trasactionAdminUpdate,
  AdminUpdate
);

/**
 * @swagger
 * /api/v2/transactions/admin/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Transaction"
 *     summary: Delete transactions (ADMIN ONLY with soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of transaction
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 */
router.delete("/transactions/admin/:id", Auth, Admin, midd_id, AdminDelete);

module.exports = router;
