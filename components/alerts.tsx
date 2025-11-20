import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Camera, Mic, MapPin, Bell, Eye, Clock, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import type { Screen } from '../../App';

interface AlertsCenterProps {
  navigateTo: (screen: Screen) => void;
}

interface Alert {
  id: string;
  app: string;
  appIcon: string;
  permission: string;
  icon: React.ReactNode;
  time: string;
  severity: 'critical' | 'warning' | 'info';
  description: string;
  details: string;
}

const alerts: Alert[] = [
  {
    id: '1',
    app: 'TikTok',
    appIcon: '🎵',
    permission: 'Camera',
    icon: <Camera className="w-5 h-5" />,
    time: '2:04 AM',
    severity: 'critical',
    description: 'Used camera while app was in background',
    details: 'TikTok accessed your camera at 2:04 AM when the app was not actively being used. This is unusual behavior.'
  },
  {
    id: '2',
    app: 'Instagram',
    appIcon: '📷',
    permission: 'Microphone',
    icon: <Mic className="w-5 h-5" />,
    time: '3:24 AM',
    severity: 'critical',
    description: 'Microphone accessed at unusual hour',
    details: 'Instagram used your microphone at 3:24 AM. Apps should not access your microphone when you\'re not actively using them.'
  },
  {
    id: '3',
    app: 'Facebook',
    appIcon: '👥',
    permission: 'Location',
    icon: <MapPin className="w-5 h-5" />,
    time: '1 hour ago',
    severity: 'warning',
    description: 'Background location tracking detected',
    details: 'Facebook has been tracking your location in the background 47 times today.'
  },
  {
    id: '4',
    app: 'Snapchat',
    appIcon: '👻',
    permission: 'Camera',
    icon: <Camera className="w-5 h-5" />,
    time: '2 hours ago',
    severity: 'info',
    description: 'Camera accessed',
    details: 'Snapchat used your camera while you were actively using the app.'
  },
  {
    id: '5',
    app: 'WhatsApp',
    appIcon: '💬',
    permission: 'Microphone',
    icon: <Mic className="w-5 h-5" />,
    time: '3 hours ago',
    severity: 'info',
    description: 'Microphone used for voice message',
    details: 'WhatsApp accessed your microphone for a voice message.'
  },
];

