import { useEffect, useState, useRef } from 'react';
import { Shield, TrendingUp, TrendingDown, Minus, Zap, Brain } from 'lucide-react';

interface RiskScoreCardProps {
  score: number;
}

export default function RiskScoreCard({ score }: RiskScoreCardProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [prevScore, setPrevScore] = useState(score);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const startScore = displayScore;
    const endScore = score;
    const duration = 1000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startScore + (endScore - startScore) * easeOut);
      setDisplayScore(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    setPrevScore(score);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [score]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    const lineWidth = 12;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI * 0.75, Math.PI * 2.25, false);
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Progress arc
    const progress = displayScore / 100;
    const endAngle = Math.PI * 0.75 + progress * Math.PI * 1.5;
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    if (displayScore < 40) {
      gradient.addColorStop(0, '#10b981');
      gradient.addColorStop(1, '#34d399');
    } else if (displayScore < 70) {
      gradient.addColorStop(0, '#f59e0b');
      gradient.addColorStop(1, '#fbbf24');
    } else {
      gradient.addColorStop(0, '#ef4444');
      gradient.addColorStop(1, '#f87171');
    }

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI * 0.75, endAngle, false);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Glow effect
    ctx.shadowColor = displayScore < 40 ? '#10b981' : displayScore < 70 ? '#f59e0b' : '#ef4444';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI * 0.75, endAngle, false);
    ctx.strokeStyle = 'transparent';
    ctx.stroke();
    ctx.shadowBlur = 0;

  }, [displayScore]);

  const getRiskLevel = () => {
    if (displayScore < 30) return { label: 'Low Risk', color: 'text-emerald-400', bg: 'bg-emerald-500/10' };
    if (displayScore < 60) return { label: 'Medium Risk', color: 'text-amber-400', bg: 'bg-amber-500/10' };
    if (displayScore < 80) return { label: 'High Risk', color: 'text-orange-400', bg: 'bg-orange-500/10' };
    return { label: 'Critical', color: 'text-red-400', bg: 'bg-red-500/10' };
  };

  const riskLevel = getRiskLevel();
  const trend = score > prevScore ? 'up' : score < prevScore ? 'down' : 'stable';

  return (
    <div className="bg-[#111827] rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-400" />
          Overall Risk Score
        </h3>
        <div className={`flex items-center gap-1 text-xs ${riskLevel.color}`}>
          {trend === 'up' && <TrendingUp className="w-3 h-3" />}
          {trend === 'down' && <TrendingDown className="w-3 h-3" />}
          {trend === 'stable' && <Minus className="w-3 h-3" />}
          <span>{trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{Math.abs(score - prevScore)}</span>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <canvas ref={canvasRef} width={200} height={120} className="-mt-4" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
          <div className={`text-4xl font-bold font-mono ${riskLevel.color}`}>
            {displayScore}
          </div>
          <div className={`text-xs px-2 py-0.5 rounded-full ${riskLevel.bg} ${riskLevel.color} mt-1`}>
            {riskLevel.label}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-800">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1f2937] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span className="text-xs text-gray-400">Phishing</span>
            </div>
            <div className="text-lg font-semibold text-white">{Math.round(displayScore * 0.85)}%</div>
          </div>
          <div className="bg-[#1f2937] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Brain className="w-3 h-3 text-purple-400" />
              <span className="text-xs text-gray-400">Exfiltration</span>
            </div>
            <div className="text-lg font-semibold text-white">{Math.round(displayScore * 0.62)}%</div>
          </div>
        </div>
      </div>

      {displayScore >= 80 && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg animate-pulse">
          <div className="text-xs text-red-400 font-semibold">⚠ Critical Risk Alert</div>
          <div className="text-xs text-red-300/70 mt-1">Immediate action recommended</div>
        </div>
      )}
    </div>
  );
}
