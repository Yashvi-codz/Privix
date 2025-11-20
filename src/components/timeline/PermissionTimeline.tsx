import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Camera, Mic, MapPin, Calendar as CalendarIcon, Filter, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import type { Screen } from '../../App';

interface PermissionTimelineProps {
  navigateTo: (screen: Screen) => void;
}

interface TimelineEvent {
  id: string;
  app: string;
  appIcon: string;
  permission: 'camera' | 'mic' | 'location';
  time: string;
  date: string;
  unusual: boolean;
  details: string;
}

const events: TimelineEvent[] = [
  {
    id: '1',
    app: 'TikTok',
    appIcon: '🎵',
    permission: 'camera',
    time: '2:04 AM',
    date: 'Today',
    unusual: true,
    details: 'Background access while screen off'
  },
  {
    id: '2',
    app: 'Instagram',
    appIcon: '📷',
    permission: 'mic',
    time: '3:24 AM',
    date: 'Today',
    unusual: true,
    details: 'Microphone active during sleep hours'
  },
  {
    id: '3',
    app: 'Snapchat',
    appIcon: '👻',
    permission: 'camera',
    time: '10:15 AM',
    date: 'Today',
    unusual: false,
    details: 'Normal usage - taking photo'
  },
  {
    id: '4',
    app: 'Facebook',
    appIcon: '👥',
    permission: 'location',
    time: '11:30 AM',
    date: 'Today',
    unusual: false,
    details: 'Location check-in'
  },
  {
    id: '5',
    app: 'Instagram',
    appIcon: '📷',
    permission: 'camera',
    time: '2:45 PM',
    date: 'Today',
    unusual: false,
    details: 'Story upload'
  },
  {
    id: '6',
    app: 'TikTok',
    appIcon: '🎵',
    permission: 'mic',
    time: '4:20 PM',
    date: 'Today',
    unusual: false,
    details: 'Video recording'
  },
  {
    id: '7',
    app: 'WhatsApp',
    appIcon: '💬',
    permission: 'mic',
    time: '6:30 PM',
    date: 'Today',
    unusual: false,
    details: 'Voice message'
  },
  {
    id: '8',
    app: 'Instagram',
    appIcon: '📷',
    permission: 'location',
    time: '8:15 PM',
    date: 'Today',
    unusual: false,
    details: 'Post location tag'
  },
  {
    id: '9',
    app: 'Uber',
    appIcon: '🚗',
    permission: 'location',
    time: '11:47 PM',
    date: 'Yesterday',
    unusual: false,
    details: 'Trip tracking'
  },
  {
    id: '10',
    app: 'TikTok',
    appIcon: '🎵',
    permission: 'camera',
    time: '1:30 AM',
    date: 'Yesterday',
    unusual: true,
    details: 'Background access - app closed'
  },
];

