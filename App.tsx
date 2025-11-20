import { useState } from 'react';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { Dashboard } from './components/home/Dashboard';
import { WeeklyReport } from './components/analytics/WeeklyReport';
import { QuickFix } from './components/permissions/QuickFix';
import { AlertsCenter } from './components/alerts/AlertsCenter';
import { Settings } from './components/settings/Settings';
import { AppComparison } from './components/comparison/AppComparison';
import { PermissionTimeline } from './components/timeline/PermissionTimeline';
import { ScreenshotDetector } from './components/screenshot/ScreenshotDetector';
import { FigmaShowcase } from './components/FigmaShowcase';
import { LayoutGrid, Smartphone } from 'lucide-react';

export type Screen = 'onboarding' | 'home' | 'report' | 'quickfix' | 'alerts' | 'settings' | 'comparison' | 'timeline' | 'screenshot';

export default function App() {
  const [viewMode, setViewMode] = useState<'showcase' | 'interactive'>('showcase');
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [privacyScore, setPrivacyScore] = useState(67);

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    setCurrentScreen('home');
  };

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  if (viewMode === 'showcase') {
    return (
      <div className="min-h-screen bg-white">
        {/* View Toggle */}
        <div className="fixed top-6 right-6 z-50 flex gap-2">
          <button
            onClick={() => setViewMode('showcase')}
            className="px-4 py-2 bg-cyan-500 text-white rounded-xl flex items-center gap-2 shadow-lg"
          >
            <LayoutGrid className="w-4 h-4" />
            Figma View
          </button>
          <button
            onClick={() => setViewMode('interactive')}
            className="px-4 py-2 bg-white border border-zinc-200 text-zinc-900 rounded-xl hover:bg-zinc-50 flex items-center gap-2 shadow-lg"
          >
            <Smartphone className="w-4 h-4" />
            Interactive
          </button>
        </div>
        
        <FigmaShowcase 
          privacyScore={privacyScore}
          navigateTo={navigateTo}
          onScoreUpdate={setPrivacyScore}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      {/* View Toggle */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <button
          onClick={() => setViewMode('showcase')}
          className="px-4 py-2 bg-white border border-zinc-200 text-zinc-900 rounded-xl hover:bg-zinc-50 flex items-center gap-2 shadow-lg"
        >
          <LayoutGrid className="w-4 h-4" />
          Figma View
        </button>
        <button
          onClick={() => setViewMode('interactive')}
          className="px-4 py-2 bg-cyan-500 text-white rounded-xl flex items-center gap-2 shadow-lg"
        >
          <Smartphone className="w-4 h-4" />
          Interactive
        </button>
      </div>

      {/* Mobile Frame */}
      <div className="w-full max-w-md h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative border-4 border-zinc-200">
        {/* Status Bar */}
        <div className="h-11 bg-white flex items-center justify-between px-8 pt-2 border-b border-zinc-100">
          <span className="text-zinc-900 text-sm">9:41</span>
          <div className="flex gap-1 items-center">
            <div className="w-4 h-4 text-zinc-900">📶</div>
            <div className="w-4 h-4 text-zinc-900">📡</div>
            <div className="w-6 h-3 bg-zinc-900 rounded-sm"></div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="h-[calc(100%-44px)] overflow-y-auto bg-white">
          {currentScreen === 'onboarding' && (
            <OnboardingFlow onComplete={handleOnboardingComplete} />
          )}
          {currentScreen === 'home' && (
            <Dashboard 
              navigateTo={navigateTo}
              privacyScore={privacyScore}
            />
          )}
          {currentScreen === 'report' && (
            <WeeklyReport 
              navigateTo={navigateTo}
              privacyScore={privacyScore}
            />
          )}
          {currentScreen === 'quickfix' && (
            <QuickFix 
              navigateTo={navigateTo}
              onScoreUpdate={setPrivacyScore}
              currentScore={privacyScore}
            />
          )}
          {currentScreen === 'alerts' && (
            <AlertsCenter navigateTo={navigateTo} />
          )}
          {currentScreen === 'settings' && (
            <Settings navigateTo={navigateTo} />
          )}
          {currentScreen === 'comparison' && (
            <AppComparison navigateTo={navigateTo} />
          )}
          {currentScreen === 'timeline' && (
            <PermissionTimeline navigateTo={navigateTo} />
          )}
          {currentScreen === 'screenshot' && (
            <ScreenshotDetector navigateTo={navigateTo} />
          )}
        </div>

        {/* Bottom Navigation - Show on main screens */}
        {hasCompletedOnboarding && currentScreen !== 'onboarding' && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-zinc-200 flex items-center justify-around px-4">
            <NavButton 
              icon="🏠" 
              label="Home" 
              active={currentScreen === 'home'}
              onClick={() => navigateTo('home')}
            />
            <NavButton 
              icon="🔔" 
              label="Alerts" 
              active={currentScreen === 'alerts'}
              onClick={() => navigateTo('alerts')}
              badge={3}
            />
            <NavButton 
              icon="📊" 
              label="Report" 
              active={currentScreen === 'report'}
              onClick={() => navigateTo('report')}
            />
            <NavButton 
              icon="⚙️" 
              label="Settings" 
              active={currentScreen === 'settings'}
              onClick={() => navigateTo('settings')}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function NavButton({ 
  icon, 
  label, 
  active, 
  onClick,
  badge 
}: { 
  icon: string; 
  label: string; 
  active: boolean; 
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 relative"
    >
      {badge && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs">
          {badge}
        </div>
      )}
      <span className="text-2xl">{icon}</span>
      <span className={`text-xs ${active ? 'text-cyan-500' : 'text-zinc-400'}`}>
        {label}
      </span>
    </button>
  );
}
