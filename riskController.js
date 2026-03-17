const express = require('express');
const router = express.Router();
const breachController = require('../controllers/breachController');

// In-memory alert store (would be database in production)
let alerts = generateInitialAlerts();

function generateInitialAlerts() {
  const types = ['Data Breach', 'Phishing', 'Ransomware', 'SQL Injection', 'DDoS Attack', 'Credential Stuffing'];
  const severities = ['critical', 'high', 'medium', 'low'];
  const sources = ['IntelX', 'Dark Web Monitor', 'Leak Detection', 'Network Sensor', 'Email Gateway'];
  
  return Array.from({ length: 20 }, (_, i) => ({
    id: `ALT-${Date.now()}-${i}`,
    type: types[Math.floor(Math.random() * types.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    title: getAlertTitle(types[Math.floor(Math.random() * types.length)]),
    description: 'Potential security incident detected requiring immediate investigation.',
    affectedData: ['Email addresses', 'Hashed passwords', 'IP addresses'],
    timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    riskScore: Math.floor(Math.random() * 100),
    location: ['US', 'EU', 'APAC', 'LATAM'][Math.floor(Math.random() * 4)],
    status: 'active'
  }));
}

function getAlertTitle(type) {
  const titles = {
    'Data Breach': ['Healthcare Provider Data Exposed', 'Financial Records Leaked', 'Customer Database Compromised'],
    'Phishing': ['Credential Harvesting Campaign', 'BEC Attack Detected', 'Spoofed Login Pages Active'],
    'Ransomware': ['LockBit Variant Detected', 'Ransomware Gang Activity', 'Encryption Behavior Observed'],
    'SQL Injection': ['Blind SQLi Attempt', 'Union-based Injection Blocked', 'Time-based Injection Attempt'],
    'DDoS Attack': ['Volumetric Attack Origin', 'Application Layer Flood', 'DNS Amplification Detected'],
    'Credential Stuffing': ['Account Takeover Wave', 'Password Spray Attack', 'Credential Validation Storm'],
  };
  return (titles[type] || ['Security Event Detected'])[Math.floor(Math.random() * 3)];
}

// Get all alerts with pagination and filtering
router.get('/', (req, res) => {
  const { severity, type, source, page = 1, pageSize = 10, sort = 'timestamp' } = req.query;
  
  let filtered = [...alerts];
  
  if (severity) filtered = filtered.filter(a => a.severity === severity);
  if (type) filtered = filtered.filter(a => a.type === type);
  if (source) filtered = filtered.filter(a => a.source === source);
  
  // Sort
  filtered.sort((a, b) => {
    if (sort === 'riskScore') return b.riskScore - a.riskScore;
    return new Date(b.timestamp) - new Date(a.timestamp);
  });
  
  const startIndex = (parseInt(page) - 1) * parseInt(pageSize);
  const paginatedAlerts = filtered.slice(startIndex, startIndex + parseInt(pageSize));
  
  res.json({
    success: true,
    data: paginatedAlerts,
    meta: {
      total: filtered.length,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      totalPages: Math.ceil(filtered.length / parseInt(pageSize))
    }
  });
});

// Get single alert
router.get('/:id', (req, res) => {
  const alert = alerts.find(a => a.id === req.params.id);
  
  if (!alert) {
    return res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Alert not found' }
    });
  }
  
  res.json({ success: true, data: alert });
});

// Dismiss alert
router.post('/:id/dismiss', (req, res) => {
  const index = alerts.findIndex(a => a.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Alert not found' }
    });
  }
  
  alerts[index].status = 'dismissed';
  alerts[index].dismissedAt = new Date().toISOString();
  
  res.json({
    success: true,
    data: alerts[index],
    message: 'Alert dismissed successfully'
  });
});

// Create new alert (for testing/webhook)
router.post('/', (req, res) => {
  const newAlert = {
    id: `ALT-${Date.now()}`,
    ...req.body,
    timestamp: new Date().toISOString(),
    status: 'active'
  };
  
  alerts.unshift(newAlert);
  
  res.status(201).json({
    success: true,
    data: newAlert,
    message: 'Alert created successfully'
  });
});

module.exports = router;
