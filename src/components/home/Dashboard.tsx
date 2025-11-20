import { motion } from 'motion/react';
import { Scan, TrendingUp, Camera, Mic, MapPin, ChevronRight, Shield, Image } from 'lucide-react';
import { Button } from '../ui/button';
import { PrivacyScore } from '../common/PrivacyScore';
import type { Screen } from '../../App';

interface DashboardProps {
  navigateTo: (screen: Screen) => void;
  privacyScore: number;
}

const riskyApps = [
  { name: 'Instagram', icon: '📷', risk: 'high', permissions: 8 },
  { name: 'TikTok', icon: '🎵', risk: 'critical', permissions: 12 },
  { name: 'Facebook', icon: '👥', risk: 'high', permissions: 10 },
  { name: 'Snapchat', icon: '👻', risk: 'medium', permissions: 6 },
];

export function Dashboard({ navigateTo, privacyScore }: DashboardProps) {
  return (
    <div className="min-h-full bg-white pb-24">
      {/* Header */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-zinc-900 text-2xl">Welcome back! 👋</h1>
            <p className="text-zinc-500">Let's check your privacy</p>
          </div>
          <button 
            onClick={() => navigateTo('screenshot')}
            className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center hover:bg-zinc-200 transition-colors"
          >
            <Image className="w-5 h-5 text-cyan-500" />
          </button>
        </div>
      </div>

      {/* Privacy Score Card */}
      <div className="px-6 pb-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-zinc-50 to-white rounded-3xl p-6 border border-zinc-200 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-zinc-900 text-xl mb-1">Privacy Score</h2>
              <p className="text-zinc-500 text-sm">Last updated today</p>
            </div>
            <button 
              onClick={() => navigateTo('report')}
              className="text-cyan-500 text-sm flex items-center gap-1 hover:text-cyan-600"
            >
              Details <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <PrivacyScore score={privacyScore} size={200} />
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <StatCard icon={<Camera className="w-5 h-5" />} label="Camera" value="3 apps" color="text-pink-500" />
            <StatCard icon={<Mic className="w-5 h-5" />} label="Mic" value="5 apps" color="text-yellow-500" />
            <StatCard icon={<MapPin className="w-5 h-5" />} label="Location" value="8 apps" color="text-red-500" />
          </div>
        </motion.div>
      </div>

      {/* Weekly Goal */}
      <div className="px-6 pb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-2xl p-5"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-pink-500" />
                <h3 className="text-zinc-900">Weekly Goal</h3>
              </div>
              <p className="text-zinc-700 text-sm mb-3">Earn 50 privacy points this week</p>
              <div className="h-2 bg-white rounded-full overflow-hidden border border-zinc-200">
                <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" style={{ width: '65%' }} />
              </div>
              <p className="text-zinc-600 text-xs mt-2">32/50 points earned</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6 grid grid-cols-2 gap-4">
        <Button
          onClick={() => navigateTo('quickfix')}
          className="h-24 bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-2xl flex flex-col items-center justify-center gap-2 text-white shadow-lg"
        >
          <Scan className="w-6 h-6" />
          <span>Scan Permissions</span>
        </Button>
        <Button
          onClick={() => navigateTo('screenshot')}
          className="h-24 bg-gradient-to-br from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-2xl flex flex-col items-center justify-center gap-2 text-white shadow-lg"
        >
          <Image className="w-6 h-6" />
          <span>Screenshot Detector</span>
        </Button>
      </div>

      {/* Risky Apps List */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-zinc-900 text-xl">Risky Apps</h2>
          <button 
            onClick={() => navigateTo('quickfix')}
            className="text-cyan-500 text-sm hover:text-cyan-600"
          >
            Fix All
          </button>
        </div>

        <div className="space-y-3">
          {riskyApps.map((app, index) => (
            <motion.button
              key={app.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              onClick={() => navigateTo('quickfix')}
              className="w-full bg-white border border-zinc-200 rounded-2xl p-4 flex items-center gap-4 hover:border-cyan-300 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center text-2xl">
                {app.icon}
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-zinc-900">{app.name}</h3>
                <p className="text-zinc-500 text-sm">{app.permissions} permissions active</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <RiskBadge risk={app.risk} />
                <ChevronRight className="w-5 h-5 text-zinc-400" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-3 text-center">
      <div className={`flex justify-center mb-2 ${color}`}>
        {icon}
      </div>
      <p className="text-zinc-500 text-xs mb-1">{label}</p>
      <p className="text-zinc-900 text-sm">{value}</p>
    </div>
  );
}

function RiskBadge({ risk }: { risk: string }) {
  const colors = {
    critical: 'bg-red-100 text-red-600 border-red-200',
    high: 'bg-orange-100 text-orange-600 border-orange-200',
    medium: 'bg-yellow-100 text-yellow-600 border-yellow-200',
    low: 'bg-green-100 text-green-600 border-green-200'
  };

  return (
    <div className={`px-3 py-1 rounded-full text-xs border ${colors[risk as keyof typeof colors]}`}>
      {risk.toUpperCase()}
    </div>
  );
}
