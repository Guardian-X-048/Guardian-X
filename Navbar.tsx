import { AlertTriangle, Clock, MapPin, ChevronRight, Eye, X, Filter } from 'lucide-react';

interface Alert {
  id: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  source: string;
  title: string;
  description: string;
  affectedData: string[];
  timestamp: string;
  riskScore: number;
  location: string;
}

const severityConfig = {
  critical: { color: 'bg-red-500', glow: 'shadow-red-500/50', text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
  high: { color: 'bg-orange-500', glow: 'shadow-orange-500/50', text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  medium: { color: 'bg-amber-500', glow: 'shadow-amber-500/50', text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  low: { color: 'bg-emerald-500', glow: 'shadow-emerald-500/50', text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
};

const typeIcons: Record<string, string> = {
  'Data Breach': 'DB',
  'Phishing': 'PH',
  'Ransomware': 'RW',
  'SQL Injection': 'SQL',
  'DDoS Attack': 'DD',
  'Credential Stuffing': 'CS',
};

export default function BreachAlerts({ alerts }: { alerts: Alert[] }) {
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const [filter, setFilter] = React.useState<string>('all');

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(a => a.severity === filter);

  return (
    <div>
      {/* Filters */}
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-gray-400" />
        {['all', 'critical', 'high', 'medium', 'low'].map(severity => (
          <button
            key={severity}
            onClick={() => setFilter(severity)}
            className={`px-3 py-1 text-xs rounded-full transition-all ${
              filter === severity
                ? severity === 'all'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                  : `${severityConfig[severity as keyof typeof severityConfig]?.bg} ${severityConfig[severity as keyof typeof severityConfig]?.text} border ${severityConfig[severity as keyof typeof severityConfig]?.border}`
                : 'bg-gray-800 text-gray-400 border border-transparent hover:bg-gray-700'
            }`}
          >
            {severity.charAt(0).toUpperCase() + severity.slice(1)}
          </button>
        ))}
      </div>

      {/* Alert List */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
        {filteredAlerts.map((alert, index) => {
          const config = severityConfig[alert.severity];
          const isExpanded = expandedId === alert.id;
          
          return (
            <div
              key={alert.id}
              className={`relative rounded-lg border ${config.border} ${config.bg} overflow-hidden transition-all duration-300 ${
                isExpanded ? 'ring-2 ring-' + alert.severity + '-500/50' : 'hover:scale-[1.01]'
              }`}
              style={{
                animationDelay: `${index * 50}ms`,
                animation: 'slideIn 0.4s ease-out forwards',
              }}
            >
              {/* Severity Stripe */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${config.color}`} />
              
              <div className="p-4 pl-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {/* Type Badge */}
                    <div className={`w-10 h-10 rounded-lg ${config.bg} border ${config.border} flex items-center justify-center flex-shrink-0`}>
                      <span className={`text-xs font-bold ${config.text}`}>
                        {typeIcons[alert.type] || '??'}
                      </span>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.text} border ${config.border}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">{alert.source}</span>
                      </div>
                      <h3 className="font-semibold text-gray-100 mb-1">{alert.title}</h3>
                      <p className="text-sm text-gray-400 line-clamp-2">{alert.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : alert.id)}
                      className="p-1 hover:bg-gray-700 rounded transition-colors"
                    >
                      <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      {alert.location}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-gray-700/50" style={{ animation: 'fadeIn 0.3s ease-out' }}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-xs text-gray-500 block mb-1">Risk Score</span>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${config.color} transition-all duration-500`}
                              style={{ width: `${alert.riskScore}%` }}
                            />
                          </div>
                          <span className={`text-sm font-mono ${config.text}`}>{alert.riskScore}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 block mb-1">Timestamp</span>
                        <div className="flex items-center gap-1 text-sm text-gray-300">
                          <Clock className="w-3 h-3" />
                          {new Date(alert.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-xs text-gray-500 block mb-2">Affected Data Types</span>
                      <div className="flex flex-wrap gap-2">
                        {alert.affectedData.map((data, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded border border-gray-700">
                            {data}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors text-sm">
                        <Eye className="w-4 h-4" />
                        Investigate
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                        <X className="w-4 h-4" />
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
}

// Need to import React for useState
import React from 'react';