export function AlertsCenter({ navigateTo }: AlertsCenterProps) {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning'>('all');

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(a => a.severity === filter);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', dot: 'bg-red-500' };
      case 'warning': return { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', dot: 'bg-yellow-500' };
      case 'info': return { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', dot: 'bg-blue-500' };
      default: return { bg: 'bg-zinc-500/20', text: 'text-zinc-400', border: 'border-zinc-500/30', dot: 'bg-zinc-500' };
    }
  };

  if (selectedAlert) {
    const colors = getSeverityColor(selectedAlert.severity);
    
    return (
      <div className="min-h-full bg-zinc-900 pb-24">
        {/* Header */}
        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-center gap-4 z-10">
          <button
            onClick={() => setSelectedAlert(null)}
            className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-white text-xl">Alert Details</h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* App Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`border ${colors.border} ${colors.bg} rounded-3xl p-6`}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-zinc-700 rounded-2xl flex items-center justify-center text-3xl">
                {selectedAlert.appIcon}
              </div>
              <div className="flex-1">
                <h2 className="text-white text-xl mb-1">{selectedAlert.app}</h2>
                <p className={`text-sm ${colors.text}`}>{selectedAlert.permission} Access</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs ${colors.bg} ${colors.text} border ${colors.border}`}>
                {selectedAlert.severity.toUpperCase()}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-zinc-400">
                <Clock className="w-5 h-5" />
                <span>{selectedAlert.time}</span>
              </div>
              
              <div>
                <h3 className="text-white mb-2">What happened?</h3>
                <p className="text-zinc-300 text-sm">{selectedAlert.details}</p>
              </div>

              <div className={`p-4 rounded-2xl ${colors.bg} border ${colors.border}`}>
                <div className="flex gap-2 mb-2">
                  <span className="text-xl">💡</span>
                  <h3 className={colors.text}>Why this matters</h3>
                </div>
                <p className="text-zinc-300 text-sm">
                  Apps accessing sensitive permissions at unusual times or in the background may be collecting data without your knowledge.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="bg-zinc-800 border border-zinc-700 rounded-3xl p-6">
            <h3 className="text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              <TimelineItem time="2:04 AM" event="Camera accessed in background" critical />
              <TimelineItem time="1:47 AM" event="Location tracking active" />
              <TimelineItem time="12:30 AM" event="App opened" />
              <TimelineItem time="Yesterday 11:45 PM" event="Microphone used" />
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={() => navigateTo('quickfix')}
              className="w-full h-14 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-2xl"
            >
              Revoke {selectedAlert.permission} Permission
            </Button>
            <Button
              onClick={() => navigateTo('timeline')}
              variant="outline"
              className="w-full h-14 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white rounded-2xl"
            >
              View Full Timeline
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-zinc-900 pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-white text-2xl">Alerts</h1>
            <p className="text-zinc-500 text-sm">{filteredAlerts.length} notifications</p>
          </div>
          <Bell className="w-6 h-6 text-cyan-400" />
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2">
          <FilterChip 
            label="All" 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
            count={alerts.length}
          />
          <FilterChip 
            label="Critical" 
            active={filter === 'critical'} 
            onClick={() => setFilter('critical')}
            count={alerts.filter(a => a.severity === 'critical').length}
            color="text-red-400"
          />
          <FilterChip 
            label="Warning" 
            active={filter === 'warning'} 
            onClick={() => setFilter('warning')}
            count={alerts.filter(a => a.severity === 'warning').length}
            color="text-yellow-400"
          />
        </div>
      </div>

      <div className="p-6 space-y-3">
        {filteredAlerts.map((alert, index) => {
          const colors = getSeverityColor(alert.severity);
          
          return (
            <motion.button
              key={alert.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedAlert(alert)}
              className={`w-full border ${colors.border} ${colors.bg} rounded-2xl p-4 text-left hover:scale-[1.02] transition-transform`}
            >
              <div className="flex items-start gap-4">
                {/* Status Dot */}
                <div className="relative">
                  <div className="w-12 h-12 bg-zinc-700 rounded-xl flex items-center justify-center text-2xl">
                    {alert.appIcon}
                  </div>
                  <div className={`absolute -top-1 -right-1 w-4 h-4 ${colors.dot} rounded-full border-2 border-zinc-900`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-white">{alert.app}</h3>
                    <span className="text-zinc-500 text-xs flex-shrink-0">{alert.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className={colors.text}>{alert.icon}</span>
                    <p className="text-zinc-400 text-sm">{alert.permission}</p>
                  </div>

                  <p className="text-zinc-300 text-sm">{alert.description}</p>
                </div>

                <Eye className="w-5 h-5 text-zinc-600 flex-shrink-0" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function FilterChip({ 
  label, 
  active, 
  onClick, 
  count,
  color = 'text-cyan-400'
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
          ? `bg-cyan-500 text-white` 
          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
      }`}
    >
      {label} {count > 0 && `(${count})`}
    </button>
  );
}

function TimelineItem({ time, event, critical }: { time: string; event: string; critical?: boolean }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full ${critical ? 'bg-red-500' : 'bg-cyan-500'}`} />
        <div className="w-0.5 h-full bg-zinc-700 mt-1" />
      </div>
      <div className="flex-1 pb-4">
        <p className="text-zinc-400 text-xs mb-1">{time}</p>
        <p className={`text-sm ${critical ? 'text-red-400' : 'text-white'}`}>{event}</p>
      </div>
    </div>
  );
}
