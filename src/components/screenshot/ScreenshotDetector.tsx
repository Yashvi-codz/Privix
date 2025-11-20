import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Camera, AlertTriangle, Shield, Eye, Clock, Image, Lock } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import type { Screen } from '../../App';

interface ScreenshotDetectorProps {
  navigateTo: (screen: Screen) => void;
}

interface ScreenshotEvent {
  id: string;
  app: string;
  appIcon: string;
  time: string;
  date: string;
  content: string;
  sensitive: boolean;
  category: 'banking' | 'message' | 'photo' | 'document' | 'other';
}

const screenshots: ScreenshotEvent[] = [
  {
    id: '1',
    app: 'Banking App',
    appIcon: '🏦',
    time: '2:15 PM',
    date: 'Today',
    content: 'Account balance and transaction history',
    sensitive: true,
    category: 'banking'
  },
  {
    id: '2',
    app: 'WhatsApp',
    appIcon: '💬',
    time: '11:30 AM',
    date: 'Today',
    content: 'Private conversation screenshot',
    sensitive: true,
    category: 'message'
  },
  {
    id: '3',
    app: 'Instagram',
    appIcon: '📷',
    time: '9:45 AM',
    date: 'Today',
    content: 'Story content',
    sensitive: false,
    category: 'photo'
  },
  {
    id: '4',
    app: 'Notes',
    appIcon: '📝',
    time: '8:20 PM',
    date: 'Yesterday',
    content: 'Password list',
    sensitive: true,
    category: 'document'
  },
  {
    id: '5',
    app: 'Messages',
    appIcon: '💬',
    time: '3:30 PM',
    date: 'Yesterday',
    content: 'Text message conversation',
    sensitive: true,
    category: 'message'
  },
];

