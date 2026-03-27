"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";
import { SetupPreferences, generateRecommendation } from "./engine";
import { ExperienceStep, BudgetStep, GoalStep, EnvironmentStep, RecommendationResult } from "./steps";
import { RecommendationResultData } from "./engine";
import { useLocale } from "@/components/i18n-provider";

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
        <div className="mb-8 w-full">
          <div className="flex justify-between mb-2">
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">{t.badge}</span>
            <span className="text-xs font-mono text-muted-foreground">0{currentStep + 1} / 04</span>
          </div>
          <div className="h-1 w-full bg-accent/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-foreground"
              initial={{ width: "25%" }}
              animate={{ width: `${((currentStep + 1) / 4) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
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
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            {currentStep === 0 && (
              <ExperienceStep 
                value={preferences.experience} 
                onChange={(v: any) => updatePreference('experience', v)} 
                t={t.step_experience} 
              />
            )}
            {currentStep === 1 && (
              <BudgetStep 
                value={preferences.budget} 
                onChange={(v: any) => updatePreference('budget', v)} 
                t={t.step_budget} 
              />
            )}
            {currentStep === 2 && (
              <GoalStep 
                value={preferences.goal} 
                onChange={(v: any) => updatePreference('goal', v)} 
                t={t.step_goal} 
              />
            )}
            {currentStep === 3 && (
              <EnvironmentStep 
                value={preferences.environment} 
                onChange={(v: any) => updatePreference('environment', v)} 
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
        <div className="mt-12 flex items-center justify-between border-t border-border/40 pt-6">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            disabled={currentStep === 0}
            className="text-muted-foreground hover:text-foreground"
          >
            {t.back}
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={isNextDisabled()}
            className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8"
          >
            {currentStep === 3 ? t.finish : t.next}
          </Button>
        </div>
      )}
    </div>
  );
}
