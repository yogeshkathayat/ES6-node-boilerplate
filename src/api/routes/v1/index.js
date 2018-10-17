const express = require('express');
const router = express.Router();

/**
 * Routes to include in v1 routes
 */
const articleRoutes=require('./article.route');

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

router.use('/article',articleRoutes);

module.exports = router;