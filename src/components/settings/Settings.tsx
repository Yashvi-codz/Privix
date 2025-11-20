import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Moon, Shield, Bell, Clock, Users, Info, ChevronRight, Zap, AlertCircle } from 'lucide-react';
import { Switch } from '../ui/switch';
import type { Screen } from '../../App';

interface SettingsProps {
  navigateTo: (screen: Screen) => void;
}

export function Settings({ navigateTo }: SettingsProps) {
  const [nightMode, setNightMode] = useState(false);
  const [fakeDataMode, setFakeDataMode] = useState(false);
  const [autoRevoke, setAutoRevoke] = useState(true);
  const [notifications, setNotifications] = useState(true);

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
          <h1 className="text-white text-xl">Settings</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Privacy Features */}
        <div className="space-y-3">
          <h2 className="text-white text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            Privacy Features
          </h2>

          <SettingCard
            icon={<Moon className="w-5 h-5 text-purple-400" />}
            title="Night Privacy Mode"
            description="Auto-revoke permissions from 11 PM - 7 AM"
            gradient="from-purple-500/20 to-pink-500/20"
            borderColor="border-purple-500/30"
          >
            <Switch checked={nightMode} onCheckedChange={setNightMode} />
          </SettingCard>

          <SettingCard
            icon={<Zap className="w-5 h-5 text-yellow-400" />}
            title="Fake Data Mode"
            description="Send fake data instead of real info"
            gradient="from-yellow-500/20 to-orange-500/20"
            borderColor="border-yellow-500/30"
          >
            <Switch checked={fakeDataMode} onCheckedChange={setFakeDataMode} />
          </SettingCard>

          {fakeDataMode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4"
            >
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div>
                  <h3 className="text-yellow-400 mb-1">Experimental Feature</h3>
                  <p className="text-zinc-300 text-sm">
                    This feature sends randomized data to apps instead of your real information. Some apps may not work correctly.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <SettingCard
            icon={<Shield className="w-5 h-5 text-green-400" />}
            title="Auto-Revoke"
            description="Automatically revoke unused permissions"
            gradient="from-green-500/20 to-cyan-500/20"
            borderColor="border-green-500/30"
          >
            <Switch checked={autoRevoke} onCheckedChange={setAutoRevoke} />
          </SettingCard>
        </div>

        {/* Notification Settings */}
        <div className="space-y-3">
          <h2 className="text-white text-lg flex items-center gap-2">
            <Bell className="w-5 h-5 text-cyan-400" />
            Notifications
          </h2>

          <SettingCard
            icon={<Bell className="w-5 h-5 text-cyan-400" />}
            title="Push Notifications"
            description="Get alerts for suspicious activity"
            gradient="from-cyan-500/20 to-blue-500/20"
            borderColor="border-cyan-500/30"
          >
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </SettingCard>

          <SettingButton
            icon={<Clock className="w-5 h-5 text-blue-400" />}
            title="Notification Schedule"
            description="Customize when you receive alerts"
          />
        </div>

        {/* Permissions */}
        <div className="space-y-3">
          <h2 className="text-white text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            Permissions
          </h2>

          <SettingButton
            icon={<Shield className="w-5 h-5 text-pink-400" />}
            title="Permission Templates"
            description="Preset permission configurations"
          />

          <SettingButton
            icon={<Clock className="w-5 h-5 text-purple-400" />}
            title="Scheduled Permissions"
            description="Auto-enable/disable at certain times"
            onClick={() => navigateTo('timeline')}
          />
        </div>

        {/* About */}
        <div className="space-y-3">
          <h2 className="text-white text-lg flex items-center gap-2">
            <Info className="w-5 h-5 text-cyan-400" />
            About
          </h2>

          <SettingButton
            icon={<Users className="w-5 h-5 text-green-400" />}
            title="Team"
            description="Meet the Privix team"
          />

          <SettingButton
            icon={<Info className="w-5 h-5 text-blue-400" />}
            title="App Info"
            description="Version 1.0.0"
          />

          <SettingButton
            icon={<Shield className="w-5 h-5 text-cyan-400" />}
            title="Privacy Policy"
            description="How we protect your data"
          />
        </div>

        {/* Achievement Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-500/20 border border-pink-500/30 rounded-3xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">🏆</div>
            <div className="flex-1">
              <h3 className="text-white mb-2">Privacy Champion</h3>
              <p className="text-zinc-300 text-sm mb-4">
                You've revoked 47 permissions and earned 320 privacy points this month!
              </p>
              <div className="grid grid-cols-3 gap-4">
                <AchievementBadge emoji="🛡️" label="Protector" />
                <AchievementBadge emoji="🔒" label="Secure" />
                <AchievementBadge emoji="⭐" label="Expert" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
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
        <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white mb-1">{title}</h3>
          <p className="text-zinc-400 text-sm">{description}</p>
        </div>
        <div className="flex-shrink-0">
          {children}
        </div>
      </div>
    </div>
  );
}

function SettingButton({
  icon,
  title,
  description,
  onClick
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-4 hover:bg-zinc-750 transition-colors text-left"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-zinc-700 rounded-xl flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white mb-1">{title}</h3>
          <p className="text-zinc-400 text-sm">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-zinc-600 flex-shrink-0" />
      </div>
    </button>
  );
}

function AchievementBadge({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div className="bg-zinc-800/50 rounded-xl p-3 text-center">
      <div className="text-2xl mb-1">{emoji}</div>
      <p className="text-zinc-400 text-xs">{label}</p>
    </div>
  );
}
