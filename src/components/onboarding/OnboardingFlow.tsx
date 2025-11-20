import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Eye, Lock, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

const screens = [
  {
    icon: Eye,
    title: "Your Apps are Watching",
    description: "Every app on your phone is collecting data about you. Let's see what they know.",
    gradient: "from-pink-500 to-purple-500"
  },
  {
    icon: Shield,
    title: "We Crush Them, You Win",
    description: "Privix analyzes and blocks sneaky permissions, giving you the power back.",
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    icon: Lock,
    title: "Take Back Control",
    description: "Get real-time alerts, revoke permissions instantly, and boost your privacy score.",
    gradient: "from-green-400 to-cyan-500"
  },
  {
    icon: Sparkles,
    title: "You're All Set!",
    description: "Ready to become a privacy champion? Let's scan your apps and get started.",
    gradient: "from-pink-400 to-yellow-400"
  }
];

export function OnboardingFlow({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < screens.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const currentScreen = screens[currentStep];
  const Icon = currentScreen.icon;

  return (
    <div className="h-full flex flex-col items-center justify-between p-8 bg-white">
      {/* Logo */}
      <div className="pt-8">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <span className="text-zinc-900 text-2xl">Privix</span>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="flex-1 flex flex-col items-center justify-center gap-8"
        >
          {/* Icon with gradient background */}
          <div className={`w-32 h-32 bg-gradient-to-br ${currentScreen.gradient} rounded-full flex items-center justify-center shadow-lg`}>
            <Icon className="w-16 h-16 text-white" />
          </div>

          {/* Text Content */}
          <div className="text-center space-y-4 max-w-sm">
            <h1 className="text-zinc-900 text-3xl">{currentScreen.title}</h1>
            <p className="text-zinc-600 text-lg">{currentScreen.description}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Dots & CTA */}
      <div className="w-full space-y-6 pb-8">
        <div className="flex justify-center gap-2">
          {screens.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentStep 
                  ? 'w-8 bg-cyan-500' 
                  : 'w-2 bg-zinc-300'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          className="w-full h-14 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white rounded-2xl text-lg shadow-lg"
        >
          {currentStep === screens.length - 1 ? "Let's Go! 🚀" : "Next"}
        </Button>

        {currentStep < screens.length - 1 && (
          <button
            onClick={onComplete}
            className="w-full text-zinc-500 text-sm hover:text-zinc-700"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
