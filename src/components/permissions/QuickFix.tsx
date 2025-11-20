import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Camera, Mic, MapPin, Eye, Users, Calendar, Shield, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import type { Screen } from '../../App';

interface QuickFixProps {
  navigateTo: (screen: Screen) => void;
  onScoreUpdate: (score: number) => void;
  currentScore: number;
}

interface Permission {
  id: string;
  app: string;
  appIcon: string;
  type: 'camera' | 'mic' | 'location' | 'contacts' | 'calendar';
  icon: React.ReactNode;
  label: string;
  enabled: boolean;
  risk: 'critical' | 'high' | 'medium' | 'low';
  reason: string;
}

export function QuickFix({ navigateTo, onScoreUpdate, currentScore }: QuickFixProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: '1',
      app: 'TikTok',
      appIcon: '🎵',
      type: 'camera',
      icon: <Camera className="w-5 h-5" />,
      label: 'Camera Access',
      enabled: true,
      risk: 'critical',
      reason: 'Used 28 times this week, even when app was closed'
    },
    {
      id: '2',
      app: 'TikTok',
      appIcon: '🎵',
      type: 'mic',
      icon: <Mic className="w-5 h-5" />,
      label: 'Microphone Access',
      enabled: true,
      risk: 'critical',
      reason: 'Always listening in background'
    },
    {
      id: '3',
      app: 'Instagram',
      appIcon: '📷',
      type: 'camera',
      icon: <Camera className="w-5 h-5" />,
      label: 'Camera Access',
      enabled: true,
      risk: 'high',
      reason: 'Used at unusual hours (3:24 AM)'
    },
    {
      id: '4',
      app: 'Facebook',
      appIcon: '👥',
      type: 'location',
      icon: <MapPin className="w-5 h-5" />,
      label: 'Location Access',
      enabled: true,
      risk: 'high',
      reason: 'Tracks location even when not using app'
    },
    {
      id: '5',
      app: 'Instagram',
      appIcon: '📷',
      type: 'mic',
      icon: <Mic className="w-5 h-5" />,
      label: 'Microphone Access',
      enabled: true,
      risk: 'high',
      reason: 'Used 23 times this week'
    },
    {
      id: '6',
      app: 'Snapchat',
      appIcon: '👻',
      type: 'contacts',
      icon: <Users className="w-5 h-5" />,
      label: 'Contacts Access',
      enabled: true,
      risk: 'medium',
      reason: 'Syncing all contacts to servers'
    },
  ]);

  const togglePermission = (id: string) => {
    setPermissions(permissions.map(p => 
      p.id === id ? { ...p, enabled: !p.enabled } : p
    ));
  };

  const revokeAll = () => {
    setPermissions(permissions.map(p => ({ ...p, enabled: false })));
    const newScore = Math.min(100, currentScore + 25);
    onScoreUpdate(newScore);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const revokeCritical = () => {
    setPermissions(permissions.map(p => 
      p.risk === 'critical' || p.risk === 'high' ? { ...p, enabled: false } : p
    ));
    const newScore = Math.min(100, currentScore + 18);
    onScoreUpdate(newScore);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' };
      case 'high': return { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' };
      case 'medium': return { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' };
      case 'low': return { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' };
      default: return { bg: 'bg-zinc-500/20', text: 'text-zinc-400', border: 'border-zinc-500/30' };
    }
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
          <h1 className="text-white text-xl">Quick Fix</h1>
          <p className="text-zinc-500 text-sm">{permissions.filter(p => p.enabled).length} permissions to review</p>
        </div>
        <Shield className="w-6 h-6 text-cyan-400" />
      </div>

      <div className="p-6 space-y-6">
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={revokeAll}
            className="h-14 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-2xl"
          >
            Revoke All
          </Button>
          <Button
            onClick={revokeCritical}
            className="h-14 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-2xl"
          >
            Fix Risky Only
          </Button>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-4">
          <div className="flex gap-3">
            <div className="text-xl">💡</div>
            <div>
              <h3 className="text-cyan-400 mb-1">Smart Recommendations</h3>
              <p className="text-zinc-300 text-sm">
                We found {permissions.filter(p => p.enabled && (p.risk === 'critical' || p.risk === 'high')).length} risky permissions that should be revoked for better privacy.
              </p>
            </div>
          </div>
        </div>

        {/* Permissions List */}
        <div className="space-y-3">
          <h2 className="text-white text-lg">Permissions by App</h2>
          
          {permissions.map((permission, index) => {
            const colors = getRiskColor(permission.risk);
            
            return (
              <motion.div
                key={permission.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`border ${colors.border} ${permission.enabled ? colors.bg : 'bg-zinc-800/50'} rounded-2xl p-4`}
              >
                <div className="flex items-start gap-4">
                  {/* App Icon */}
                  <div className="w-12 h-12 bg-zinc-700 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    {permission.appIcon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={colors.text}>{permission.icon}</span>
                          <h3 className="text-white">{permission.app}</h3>
                        </div>
                        <p className="text-zinc-400 text-sm">{permission.label}</p>
                      </div>
                      <Switch
                        checked={permission.enabled}
                        onCheckedChange={() => togglePermission(permission.id)}
                      />
                    </div>

                    <div className="flex items-start gap-2 mt-2">
                      <div className={`px-2 py-1 rounded-full text-xs ${colors.bg} ${colors.text} border ${colors.border}`}>
                        {permission.risk.toUpperCase()}
                      </div>
                    </div>
                    
                    <p className="text-zinc-500 text-xs mt-2">{permission.reason}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-28 left-6 right-6 bg-gradient-to-r from-green-500 to-cyan-500 rounded-2xl p-4 shadow-2xl z-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-green-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-white">Permissions Updated!</h3>
                <p className="text-white/80 text-sm">Your privacy score increased 🎉</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