export function ScreenshotDetector({ navigateTo }: ScreenshotDetectorProps) {
  const [detectionEnabled, setDetectionEnabled] = useState(true);
  const [autoDelete, setAutoDelete] = useState(false);
  const [filter, setFilter] = useState<'all' | 'sensitive'>('all');

  const filteredScreenshots = filter === 'all' 
    ? screenshots 
    : screenshots.filter(s => s.sensitive);

  const sensitiveCount = screenshots.filter(s => s.sensitive).length;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'banking': return 'text-red-500 bg-red-50 border-red-200';
      case 'message': return 'text-orange-500 bg-orange-50 border-orange-200';
      case 'photo': return 'text-blue-500 bg-blue-50 border-blue-200';
      case 'document': return 'text-purple-500 bg-purple-50 border-purple-200';
      default: return 'text-zinc-500 bg-zinc-50 border-zinc-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'banking': return '🏦';
      case 'message': return '💬';
      case 'photo': return '📸';
      case 'document': return '📄';
      default: return '📱';
    }
  };

  return (
    <div className="min-h-full bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-zinc-200 p-6 z-10">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigateTo('home')}
            className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center hover:bg-zinc-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-900" />
          </button>
          <div className="flex-1">
            <h1 className="text-zinc-900 text-xl">Screenshot Detector</h1>
            <p className="text-zinc-500 text-sm">{filteredScreenshots.length} screenshots tracked</p>
          </div>
          <Camera className="w-6 h-6 text-cyan-500" />
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2">
          <FilterChip 
            label="All" 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
            count={screenshots.length}
          />
          <FilterChip 
            label="Sensitive" 
            active={filter === 'sensitive'} 
            onClick={() => setFilter('sensitive')}
            count={sensitiveCount}
            color="bg-red-500"
          />
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Alert Banner */}
        {sensitiveCount > 0 && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-4"
          >
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-red-900 mb-1">Sensitive Content Detected</h3>
                <p className="text-red-700 text-sm">
                  {sensitiveCount} screenshots contain sensitive information like passwords, banking details, or private messages.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Settings Cards */}
        <div className="space-y-3">
          <SettingCard
            icon={<Shield className="w-5 h-5 text-cyan-500" />}
            title="Screenshot Detection"
            description="Track when screenshots are taken"
            gradient="from-cyan-50 to-blue-50"
            borderColor="border-cyan-200"
          >
            <Switch checked={detectionEnabled} onCheckedChange={setDetectionEnabled} />
          </SettingCard>

          <SettingCard
            icon={<Lock className="w-5 h-5 text-purple-500" />}
            title="Auto-Delete Sensitive"
            description="Automatically delete after 24 hours"
            gradient="from-purple-50 to-pink-50"
            borderColor="border-purple-200"
          >
            <Switch checked={autoDelete} onCheckedChange={setAutoDelete} />
          </SettingCard>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard
            icon="🏦"
            label="Banking"
            value={screenshots.filter(s => s.category === 'banking').length}
            color="text-red-500 bg-red-50 border-red-200"
          />
          <StatCard
            icon="💬"
            label="Messages"
            value={screenshots.filter(s => s.category === 'message').length}
            color="text-orange-500 bg-orange-50 border-orange-200"
          />
          <StatCard
            icon="📄"
            label="Documents"
            value={screenshots.filter(s => s.category === 'document').length}
            color="text-purple-500 bg-purple-50 border-purple-200"
          />
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl p-4">
          <div className="flex gap-3">
            <div className="text-xl">💡</div>
            <div>
              <h3 className="text-cyan-900 mb-1">How it works</h3>
              <p className="text-cyan-700 text-sm">
                Privix monitors screenshot activity and analyzes content to detect sensitive information. We alert you when private data might be at risk.
              </p>
            </div>
          </div>
        </div>

        {/* Screenshots Timeline */}
        <div className="space-y-3">
          <h2 className="text-zinc-900 text-lg">Recent Screenshots</h2>
          
          {filteredScreenshots.map((screenshot, index) => {
            const categoryColor = getCategoryColor(screenshot.category);
            
            return (
              <motion.div
                key={screenshot.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`border rounded-2xl p-4 ${
                  screenshot.sensitive 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-zinc-50 border-zinc-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* App Icon */}
                  <div className="w-12 h-12 bg-white border border-zinc-200 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                    {screenshot.appIcon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-zinc-900">{screenshot.app}</h3>
                      <span className="text-zinc-500 text-xs flex-shrink-0">{screenshot.time}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className={`px-2 py-1 rounded-lg text-xs border ${categoryColor}`}>
                        <div className="flex items-center gap-1">
                          <span>{getCategoryIcon(screenshot.category)}</span>
                          <span className="capitalize">{screenshot.category}</span>
                        </div>
                      </div>
                      {screenshot.sensitive && (
                        <div className="px-2 py-1 rounded-lg text-xs bg-red-100 text-red-600 border border-red-200">
                          <div className="flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Sensitive</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <p className="text-zinc-600 text-sm mb-3">{screenshot.content}</p>

                    <div className="flex gap-2">
                      <button className="text-xs text-cyan-600 hover:text-cyan-700 flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        View Details
                      </button>
                      <button className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredScreenshots.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-zinc-900 mb-2">No screenshots found</h3>
            <p className="text-zinc-500 text-sm">Screenshots will appear here when detected</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => navigateTo('settings')}
            className="w-full h-14 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-2xl"
          >
            Configure Settings
          </Button>
          <Button
            variant="outline"
            className="w-full h-14 bg-white border-zinc-300 hover:bg-zinc-50 text-zinc-900 rounded-2xl"
          >
            Export Screenshot Log
          </Button>
        </div>
      </div>
    </div>
  );
}

function FilterChip({ 
  label, 
  active, 
  onClick, 
  count,
  color = 'bg-cyan-500'
}: { 
  label: string; 
  active: boolean; 
  onClick: () => void;
  count: number;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm transition-colors ${
        active 
          ? `${color} text-white` 
          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
      }`}
    >
      {label} {count > 0 && `(${count})`}
    </button>
  );
}

function SettingCard({
  icon,
  title,
  description,
  gradient,
  borderColor,
  children
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  borderColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`bg-gradient-to-r ${gradient} border ${borderColor} rounded-2xl p-4`}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-zinc-200">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-zinc-900 mb-1">{title}</h3>
          <p className="text-zinc-600 text-sm">{description}</p>
        </div>
        <div className="flex-shrink-0">
          {children}
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  icon, 
  label, 
  value, 
  color 
}: { 
  icon: string; 
  label: string; 
  value: number;
  color: string;
}) {
  return (
    <div className={`${color} border rounded-2xl p-4 text-center`}>
      <div className="text-2xl mb-2">{icon}</div>
      <div className={`text-2xl mb-1 ${color.split(' ')[0]}`}>{value}</div>
      <p className="text-zinc-600 text-xs">{label}</p>
    </div>
  );
}
