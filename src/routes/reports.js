const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');
const authorizeRoles = require('../middleware/roles');
const { salesReport } = require('../controllers/reports');

router.get('/sales', authenticateJWT, authorizeRoles('ADMIN'), salesReport);

module.exports = router;