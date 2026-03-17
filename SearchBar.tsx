import { useEffect, useRef, useState } from 'react';
import { Globe, Server, User, Shield, Lock, Database } from 'lucide-react';

interface Node {
  id: string;
  type: 'source' | 'target' | 'attack' | 'data';
  label: string;
  x: number;
  y: number;
  connections: string[];
}

const nodeIcons: Record<string, any> = {
  source: Globe,
  target: Server,
  attack: Shield,
  data: Database,
};

const nodeColors: Record<string, { bg: string; border: string; glow: string }> = {
  source: { bg: 'bg-cyan-500/20', border: 'border-cyan-500', glow: 'shadow-cyan-500/50' },
  target: { bg: 'bg-purple-500/20', border: 'border-purple-500', glow: 'shadow-purple-500/50' },
  attack: { bg: 'bg-red-500/20', border: 'border-red-500', glow: 'shadow-red-500/50' },
  data: { bg: 'bg-amber-500/20', border: 'border-amber-500', glow: 'shadow-amber-500/50' },
};

export default function ThreatGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 700, height: 300 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);

  const nodes: Node[] = [
    { id: 'intelx', type: 'source', label: 'IntelX Feed', x: 0.1, y: 0.5, connections: ['phishing-campaign', 'breach-db'] },
    { id: 'darkweb', type: 'source', label: 'Dark Web', x: 0.15, y: 0.3, connections: ['credential-market'] },
    { id: 'phishing-campaign', type: 'attack', label: 'Phishing Wave', x: 0.35, y: 0.4, connections: ['corporate-network', 'email-gateway'] },
    { id: 'breach-db', type: 'data', label: 'Leaked DB', x: 0.3, y: 0.7, connections: ['credential-market'] },
    { id: 'credential-market', type: 'attack', label: 'Credential Stuffing', x: 0.5, y: 0.5, connections: ['corporate-network'] },
    { id: 'email-gateway', type: 'target', label: 'Email Gateway', x: 0.55, y: 0.25, connections: ['user-workstations'] },
    { id: 'corporate-network', type: 'target', label: 'Corporate Net', x: 0.65, y: 0.55, connections: ['user-workstations', 'file-server'] },
    { id: 'user-workstations', type: 'target', label: 'Endpoints', x: 0.8, y: 0.4, connections: ['file-server', 'auth-server'] },
    { id: 'file-server', type: 'data', label: 'File Server', x: 0.85, y: 0.65, connections: [] },
    { id: 'auth-server', type: 'data', label: 'Auth Server', x: 0.9, y: 0.3, connections: [] },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(p => (p + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Draw connections
    nodes.forEach(node => {
      const startX = node.x * dimensions.width;
      const startY = node.y * dimensions.height;

      node.connections.forEach(targetId => {
        const target = nodes.find(n => n.id === targetId);
        if (!target) return;

        const endX = target.x * dimensions.width;
        const endY = target.y * dimensions.height;

        // Animated dash offset
        const dashOffset = animationPhase * 2;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = 'rgba(100, 116, 139, 0.4)';
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 8]);
        ctx.lineDashOffset = -dashOffset;
        ctx.stroke();
        ctx.setLineDash([]);

        // Animated packet
        const packetProgress = (animationPhase / 100);
        const packetX = startX + (endX - startX) * packetProgress;
        const packetY = startY + (endY - startY) * packetProgress;
        
        ctx.beginPath();
        ctx.arc(packetX, packetY, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.8)';
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    });
  }, [dimensions, animationPhase, nodes]);

  const getNodePosition = (x: number, y: number) => ({
    left: `${x * 100}%`,
    top: `${y * 100}%`,
  });

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        style={{ width: dimensions.width, height: dimensions.height }}
        className="w-full rounded-lg bg-[#0a0e17]"
      />

      {/* SVG Overlay for better quality nodes */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ viewBox: `0 0 ${dimensions.width} ${dimensions.height}` }}
      >
        {/* Grid pattern */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(55, 65, 81, 0.3)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Node Overlays */}
      <div className="absolute inset-0">
        {nodes.map(node => {
          const Icon = nodeIcons[node.type];
          const colors = nodeColors[node.type];
          const isHovered = hoveredNode === node.id;
          const pos = getNodePosition(node.x, node.y);

          return (
            <div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              style={pos}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div
                className={`
                  flex flex-col items-center gap-1 transition-all duration-200
                  ${isHovered ? 'scale-110 z-10' : ''}
                `}
              >
                <div
                  className={`
                    w-10 h-10 rounded-xl ${colors.bg} border-2 ${colors.border}
                    flex items-center justify-center
                    ${isHovered ? `shadow-lg ${colors.glow}` : ''}
                    transition-shadow duration-200
                  `}
                >
                  <Icon className={`w-5 h-5 ${isHovered ? 'text-white' : 'text-gray-300'}`} />
                </div>
                <span className={`
                  text-xs font-medium whitespace-nowrap
                  transition-all duration-200
                  ${isHovered ? 'text-white bg-gray-900/90 px-2 py-1 rounded' : 'text-gray-400'}
                `}>
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs">
        {Object.entries(nodeColors).map(([type, colors]) => (
          <div key={type} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded ${colors.bg} border ${colors.border}`} />
            <span className="text-gray-400 capitalize">{type}</span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="absolute top-2 right-2 bg-[#1f2937]/90 backdrop-blur rounded-lg px-3 py-2 text-xs">
        <div className="text-gray-400">
          Active Paths: <span className="text-cyan-400 font-semibold">{nodes.reduce((acc, n) => acc + n.connections.length, 0)}</span>
        </div>
      </div>
    </div>
  );
}
