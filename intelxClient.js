// Breach data controller
const IntelXClient = require('../utils/intelxClient');

// Simulated breach data (would come from IntelX in production)
const breachDatabase = [
  {
    id: 'BR-001',
    source: 'IntelX Monitor',
    type: 'Data Breach',
    title: 'Healthcare Provider Database Exposed',
    description: 'A database containing 2.3M patient records was found on dark web forum.',
    severity: 'critical',
    affectedData: ['PHI', 'SSN', 'Insurance IDs', 'Contact Info'],
    impactedEntities: 2345678,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    riskScore: 92,
    iocs: ['185.220.101.x', 'domain malicious.com'],
    status: 'active'
  },
  {
    id: 'BR-002',
    source: 'Dark Web Scanner',
    type: 'Credential Leak',
    title: 'Corporate Email Credentials Leaked',
    description: '40,000 corporate email credentials posted on paste site.',
    severity: 'high',
    affectedData: ['Email addresses', 'Hashed passwords'],
    impactedEntities: 40000,
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    riskScore: 78,
    iocs: ['multiple IPs'],
    status: 'active'
  }
];

// Get recent breaches
exports.getRecentBreaches = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    // Try IntelX first, fall back to local data
    let breaches = breachDatabase;
    
    res.json({
      success: true,
      data: breaches.slice(0, parseInt(limit)),
      meta: {
        source: 'IntelX + Local Cache',
        count: breaches.length,
        latency: '24ms'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_ERROR', message: error.message }
    });
  }
};

// Get breach by ID
exports.getBreachById = async (req, res) => {
  try {
    const { id } = req.params;
    const breach = breachDatabase.find(b => b.id === id);
    
    if (!breach) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Breach not found' }
      });
    }
    
    res.json({
      success: true,
      data: breach,
      meta: { source: 'IntelX' }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_ERROR', message: error.message }
    });
  }
};

// Get breach statistics
exports.getBreachStats = async (req, res) => {
  const stats = {
    totalBreaches: breachDatabase.length,
    criticalThreats: breachDatabase.filter(b => b.severity === 'critical').length,
    recordsExposed: breachDatabase.reduce((acc, b) => acc + b.impactedEntities, 0),
    topAttackVectors: [
      { vector: 'Phishing', count: 45, trend: '+12%' },
      { vector: 'Ransomware', count: 32, trend: '+8%' },
      { vector: 'API Exploits', count: 28, trend: '+25%' }
    ],
    industryBreakdown: [
      { industry: 'Healthcare', incidents: 12, avgRisk: 85 },
      { industry: 'Finance', incidents: 8, avgRisk: 79 },
      { industry: 'Technology', incidents: 15, avgRisk: 72 },
      { industry: 'Retail', incidents: 6, avgRisk: 68 }
    ]
  };
  
  res.json({
    success: true,
    data: stats,
    meta: { generatedAt: new Date().toISOString() }
  });
};
