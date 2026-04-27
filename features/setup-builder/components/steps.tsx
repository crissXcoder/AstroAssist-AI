import { LucideIcon, Telescope, Wallet, Target, Map } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { SectionHeader } from "@/shared/components/ui/section";

interface OptionCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  selected: boolean;
  onClick: () => void;
}

function OptionCard({ title, description, icon: Icon, selected, onClick }: OptionCardProps) {
  return (
    <Card 
      variant="selectable"
      onClick={onClick}
      data-selected={selected}
    >
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
        selected 
          ? "bg-primary text-on-primary scale-110 shadow-lg shadow-primary/20" 
          : "bg-surface-container-high text-text-muted group-hover:text-text-main group-hover:scale-105"
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className={cn("text-title-md font-bold transition-colors", selected ? "text-text-main" : "text-text-soft")}>{title}</h4>
        <p className="text-body-sm text-text-muted mt-2 leading-relaxed">{description}</p>
      </div>
      {/* Radio indicator */}
      <div className={cn(
        "absolute top-6 right-6 w-6 h-6 rounded-full border flex items-center justify-center transition-all",
        selected ? "border-primary bg-primary/20" : "border-white/10"
      )}>
        <div className={cn("w-2.5 h-2.5 rounded-full transition-all duration-300", selected ? "bg-primary scale-100 shadow-[0_0_8px_rgba(98,87,244,0.5)]" : "bg-transparent scale-0")} />
      </div>
    </Card>
  );
}

// Experience Step
export function ExperienceStep({ value, onChange, t }: any) {
  return (
    <div className="flex flex-col space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">
      <SectionHeader 
        title={t.title}
        description={t.subtitle}
        align="left"
        className="mb-0"
        titleClassName="md:text-headline-xl"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OptionCard id="beginner" title={t.beginner} description={t.beginner_desc} icon={Telescope} selected={value === 'beginner'} onClick={() => onChange('beginner')} />
        <OptionCard id="intermediate" title={t.intermediate} description={t.intermediate_desc} icon={Telescope} selected={value === 'intermediate'} onClick={() => onChange('intermediate')} />
        <OptionCard id="advanced" title={t.advanced} description={t.advanced_desc} icon={Telescope} selected={value === 'advanced'} onClick={() => onChange('advanced')} />
      </div>
    </div>
  );
}

// Budget Step
export function BudgetStep({ value, onChange, t }: any) {
  return (
    <div className="flex flex-col space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">
      <SectionHeader 
        title={t.title}
        description={t.subtitle}
        align="left"
        className="mb-0"
        titleClassName="md:text-headline-xl"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OptionCard id="low" title={t.low} description={t.low_desc} icon={Wallet} selected={value === 'low'} onClick={() => onChange('low')} />
        <OptionCard id="medium" title={t.medium} description={t.medium_desc} icon={Wallet} selected={value === 'medium'} onClick={() => onChange('medium')} />
        <OptionCard id="high" title={t.high} description={t.high_desc} icon={Wallet} selected={value === 'high'} onClick={() => onChange('high')} />
      </div>
    </div>
  );
}

// Goal Step
export function GoalStep({ value, onChange, t }: any) {
  return (
    <div className="flex flex-col space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">
      <SectionHeader 
        title={t.title}
        description={t.subtitle}
        align="left"
        className="mb-0"
        titleClassName="md:text-headline-xl"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OptionCard id="planets" title={t.planets} description={t.planets_desc} icon={Target} selected={value === 'planets'} onClick={() => onChange('planets')} />
        <OptionCard id="deepsky" title={t.deepsky} description={t.deepsky_desc} icon={Target} selected={value === 'deepsky'} onClick={() => onChange('deepsky')} />
        <OptionCard id="astrophotography" title={t.astrophotography} description={t.astrophotography_desc} icon={Target} selected={value === 'astrophotography'} onClick={() => onChange('astrophotography')} />
      </div>
    </div>
  );
}

// Environment Step
export function EnvironmentStep({ value, onChange, t }: any) {
  return (
    <div className="flex flex-col space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">
      <SectionHeader 
        title={t.title}
        description={t.subtitle}
        align="left"
        className="mb-0"
        titleClassName="md:text-headline-xl"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OptionCard id="city" title={t.city} description={t.city_desc} icon={Map} selected={value === 'city'} onClick={() => onChange('city')} />
        <OptionCard id="suburban" title={t.suburban} description={t.suburban_desc} icon={Map} selected={value === 'suburban'} onClick={() => onChange('suburban')} />
        <OptionCard id="darksky" title={t.darksky} description={t.darksky_desc} icon={Map} selected={value === 'darksky'} onClick={() => onChange('darksky')} />
      </div>
    </div>
  );
}

// Recommendation Result Step
export function RecommendationResult({ data, onRestart, locale }: { data: any, onRestart: () => void, locale: "en" | "es" }) {
  const reasoning = locale === "en" ? data.reasoningEn : data.reasoningEs;
  const title = locale === "en" ? "Your Perfect Setup" : "Tu Setup Perfecto";
  const restartBtn = locale === "en" ? "Start Over" : "Empezar de Nuevo";
  const mainTitle = locale === "en" ? "Main Equipment" : "Equipo Principal";
  const accTitle = locale === "en" ? "Recommended Accessories" : "Accesorios Recomendados";

  return (
    <div className="flex flex-col space-y-12 animate-in fade-in zoom-in-95 duration-1000 w-full pb-10">
      <SectionHeader 
        title={title}
        description={reasoning}
        align="center"
        className="max-w-3xl mx-auto"
        titleClassName="text-headline-xl md:text-display-lg"
        descriptionClassName="text-body-lg max-w-2xl mx-auto"
        badgeNode={
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8 border border-primary/20 shadow-[0_0_40px_rgba(98,87,244,0.15)]">
            <Telescope className="w-10 h-10" />
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Main Items */}
        <div className="space-y-6">
          <h3 className="text-label-md text-primary flex items-center gap-3">
            <span className="w-8 h-px bg-primary/30" /> {mainTitle}
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {data.mainItems.map((item: any) => (
              <Card key={item.id} variant="compact">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-background shrink-0 relative border border-white/5">
                  <img src={item.images.primary} alt={item.nameEn} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                </div>
                <div>
                  <h4 className="text-title-md font-bold text-text-main tracking-tight">{locale === "en" ? item.nameEn : item.nameEs}</h4>
                  <p className="text-label-sm text-text-faint mt-1 uppercase">{item.category}</p>
                  <p className="text-mono-stat text-primary mt-2">{item.price}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Accessories */}
        {data.accessories.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-label-md text-primary flex items-center gap-3">
              <span className="w-8 h-px bg-primary/30" /> {accTitle}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {data.accessories.map((item: any) => (
                <Card key={item.id} variant="compact">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-background shrink-0 relative border border-white/5">
                    <img src={item.images.primary} alt={item.nameEn} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  </div>
                  <div>
                    <h4 className="text-title-md font-bold text-text-main tracking-tight">{locale === "en" ? item.nameEn : item.nameEs}</h4>
                    <p className="text-label-sm text-text-faint mt-1 uppercase">{item.category}</p>
                    <p className="text-mono-stat text-primary mt-2">{item.price}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center pt-10">
        <Button 
          variant="secondary" 
          onClick={onRestart}
          className="rounded-full px-12 h-14 text-label-md shadow-xl transition-all"
        >
          {restartBtn}
        </Button>
      </div>
    </div>
  );
}
