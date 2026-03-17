const express = require('express');
const router = express.Router();
const { getIntelXClient } = require('../utils/intelxClient');
const breachController = require('../controllers/breachController');

// Get breach data from IntelX
router.get('/search', async (req, res, next) => {
  try {
    const { query, page = 1, pageSize = 20 } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_QUERY', message: 'Search query is required' }
      });
    }

    const intelx = getIntelXClient();
    const results = await intelx.search(query, { page: parseInt(page), pageSize: parseInt(pageSize) });

    res.json({
      success: true,
      data: results,
      meta: {
        query,
        page: parseInt(page),
        pageSize: parseInt(pageSize),
        latency: `${Date.now() - req.startTime}ms`
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get recent breaches
router.get('/breaches', breachController.getRecentBreaches);

// Get breach details by ID
router.get('/breaches/:id', breachController.getBreachById);

// Get breach statistics
router.get('/stats', breachController.getBreachStats);

// Get leak detection results
router.get('/leaks', async (req, res) => {
  // Simulated leak detection data
  const leaks = [
    {
      id: 'LK-001',
      source: 'Underground Forum',
      type: 'Database Leak',
      records: 125000,
      dataTypes: ['emails', 'passwords', 'IPs'],
      date: new Date(Date.now() - 86400000).toISOString(),
      severity: 'high'
    },
    {
      id: 'LK-002',
      source: 'Dark Web Market',
      type: 'API Keys',
      records: 5400,
      dataTypes: ['api_keys', 'tokens'],
      date: new Date(Date.now() - 172800000).toISOString(),
      severity: 'critical'
    }
  ];

  res.json({
    success: true,
    data: leaks,
    meta: { count: leaks.length, source: 'IntelX Monitor' }
  });
});

module.exports = router;