export function PermissionTimeline({ navigateTo }: PermissionTimelineProps) {
  const [filter, setFilter] = useState<'all' | 'camera' | 'mic' | 'location'>('all');
  const [showUnusualOnly, setShowUnusualOnly] = useState(false);

  const filteredEvents = events.filter(event => {
    if (filter !== 'all' && event.permission !== filter) return false;
    if (showUnusualOnly && !event.unusual) return false;
    return true;
  });

  const getPermissionIcon = (permission: string) => {
    switch (permission) {
      case 'camera': return <Camera className="w-4 h-4" />;
      case 'mic': return <Mic className="w-4 h-4" />;
      case 'location': return <MapPin className="w-4 h-4" />;
      default: return null;
    }
  };

  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case 'camera': return 'text-pink-400 bg-pink-500/20 border-pink-500/30';
      case 'mic': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'location': return 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30';
      default: return 'text-zinc-400 bg-zinc-500/20 border-zinc-500/30';
    }
  };

  const groupedEvents = filteredEvents.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {} as Record<string, TimelineEvent[]>);

  return (
    <div className="min-h-full bg-zinc-900 pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 z-10">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigateTo('home')}
            className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-white text-xl">Permission Timeline</h1>
            <p className="text-zinc-500 text-sm">{filteredEvents.length} events</p>
          </div>
          <CalendarIcon className="w-6 h-6 text-cyan-400" />
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <FilterChip 
              label="All" 
              active={filter === 'all'} 
              onClick={() => setFilter('all')}
            />
            <FilterChip 
              label="Camera" 
              icon={<Camera className="w-4 h-4" />}
              active={filter === 'camera'} 
              onClick={() => setFilter('camera')}
              color="bg-pink-500"
            />
            <FilterChip 
              label="Microphone" 
              icon={<Mic className="w-4 h-4" />}
              active={filter === 'mic'} 
              onClick={() => setFilter('mic')}
              color="bg-yellow-500"
            />
            <FilterChip 
              label="Location" 
              icon={<MapPin className="w-4 h-4" />}
              active={filter === 'location'} 
              onClick={() => setFilter('location')}
              color="bg-cyan-500"
            />
          </div>

          <button
            onClick={() => setShowUnusualOnly(!showUnusualOnly)}
            className={`w-full px-4 py-2 rounded-xl text-sm transition-colors ${
              showUnusualOnly 
                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' 
                : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Show Unusual Activity Only</span>
            </div>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard
            icon={<Camera className="w-5 h-5" />}
            label="Camera"
            value={events.filter(e => e.permission === 'camera').length}
            color="text-pink-400 bg-pink-500/10"
          />
          <StatCard
            icon={<Mic className="w-5 h-5" />}
            label="Mic"
            value={events.filter(e => e.permission === 'mic').length}
            color="text-yellow-400 bg-yellow-500/10"
          />
          <StatCard
            icon={<MapPin className="w-5 h-5" />}
            label="Location"
            value={events.filter(e => e.permission === 'location').length}
            color="text-cyan-400 bg-cyan-500/10"
          />
        </div>

        {/* Unusual Activity Alert */}
        {events.some(e => e.unusual) && !showUnusualOnly && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-4"
          >
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0" />
              <div>
                <h3 className="text-orange-400 mb-1">Unusual Activity Detected</h3>
                <p className="text-zinc-300 text-sm mb-3">
                  {events.filter(e => e.unusual).length} permissions used at odd hours or in background
                </p>
                <Button
                  onClick={() => setShowUnusualOnly(true)}
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  View Details
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Timeline */}
        {Object.entries(groupedEvents).map(([date, dateEvents]) => (
          <div key={date} className="space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="text-white">{date}</h2>
              <div className="flex-1 h-px bg-zinc-800" />
            </div>

            <div className="space-y-3">
              {dateEvents.map((event, index) => {
                const colors = getPermissionColor(event.permission);
                
                return (
                  <motion.div
                    key={event.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative pl-8 pb-4 ${
                      index !== dateEvents.length - 1 ? 'border-l-2 border-zinc-800 ml-6' : 'ml-6'
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 border-zinc-900 ${
                      event.unusual ? 'bg-orange-500' : colors.split(' ')[1]
                    }`} />

                    {/* Event Card */}
                    <div className={`border rounded-2xl p-4 ${
                      event.unusual 
                        ? 'bg-orange-500/10 border-orange-500/30' 
                        : `bg-zinc-800 border-zinc-700`
                    }`}>
                      <div className="flex items-start gap-3">
                        {/* App Icon */}
                        <div className="w-10 h-10 bg-zinc-700 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                          {event.appIcon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-white">{event.app}</h3>
                            <span className="text-zinc-500 text-xs flex-shrink-0">{event.time}</span>
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            <div className={`px-2 py-1 rounded-lg text-xs border ${colors}`}>
                              <div className="flex items-center gap-1">
                                {getPermissionIcon(event.permission)}
                                <span className="capitalize">{event.permission}</span>
                              </div>
                            </div>
                            {event.unusual && (
                              <div className="px-2 py-1 rounded-lg text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30">
                                <div className="flex items-center gap-1">
                                  <AlertTriangle className="w-3 h-3" />
                                  <span>Unusual</span>
                                </div>
                              </div>
                            )}
                          </div>

                          <p className="text-zinc-400 text-sm">{event.details}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-white mb-2">No events found</h3>
            <p className="text-zinc-500 text-sm">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterChip({ 
  label, 
  icon,
  active, 
  onClick,
  color = 'bg-cyan-500'
}: { 
  label: string;
  icon?: React.ReactNode;
  active: boolean; 
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-2 whitespace-nowrap ${
        active 
          ? `${color} text-white` 
          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({ 
  icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: number;
  color: string;
}) {
  return (
    <div className={`${color} rounded-2xl p-4 text-center border border-zinc-700`}>
      <div className={`flex justify-center mb-2 ${color.split(' ')[0]}`}>
        {icon}
      </div>
      <div className="text-white text-2xl mb-1">{value}</div>
      <p className="text-zinc-400 text-xs">{label}</p>
    </div>
  );
}
