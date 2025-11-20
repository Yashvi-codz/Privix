import { motion } from 'motion/react';

interface PrivacyScoreProps {
  score: number;
  size?: number;
}

export function PrivacyScore({ score, size = 180 }: PrivacyScoreProps) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (score: number) => {
    if (score >= 80) return { stroke: '#10b981', text: 'text-green-500', label: 'Great!' };
    if (score >= 60) return { stroke: '#eab308', text: 'text-yellow-500', label: 'Good' };
    if (score >= 40) return { stroke: '#f97316', text: 'text-orange-500', label: 'Fair' };
    return { stroke: '#ef4444', text: 'text-red-500', label: 'Poor' };
  };

  const color = getColor(score);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e4e4e7"
            strokeWidth="10"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color.stroke}
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 8px ${color.stroke})`
            }}
          />
        </svg>
        
        {/* Score display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-center"
          >
            <div className={`text-5xl ${color.text} mb-1`}>
              {score}
            </div>
            <div className="text-zinc-500 text-sm">/ 100</div>
            <div className={`text-xs mt-1 ${color.text}`}>
              {color.label}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
