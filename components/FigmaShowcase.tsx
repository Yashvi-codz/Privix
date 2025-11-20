import { OnboardingFlow } from './onboarding/OnboardingFlow';
import { Dashboard } from './home/Dashboard';
import { WeeklyReport } from './analytics/WeeklyReport';
import { QuickFix } from './permissions/QuickFix';
import { AlertsCenter } from './alerts/AlertsCenter';
import { Settings } from './settings/Settings';
import { AppComparison } from './comparison/AppComparison';
import { PermissionTimeline } from './timeline/PermissionTimeline';
import { ScreenshotDetector } from './screenshot/ScreenshotDetector';
import type { Screen } from '../App';

interface FigmaShowcaseProps {
  privacyScore: number;
  navigateTo: (screen: Screen) => void;
  onScoreUpdate: (score: number) => void;
}

export function FigmaShowcase({ privacyScore, navigateTo, onScoreUpdate }: FigmaShowcaseProps) {
  const screens = [
    { 
      id: 'onboarding', 
      title: '1. Onboarding',
      component: <OnboardingFlow onComplete={() => {}} />
    },
    { 
      id: 'home', 
      title: '2. Home Dashboard',
      component: <Dashboard navigateTo={navigateTo} privacyScore={privacyScore} />
    },
    { 
      id: 'screenshot', 
      title: '3. Screenshot Detector',
      component: <ScreenshotDetector navigateTo={navigateTo} />
    },
    { 
      id: 'alerts', 
      title: '4. Alerts Center',
      component: <AlertsCenter navigateTo={navigateTo} />
    },
    { 
      id: 'quickfix', 
      title: '5. Quick Fix',
      component: <QuickFix navigateTo={navigateTo} onScoreUpdate={onScoreUpdate} currentScore={privacyScore} />
    },
    { 
      id: 'report', 
      title: '6. Weekly Report',
      component: <WeeklyReport navigateTo={navigateTo} privacyScore={privacyScore} />
    },
    { 
      id: 'comparison', 
      title: '7. App Comparison',
      component: <AppComparison navigateTo={navigateTo} />
    },
    { 
      id: 'timeline', 
      title: '8. Permission Timeline',
      component: <PermissionTimeline navigateTo={navigateTo} />
    },
    { 
      id: 'settings', 
      title: '9. Settings',
      component: <Settings navigateTo={navigateTo} />
    },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Header */}
      <div className="max-w-[1800px] mx-auto mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl">🛡️</span>
          </div>
          <div>
            <h1 className="text-zinc-900 text-4xl mb-2">Privix - Privacy App Prototype</h1>
            <p className="text-zinc-600 text-lg">Student-First Privacy Management • Complete Screen Set</p>
          </div>
        </div>
        
        <div className="flex gap-4 text-sm">
          <div className="px-4 py-2 bg-pink-100 border border-pink-300 rounded-xl text-pink-600">
            🎨 9 Complete Screens
          </div>
          <div className="px-4 py-2 bg-cyan-100 border border-cyan-300 rounded-xl text-cyan-600">
            📱 Mobile-First Design
          </div>
          <div className="px-4 py-2 bg-purple-100 border border-purple-300 rounded-xl text-purple-600">
            ⚡ Fully Interactive
          </div>
          <div className="px-4 py-2 bg-green-100 border border-green-300 rounded-xl text-green-600">
            🌟 Screenshot Detection
          </div>
        </div>
      </div>

      {/* Screens Grid */}
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {screens.map((screen, index) => (
          <div key={screen.id} className="flex flex-col">
            {/* Screen Label */}
            <div className="mb-4">
              <h2 className="text-white text-xl mb-1">{screen.title}</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full"></div>
            </div>

            {/* Phone Frame */}
            <div className="w-full max-w-[375px] mx-auto bg-zinc-900 rounded-[32px] shadow-2xl overflow-hidden border-4 border-zinc-800 hover:border-cyan-500/50 transition-all hover:scale-105 transform">
              {/* Status Bar */}
              <div className="h-11 bg-zinc-900 flex items-center justify-between px-6 pt-2">
                <span className="text-white text-xs">9:41</span>
                <div className="flex gap-1 items-center">
                  <div className="w-3 h-3 text-white text-xs">📶</div>
                  <div className="w-3 h-3 text-white text-xs">📡</div>
                  <div className="w-5 h-2 bg-white rounded-sm"></div>
                </div>
              </div>

              {/* Screen Content */}
              <div className="h-[667px] overflow-hidden bg-zinc-900">
                <div className="pointer-events-none">
                  {screen.component}
                </div>
              </div>

              {/* Bottom Nav (for main screens) */}
              {!['onboarding'].includes(screen.id) && (
                <div className="h-16 bg-zinc-950 border-t border-zinc-800 flex items-center justify-around px-3">
                  <NavIcon icon="🏠" active={screen.id === 'home'} />
                  <NavIcon icon="🔔" active={screen.id === 'alerts'} badge />
                  <NavIcon icon="📊" active={screen.id === 'report'} />
                  <NavIcon icon="⚙️" active={screen.id === 'settings'} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Design System Info */}
      <div className="max-w-[1800px] mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
          <h3 className="text-white text-xl mb-4">🎨 Color Palette</h3>
          <div className="space-y-3">
            <ColorSwatch color="bg-cyan-400" label="Primary Cyan" />
            <ColorSwatch color="bg-pink-500" label="Accent Pink" />
            <ColorSwatch color="bg-purple-500" label="Secondary Purple" />
            <ColorSwatch color="bg-yellow-400" label="Warning Yellow" />
            <ColorSwatch color="bg-zinc-900" label="Background Dark" />
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
          <h3 className="text-white text-xl mb-4">✨ Key Features</h3>
          <ul className="space-y-2 text-zinc-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Real-time permission monitoring</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Privacy score with animated gauge</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Smart permission revocation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>App comparison & alternatives</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Unusual activity detection</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Night Privacy Mode</span>
            </li>
          </ul>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
          <h3 className="text-white text-xl mb-4">🎯 Design Principles</h3>
          <ul className="space-y-2 text-zinc-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">→</span>
              <span>Student-friendly interface</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">→</span>
              <span>High contrast for accessibility</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">→</span>
              <span>Gamification with points</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">→</span>
              <span>Educational tooltips</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">→</span>
              <span>Smooth micro-animations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">→</span>
              <span>Clear visual hierarchy</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="max-w-[1800px] mx-auto mt-8">
        <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/30 rounded-3xl p-8">
          <h3 className="text-white text-2xl mb-6 text-center">Built With</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <TechBadge label="React" />
            <TechBadge label="TypeScript" />
            <TechBadge label="Tailwind CSS" />
            <TechBadge label="Motion/Framer Motion" />
            <TechBadge label="Recharts" />
            <TechBadge label="Lucide Icons" />
            <TechBadge label="Shadcn/ui" />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavIcon({ icon, active, badge }: { icon: string; active: boolean; badge?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1 relative">
      {badge && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full"></div>
      )}
      <span className="text-lg">{icon}</span>
      <div className={`w-1 h-1 rounded-full ${active ? 'bg-cyan-400' : 'bg-transparent'}`}></div>
    </div>
  );
}

function ColorSwatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 ${color} rounded-xl shadow-lg`}></div>
      <span className="text-zinc-300 text-sm">{label}</span>
    </div>
  );
}

function TechBadge({ label }: { label: string }) {
  return (
    <div className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm">
      {label}
    </div>
  );
}
