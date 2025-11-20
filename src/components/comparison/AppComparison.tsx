import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Camera, Mic, MapPin, Eye, Users, Calendar, ArrowRight, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import type { Screen } from '../../App';

interface AppComparisonProps {
  navigateTo: (screen: Screen) => void;
}

const appData = {
  tiktok: {
    name: 'TikTok',
    icon: '🎵',
    score: 32,
    permissions: ['Camera', 'Microphone', 'Location', 'Contacts', 'Photos', 'Calendar', 'Storage'],
    trackers: 12,
    dataShared: ['Location', 'Device ID', 'Contacts', 'Usage Data', 'Browsing History'],
    alternative: 'instagram'
  },
  instagram: {
    name: 'Instagram',
    icon: '📷',
    score: 54,
    permissions: ['Camera', 'Microphone', 'Location', 'Photos', 'Storage'],
    trackers: 8,
    dataShared: ['Location', 'Device ID', 'Usage Data'],
    alternative: null
  },
  whatsapp: {
    name: 'WhatsApp',
    icon: '💬',
    score: 78,
    permissions: ['Camera', 'Microphone', 'Contacts', 'Photos', 'Storage'],
    trackers: 2,
    dataShared: ['Phone Number', 'Device ID'],
    alternative: 'signal'
  },
  signal: {
    name: 'Signal',
    icon: '🔒',
    score: 95,
    permissions: ['Camera', 'Microphone', 'Contacts', 'Photos'],
    trackers: 0,
    dataShared: ['Phone Number (encrypted)'],
    alternative: null
  }
};

type AppKey = keyof typeof appData;

