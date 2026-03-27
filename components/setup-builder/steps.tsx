import { LucideIcon, Telescope, Wallet, Target, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

// Recommendation Result Step
export function RecommendationResult({ data, onRestart, locale }: { data: any, onRestart: () => void, locale: "en" | "es" }) {
  const reasoning = locale === "en" ? data.reasoningEn : data.reasoningEs;
  const title = locale === "en" ? "Your Perfect Setup" : "Tu Setup Perfecto";
  const restartBtn = locale === "en" ? "Start Over" : "Empezar de Nuevo";
  const mainTitle = locale === "en" ? "Main Equipment" : "Equipo Principal";
  const accTitle = locale === "en" ? "Recommended Accessories" : "Accesorios Recomendados";

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in zoom-in-95 duration-700 w-full pb-10">
      <div className="text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-6 border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
          <Telescope className="w-8 h-8" />
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">{title}</h2>
        <p className="text-lg text-neutral-400 font-light leading-relaxed">{reasoning}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Items */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-2">
            <span className="w-8 h-px bg-indigo-500/30" /> {mainTitle}
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {data.mainItems.map((item: any) => (
              <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/3 border border-white/5 hover:bg-white/5 transition-colors group">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-black shrink-0 relative border border-white/5">
                  <img src={item.images.primary} alt={item.nameEn} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <h4 className="font-bold text-white tracking-tight">{locale === "en" ? item.nameEn : item.nameEs}</h4>
                  <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mt-0.5">{item.category}</p>
                  <p className="text-sm font-mono text-indigo-300 font-bold mt-1">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accessories */}
        {data.accessories.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-2">
              <span className="w-8 h-px bg-indigo-500/30" /> {accTitle}
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {data.accessories.map((item: any) => (
                <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/3 border border-white/5 hover:bg-white/5 transition-colors group">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-black shrink-0 relative border border-white/5">
                    <img src={item.images.primary} alt={item.nameEn} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white tracking-tight">{locale === "en" ? item.nameEn : item.nameEs}</h4>
                    <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mt-0.5">{item.category}</p>
                    <p className="text-sm font-mono text-indigo-300 font-bold mt-1">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center pt-8">
        <Button 
          variant="outline" 
          onClick={onRestart}
          className="rounded-xl border-white/10 hover:bg-white/5 text-neutral-400 hover:text-white px-8 h-12 transition-all"
        >
          {restartBtn}
        </Button>
      </div>
    </div>
  );
}
