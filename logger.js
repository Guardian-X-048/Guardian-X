// Visualization data controller

exports.getThreatGraph = async (req, res) => {
  const nodes = [
    { id: 'intelx', type: 'source', label: 'IntelX Feed', x: 0.1, y: 0.5, threatLevel: 'active' },
    { id: 'darkweb', type: 'source', label: 'Dark Web', x: 0.15, y: 0.3, threatLevel: 'active' },
    { id: 'phishing', type: 'attack', label: 'Phishing Wave', x: 0.35, y: 0.4, threatLevel: 'high' },
    { id: 'breach', type: 'data', label: 'Leaked DB', x: 0.3, y: 0.7, threatLevel: 'critical' },
    { id: 'credentials', type: 'attack', label: 'Credential Stuffing', x: 0.5, y: 0.5, threatLevel: 'medium' },
    { id: 'email', type: 'target', label: 'Email Gateway', x: 0.55, y: 0.25, threatLevel: 'medium' },
    { id: 'network', type: 'target', label: 'Corporate Net', x: 0.65, y: 0.55, threatLevel: 'high' },
    { id: 'endpoints', type: 'target', label: 'Endpoints', x: 0.8, y: 0.4, threatLevel: 'low' },
    { id: 'files', type: 'data', label: 'File Server', x: 0.85, y: 0.65, threatLevel: 'medium' },
    { id: 'auth', type: 'data', label: 'Auth Server', x: 0.9, y: 0.3, threatLevel: 'low' }
  ];
  
  const connections = [
    { source: 'intelx', target: 'phishing', type: 'data_flow', active: true },
    { source: 'intelx', target: 'breach', type: 'data_flow', active: true },
    { source: 'darkweb', target: 'credentials', type: 'data_flow', active: true },
    { source: 'phishing', target: 'email', type: 'attack', active: true },
    { source: 'phishing', target: 'network', type: 'attack', active: true },
    { source: 'breach', target: 'credentials', type: 'data_flow', active: true },
    { source: 'credentials', target: 'network', type: 'attack', active: true },
    { source: 'email', target: 'endpoints', type: 'attack', active: true },
    { source: 'network', target: 'endpoints', type: 'access', active: false },
    { source: 'network', target: 'files', type: 'access', active: false },
    { source: 'endpoints', target: 'auth', type: 'access', active: false }
  ];
  
  const geoDistribution = [
    { region: 'North America', attacks: 4521, percentage: 35 },
    { region: 'Europe', attacks: 3280, percentage: 25 },
    { region: 'Asia Pacific', attacks: 2624, percentage: 20 },
    { region: 'Latin America', attacks: 1312, percentage: 10 },
    { region: 'Other', attacks: 1968, percentage: 10 }
  ];
  
  res.json({
    success: true,
    data: {
      nodes,
      connections,
      statistics: {
        totalNodes: nodes.length,
        activeConnections: connections.filter(c => c.active).length,
        criticalNodes: nodes.filter(n => n.threatLevel === 'critical').length,
        attackPaths: 3
      },
      geoDistribution,
      timeline: generateTimeline()
    },
    meta: {
      generatedAt: new Date().toISOString(),
      refreshInterval: 5000
    }
  });
};

function generateTimeline() {
  const timeline = [];
  for (let i = 11; i >= 0; i--) {
    timeline.push({
      time: new Date(Date.now() - i * 300000).toISOString(),
      events: Math.floor(Math.random() * 5) + 1,
      severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)]
    });
  }
  return timeline;
}
