import { LucideIcon, Telescope, Wallet, Target, Map } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div 
      onClick={onClick}
      className={cn(
        "relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 group flex flex-col gap-3",
        selected 
          ? "border-foreground bg-accent/10 shadow-[0_10px_40px_rgba(0,0,0,0.1)]" 
          : "border-border/50 bg-background hover:border-foreground/40 hover:bg-accent/5"
      )}
    >
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
        selected ? "bg-foreground text-background" : "bg-accent/20 text-muted-foreground group-hover:text-foreground"
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className={cn("text-lg font-medium", selected ? "text-foreground" : "text-foreground/80")}>{title}</h4>
        <p className="text-sm font-light text-muted-foreground mt-1">{description}</p>
      </div>
      {/* Radio indicator */}
      <div className="absolute top-6 right-6 w-5 h-5 rounded-full border flex items-center justify-center">
        <div className={cn("w-2.5 h-2.5 rounded-full transition-all", selected ? "bg-foreground scale-100" : "bg-transparent scale-0")} />
      </div>
    </div>
  );
}

// Experience Step
export function ExperienceStep({ value, onChange, t }: any) {
  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500 w-full">
      <div>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-4">{t.title}</h2>
        <p className="text-lg text-muted-foreground font-light">{t.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500 w-full">
      <div>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-4">{t.title}</h2>
        <p className="text-lg text-muted-foreground font-light">{t.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500 w-full">
      <div>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-4">{t.title}</h2>
        <p className="text-lg text-muted-foreground font-light">{t.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500 w-full">
      <div>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-4">{t.title}</h2>
        <p className="text-lg text-muted-foreground font-light">{t.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <OptionCard id="city" title={t.city} description={t.city_desc} icon={Map} selected={value === 'city'} onClick={() => onChange('city')} />
        <OptionCard id="suburban" title={t.suburban} description={t.suburban_desc} icon={Map} selected={value === 'suburban'} onClick={() => onChange('suburban')} />
        <OptionCard id="darksky" title={t.darksky} description={t.darksky_desc} icon={Map} selected={value === 'darksky'} onClick={() => onChange('darksky')} />
      </div>
    </div>
  );
}