export function AppComparison({ navigateTo }: AppComparisonProps) {
  const [appA, setAppA] = useState<AppKey>('tiktok');
  const [appB, setAppB] = useState<AppKey>('instagram');
  const [showSwitchAnimation, setShowSwitchAnimation] = useState(false);

  const handleSwitch = () => {
    setShowSwitchAnimation(true);
    setTimeout(() => {
      setShowSwitchAnimation(false);
      // In a real app, this would actually switch apps
      navigateTo('home');
    }, 2000);
  };

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
          <h1 className="text-white text-xl">Compare Apps</h1>
          <p className="text-zinc-500 text-sm">Find safer alternatives</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* App Selectors */}
        <div className="grid grid-cols-2 gap-4">
          <AppSelector
            app={appData[appA]}
            label="Current App"
            color="from-red-500/20 to-pink-500/20"
            borderColor="border-red-500/30"
          />
          <AppSelector
            app={appData[appB]}
            label="Alternative"
            color="from-green-500/20 to-cyan-500/20"
            borderColor="border-green-500/30"
          />
        </div>

        {/* Privacy Score Comparison */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-zinc-800 border border-zinc-700 rounded-3xl p-6"
        >
          <h2 className="text-white text-lg mb-6">Privacy Score</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <ScoreCircle score={appData[appA].score} name={appData[appA].name} />
            <ScoreCircle score={appData[appB].score} name={appData[appB].name} />
          </div>

          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-2xl">
            <p className="text-green-400 text-sm text-center">
              ⬆️ Switch to {appData[appB].name} for +{appData[appB].score - appData[appA].score} points
            </p>
          </div>
        </motion.div>

        {/* Permissions Comparison */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-800 border border-zinc-700 rounded-3xl p-6"
        >
          <h2 className="text-white text-lg mb-4">Permissions Requested</h2>
          
          <div className="space-y-3">
            <PermissionRow 
              label="Camera" 
              appA={appData[appA].permissions.includes('Camera')}
              appB={appData[appB].permissions.includes('Camera')}
            />
            <PermissionRow 
              label="Microphone" 
              appA={appData[appA].permissions.includes('Microphone')}
              appB={appData[appB].permissions.includes('Microphone')}
            />
            <PermissionRow 
              label="Location" 
              appA={appData[appA].permissions.includes('Location')}
              appB={appData[appB].permissions.includes('Location')}
            />
            <PermissionRow 
              label="Contacts" 
              appA={appData[appA].permissions.includes('Contacts')}
              appB={appData[appB].permissions.includes('Contacts')}
            />
            <PermissionRow 
              label="Photos" 
              appA={appData[appA].permissions.includes('Photos')}
              appB={appData[appB].permissions.includes('Photos')}
            />
            <PermissionRow 
              label="Calendar" 
              appA={appData[appA].permissions.includes('Calendar')}
              appB={appData[appB].permissions.includes('Calendar')}
            />
            <PermissionRow 
              label="Storage" 
              appA={appData[appA].permissions.includes('Storage')}
              appB={appData[appB].permissions.includes('Storage')}
            />
          </div>

          <div className="mt-4 flex justify-between text-sm">
            <span className="text-zinc-400">{appData[appA].permissions.length} permissions</span>
            <span className="text-zinc-400">{appData[appB].permissions.length} permissions</span>
          </div>
        </motion.div>

        {/* Trackers */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-800 border border-zinc-700 rounded-3xl p-6"
        >
          <h2 className="text-white text-lg mb-4">Known Trackers</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <TrackerCard count={appData[appA].trackers} name={appData[appA].name} />
            <TrackerCard count={appData[appB].trackers} name={appData[appB].name} better />
          </div>

          <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl">
            <div className="flex gap-2">
              <Eye className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <p className="text-cyan-400 text-sm">
                {appData[appB].name} has {appData[appA].trackers - appData[appB].trackers} fewer trackers
              </p>
            </div>
          </div>
        </motion.div>

        {/* Data Shared */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-800 border border-zinc-700 rounded-3xl p-6"
        >
          <h2 className="text-white text-lg mb-4">Data Shared with Third Parties</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <DataList items={appData[appA].dataShared} />
            <DataList items={appData[appB].dataShared} better />
          </div>
        </motion.div>

        {/* Switch Button */}
        <Button
          onClick={handleSwitch}
          className="w-full h-16 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 rounded-2xl text-lg"
        >
          Switch to {appData[appB].name} <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        <p className="text-zinc-500 text-sm text-center">
          Switching apps helps protect your privacy and earns you +15 points
        </p>
      </div>

      {/* Switch Animation Overlay */}
      <AnimatePresence>
        {showSwitchAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-950/95 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 mx-auto mb-6"
              >
                <CheckCircle className="w-24 h-24 text-green-400" />
              </motion.div>
              <h2 className="text-white text-2xl mb-2">Switching Apps...</h2>
              <p className="text-zinc-400">Your privacy score is increasing!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AppSelector({ 
  app, 
  label, 
  color, 
  borderColor 
}: { 
  app: typeof appData[AppKey]; 
  label: string;
  color: string;
  borderColor: string;
}) {
  return (
    <div className={`bg-gradient-to-br ${color} border ${borderColor} rounded-2xl p-4 text-center`}>
      <p className="text-zinc-400 text-xs mb-2">{label}</p>
      <div className="text-4xl mb-2">{app.icon}</div>
      <h3 className="text-white">{app.name}</h3>
    </div>
  );
}

function ScoreCircle({ score, name }: { score: number; name: string }) {
  const getColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="text-center">
      <div className={`text-4xl ${getColor(score)} mb-2`}>{score}</div>
      <div className="text-zinc-400 text-sm">{name}</div>
    </div>
  );
}

function PermissionRow({ label, appA, appB }: { label: string; appA: boolean; appB: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-4 items-center py-2 border-b border-zinc-700 last:border-0">
      <div className="text-center">
        {appA ? <XCircle className="w-5 h-5 text-red-400 mx-auto" /> : <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />}
      </div>
      <div className="text-zinc-300 text-sm text-center">{label}</div>
      <div className="text-center">
        {appB ? <XCircle className="w-5 h-5 text-red-400 mx-auto" /> : <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />}
      </div>
    </div>
  );
}

function TrackerCard({ count, name, better }: { count: number; name: string; better?: boolean }) {
  return (
    <div className={`p-4 rounded-2xl ${better ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
      <div className={`text-3xl mb-2 ${better ? 'text-green-400' : 'text-red-400'}`}>{count}</div>
      <p className="text-zinc-400 text-xs">{name}</p>
    </div>
  );
}

function DataList({ items, better }: { items: string[]; better?: boolean }) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className={`text-xs p-2 rounded-lg ${better ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {item}
        </div>
      ))}
    </div>
  );
}
