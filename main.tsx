import { useState, useEffect, useCallback } from 'react';
import BreachAlerts from './components/BreachAlerts';
import RiskScoreCard from './components/RiskScoreCard';
import ThreatGraph from './components/ThreatGraph';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import StatsPanel from './components/StatsPanel';
import ActivityFeed from './components/ActivityFeed';
import SearchBar from './components/SearchBar';
import { AlertTriangle, Shield, Activity, TrendingUp, Cpu, Globe } from 'lucide-react';

// Mock data generators
const generateAlerts = () => {
  const types = ['Data Breach', 'Phishing', 'Ransomware', 'SQL Injection', 'DDoS Attack', 'Credential Stuffing'];
  const severities = ['critical', 'high', 'medium', 'low'];
  const sources = ['IntelX', 'Dark Web Monitor', 'Leak Detection', 'Network Sensor', 'Email Gateway'];
  
  return Array.from({ length: 12 }, (_, i) => ({
    id: `ALT-${Date.now()}-${i}`,
    type: types[Math.floor(Math.random() * types.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    title: getAlertTitle(types[Math.floor(Math.random() * types.length)]),
    description: 'Potential security incident detected requiring immediate investigation.',
    affectedData: ['Email addresses', 'Hashed passwords', 'IP addresses'],
    timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
    riskScore: Math.floor(Math.random() * 100),
    location: ['US', 'EU', 'APAC', 'LATAM'][Math.floor(Math.random() * 4)],
  }));
};

const getAlertTitle = (type: string) => {
  const titles: Record<string, string[]> = {
    'Data Breach': ['Healthcare Provider Data Exposed', 'Financial Records Leaked', 'Customer Database Compromised'],
    'Phishing': ['Credential Harvesting Campaign', 'BEC Attack Detected', 'Spoofed Login Pages Active'],
    'Ransomware': ['LockBit Variant Detected', 'Ransomware Gang Activity', 'Encryption Behavior Observed'],
    'SQL Injection': ['Blind SQLi Attempt', 'Union-based Injection Blocked', 'Time-based Injection Attempt'],
    'DDoS Attack': ['Volumetric Attack Origin', 'Application Layer Flood', 'DNS Amplification Detected'],
    'Credential Stuffing': ['Account Takeover Wave', 'Password Spray Attack', 'Credential Validation Storm'],
  };
  const options = titles[type] || ['Security Event Detected'];
  return options[Math.floor(Math.random() * options.length)];
};

export default function App() {
  const [alerts, setAlerts] = useState(generateAlerts());
  const [riskScore, setRiskScore] = useState(73);
  const [activePage, setActivePage] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [nvidiaLatency, setNvidiaLatency] = useState(12);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts(prev => {
        if (Math.random() > 0.7) {
          const newAlert = generateAlerts()[0];
          return [newAlert, ...prev.slice(0, 11)];
        }
        return prev;
      });
      setRiskScore(prev => Math.max(20, Math.min(95, prev + (Math.random() - 0.5) * 10)));
      setNvidiaLatency(Math.floor(8 + Math.random() * 12));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const filteredAlerts = alerts.filter(alert =>
    alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalAlerts: alerts.length,
    criticalCount: alerts.filter(a => a.severity === 'critical').length,
    avgRiskScore: Math.round(alerts.reduce((acc, a) => acc + a.riskScore, 0) / alerts.length),
    aiAccuracy: 94.7,
    threatsBlocked: 12847,
    uptime: 99.97,
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-[#0a0e17] text-gray-100">
      <Navbar />
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      
      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Security Operations Center</h1>
              <p className="text-gray-400 text-sm mt-1">
                AI-Powered Threat Detection • NVIDIA Accelerated • IntelX Powered
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-[#1f2937] px-4 py-2 rounded-lg">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-300">NVIDIA Inference</span>
                <span className="text-sm font-mono text-cyan-400">{nvidiaLatency}ms</span>
              </div>
              <div className="flex items-center gap-2 bg-[#1f2937] px-4 py-2 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-300">Live Feed Active</span>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-6 gap-4 mb-6">
            <StatCard icon={AlertTriangle} label="Total Alerts" value={stats.totalAlerts} color="cyan" />
            <StatCard icon={Shield} label="Critical" value={stats.criticalCount} color="red" />
            <StatCard icon={Activity} label="Avg Risk Score" value={stats.avgRiskScore} color="amber" />
            <StatCard icon={TrendingUp} label="AI Accuracy" value={`${stats.aiAccuracy}%`} color="purple" />
            <StatCard icon={Globe} label="Threats Blocked" value={stats.threatsBlocked.toLocaleString()} color="emerald" />
            <StatCard icon={Activity} label="Uptime" value={`${stats.uptime}%`} color="cyan" />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Alerts & Graph */}
            <div className="col-span-8 space-y-6">
              <div className="bg-[#111827] rounded-xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-cyan-400" />
                    Live Breach Alerts
                  </h2>
                  <SearchBar value={searchQuery} onChange={setSearchQuery} />
                </div>
                <BreachAlerts alerts={filteredAlerts} />
              </div>

              <div className="bg-[#111827] rounded-xl p-6 border border-gray-800">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-purple-400" />
                  Threat Vector Analysis
                </h2>
                <ThreatGraph />
              </div>
            </div>

            {/* Right Column - Risk & Activity */}
            <div className="col-span-4 space-y-6">
              <RiskScoreCard score={Math.round(riskScore)} />
              
              <ActivityFeed />
              
              <div className="bg-[#111827] rounded-xl p-6 border border-gray-800">
                <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  AI Model Status
                </h3>
                <div className="space-y-3">
                  <ModelStatus name="Phishing Detector" status="active" accuracy={96.2} />
                  <ModelStatus name="Breach Risk Scorer" status="active" accuracy={94.8} />
                  <ModelStatus name="Attack Vector Predictor" status="active" accuracy={91.5} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string | number; color: string }) {
  const colorClasses: Record<string, string> = {
    cyan: 'text-cyan-400 bg-cyan-400/10',
    red: 'text-red-400 bg-red-400/10',
    amber: 'text-amber-400 bg-amber-400/10',
    purple: 'text-purple-400 bg-purple-400/10',
    emerald: 'text-emerald-400 bg-emerald-400/10',
  };
  
  return (
    <div className="bg-[#111827] rounded-xl p-4 border border-gray-800 hover:border-gray-700 transition-colors">
      <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}

function ModelStatus({ name, status, accuracy }: { name: string; status: string; accuracy: number }) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#1f2937] rounded-lg">
      <div>
        <div className="text-sm font-medium text-gray-200">{name}</div>
        <div className="text-xs text-gray-400">{(accuracy / 100 * 150).toFixed(0)}ms avg latency</div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-emerald-400">{accuracy}% acc</span>
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-gray-800 rounded-full animate-spin border-t-cyan-500 mx-auto" />
          <Shield className="w-8 h-8 text-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-1" />
        </div>
        <h2 className="text-xl font-bold text-white mt-6">GuardianX 2.0</h2>
        <p className="text-gray-400 mt-2">Initializing AI models...</p>
        <div className="mt-4 w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 animate-pulse rounded-full" style={{ width: '60%' }} />
        </div>
      </div>
    </div>
  );
}

export { generateAlerts, getAlertTitle };
