"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "@/shared/providers/i18n-provider";
import { Button } from "@/shared/components/ui/button";
import { SetupPreferences, generateRecommendation } from "../services/engine";
import { ExperienceStep, BudgetStep, GoalStep, EnvironmentStep, RecommendationResult } from "./steps";
import { RecommendationResultData } from "../services/engine";
import { useLocale } from "@/shared/providers/i18n-provider";

const STEPS = ["experience", "budget", "goal", "environment", "result"];

export function SetupBuilder() {
  const t = useTranslations().setup_builder;
  const locale = useLocale() as "en" | "es";
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<SetupPreferences>({
    experience: null,
    budget: null,
    goal: null,
    environment: null
  });

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(s => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1);
    }
  };

  const updatePreference = <K extends keyof SetupPreferences>(key: K, value: SetupPreferences[K]) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const isNextDisabled = () => {
    switch (currentStep) {
      case 0: return !preferences.experience;
      case 1: return !preferences.budget;
      case 2: return !preferences.goal;
      case 3: return !preferences.environment;
      default: return false;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col min-h-[600px] bg-background">
      
      {/* Progress Bar */}
      {currentStep < 4 && (
        <div className="mb-12 w-full">
          <div className="flex justify-between mb-3">
            <span className="text-label-sm text-text-muted">{t.badge}</span>
            <span className="text-mono-stat text-text-faint">0{currentStep + 1} / 04</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary shadow-[0_0_10px_rgba(98,87,244,0.3)]"
              initial={{ width: "25%" }}
              animate={{ width: `${((currentStep + 1) / 4) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            {currentStep === 0 && (
              <ExperienceStep 
                value={preferences.experience} 
                onChange={(v) => updatePreference('experience', v)} 
                t={t.step_experience} 
              />
            )}
            {currentStep === 1 && (
              <BudgetStep 
                value={preferences.budget} 
                onChange={(v) => updatePreference('budget', v)} 
                t={t.step_budget} 
              />
            )}
            {currentStep === 2 && (
              <GoalStep 
                value={preferences.goal} 
                onChange={(v) => updatePreference('goal', v)} 
                t={t.step_goal} 
              />
            )}
            {currentStep === 3 && (
              <EnvironmentStep 
                value={preferences.environment} 
                onChange={(v) => updatePreference('environment', v)} 
                t={t.step_environment} 
              />
            )}
            {currentStep === 4 && (
              <RecommendationResult 
                data={generateRecommendation(preferences)} 
                locale={locale}
                onRestart={() => {
                  setPreferences({ experience: null, budget: null, goal: null, environment: null });
                  setCurrentStep(0);
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      {currentStep < 4 && (
        <div className="mt-16 flex items-center justify-between border-t border-white/5 pt-8">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            disabled={currentStep === 0}
            className="text-text-muted hover:text-text-main"
          >
            {t.back}
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={isNextDisabled()}
            className="bg-primary text-on-primary hover:bg-primary-hover rounded-full px-10 h-12 shadow-lg shadow-primary/20"
          >
            {currentStep === 3 ? t.finish : t.next}
          </Button>
        </div>
      )}
    </div>
  );
}
