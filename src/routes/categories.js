const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');
const authorizeRoles = require('../middleware/roles');
const { listCategories, getCategory, addCategory, updateCategory, deleteCategory } = require('../controllers/category');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management endpoints
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: List all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/', listCategories);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Add a new category (Admin only)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *     responses:
 *       201:
 *         description: Category created
 *       403:
 *         description: Admin access required
 */
router.post('/', authenticateJWT, authorizeRoles('ADMIN'), addCategory);

router.get('/:id', getCategory);
router.put('/:id', authenticateJWT, authorizeRoles('ADMIN'), updateCategory);
router.delete('/:id', authenticateJWT, authorizeRoles('ADMIN'), deleteCategory);

module.exports = router;