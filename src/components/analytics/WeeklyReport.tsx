import { motion } from 'motion/react';
import { ArrowLeft, Download, Share2, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '../ui/button';
import type { Screen } from '../../App';

interface WeeklyReportProps {
  navigateTo: (screen: Screen) => void;
  privacyScore: number;
}

const scoreHistory = [
  { day: 'Mon', score: 72 },
  { day: 'Tue', score: 68 },
  { day: 'Wed', score: 65 },
  { day: 'Thu', score: 63 },
  { day: 'Fri', score: 67 },
  { day: 'Sat', score: 69 },
  { day: 'Sun', score: 67 },
];

const appActivity = [
  { app: 'Instagram', camera: 15, mic: 23, location: 45 },
  { app: 'TikTok', camera: 28, mic: 31, location: 52 },
  { app: 'Facebook', camera: 8, mic: 12, location: 89 },
  { app: 'Snapchat', camera: 19, mic: 7, location: 34 },
];

export function WeeklyReport({ navigateTo, privacyScore }: WeeklyReportProps) {
  return (
    <div className="min-h-full bg-zinc-900 pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-center gap-4 z-10">
        <button
          onClick={() => navigateTo('home')}
          className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex-1">
          <h1 className="text-white text-xl">Weekly Report</h1>
          <p className="text-zinc-500 text-sm">Nov 12 - Nov 19, 2025</p>
        </div>
        <button className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
          <Share2 className="w-5 h-5 text-cyan-400" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Score Trend */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-zinc-800 border border-zinc-700 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white text-lg mb-1">Privacy Score Trend</h2>
              <p className="text-zinc-400 text-sm">This week's performance</p>
            </div>
            <div className="flex items-center gap-2 text-red-400">
              <TrendingDown className="w-5 h-5" />
              <span className="text-sm">-7%</span>
            </div>
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                <XAxis dataKey="day" stroke="#71717a" style={{ fontSize: '12px' }} />
                <YAxis stroke="#71717a" style={{ fontSize: '12px' }} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#27272a', 
                    border: '1px solid #3f3f46',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  dot={{ fill: '#06b6d4', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* App Activity Breakdown */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-800 border border-zinc-700 rounded-3xl p-6"
        >
          <h2 className="text-white text-lg mb-4">Permission Usage</h2>
          <p className="text-zinc-400 text-sm mb-4">Times used this week</p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                <XAxis dataKey="app" stroke="#71717a" style={{ fontSize: '11px' }} />
                <YAxis stroke="#71717a" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#27272a', 
                    border: '1px solid #3f3f46',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="camera" fill="#ec4899" radius={[4, 4, 0, 0]} />
                <Bar dataKey="mic" fill="#eab308" radius={[4, 4, 0, 0]} />
                <Bar dataKey="location" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex gap-4 mt-4 justify-center">
            <LegendItem color="bg-pink-500" label="Camera" />
            <LegendItem color="bg-yellow-500" label="Microphone" />
            <LegendItem color="bg-cyan-500" label="Location" />
          </div>
        </motion.div>

        {/* Top Insights */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h2 className="text-white text-lg">Top Insights</h2>
          
          <InsightCard
            icon="🔴"
            title="Riskiest App: TikTok"
            description="Used camera 28 times and mic 31 times this week"
            color="border-red-500/30 bg-red-500/10"
          />
          
          <InsightCard
            icon="🟢"
            title="Safest App: Messages"
            description="Only uses permissions when app is open"
            color="border-green-500/30 bg-green-500/10"
          />
          
          <InsightCard
            icon="⚠️"
            title="Unusual Activity"
            description="Instagram used camera at 3:24 AM on Tuesday"
            color="border-yellow-500/30 bg-yellow-500/10"
          />
        </motion.div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => navigateTo('quickfix')}
            className="h-14 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-2xl"
          >
            Fix Issues
          </Button>
          <Button
            variant="outline"
            className="h-14 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white rounded-2xl"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-zinc-400 text-xs">{label}</span>
    </div>
  );
}

function InsightCard({ icon, title, description, color }: { 
  icon: string; 
  title: string; 
  description: string;
  color: string;
}) {
  return (
    <div className={`border rounded-2xl p-4 ${color}`}>
      <div className="flex gap-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <h3 className="text-white mb-1">{title}</h3>
          <p className="text-zinc-400 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
