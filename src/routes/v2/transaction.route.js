const express = require("express");
const router = express.Router();
const {
    Insert,
    Get,
    AdminGet,
    AdminUpdate,
} = require("../../controller/transaction.controller");
const {
    Auth,
    Admin,
    CheckTransactionInsert,
    CheckTransactionGet,
} = require("../../middleware/middleware");

/**
 * @swagger
 * /api/v2/transactions:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Transaction"
 *     summary: example to create transaction
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                source_account_id:
 *                  type: string
 *                destination_account_id:
 *                  type: string
 *                amount:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
router.post("/transactions/", Auth, CheckTransactionInsert, Insert);

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
router.get("/transactions/", Auth, CheckTransactionGet, Get);

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
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/transactions/admin/", Auth, Admin, CheckTransactionGet, AdminGet);

/**
 * @swagger
 * /api/v2/transactions/admin:
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
 *           type: string
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
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
router.put("/transactions/admin/:id", Auth, Admin, AdminUpdate);

module.exports = router;
