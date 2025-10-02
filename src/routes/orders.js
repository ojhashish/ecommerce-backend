const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');
const authorizeRoles = require('../middleware/roles');
const { checkout, orderHistory, orderDetails, updateOrderStatus } = require('../controllers/order');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order processing and management endpoints
 */

/**
 * @swagger
 * /orders/checkout:
 *   post:
 *     summary: Checkout cart items and create order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order placed successfully
 *                 transactionId:
 *                   type: string
 *                   example: MOCK123456
 *       400:
 *         description: Cart is empty or insufficient stock
 *       402:
 *         description: Payment failed
 */
router.post('/checkout', authenticateJWT, checkout);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get order history for logged-in user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order history
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get('/', authenticateJWT, orderHistory);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get details of a specific order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       403:
 *         description: Access denied
 */
router.get('/:id', authenticateJWT, orderDetails);

/**
 * @swagger
 * /orders/{id}/status:
 *   put:
 *     summary: Update order status (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PLACED, SHIPPED, DELIVERED, CANCELLED]
 *                 example: SHIPPED
 *     responses:
 *       200:
 *         description: Order status updated
 *       404:
 *         description: Order not found
 *       403:
 *         description: Admin access required
 */
router.put('/:id/status', authenticateJWT, authorizeRoles('ADMIN'), updateOrderStatus);

module.exports = router;