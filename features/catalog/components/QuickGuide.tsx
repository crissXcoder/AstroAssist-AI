"use client";

import { motion } from "framer-motion";
import type { ObservationType, RecommendedLevel, SkyCondition } from "@/features/catalog";
import type { UseCatalogFiltersReturn } from "@/features/catalog/hooks/useCatalogFilters";

// ─────────────────────────────────────────────────────────────────────────────
// Sub-selector pill
// ─────────────────────────────────────────────────────────────────────────────

interface PillProps<T extends string> {
  value: T;
  active: T | null;
  label: string;
  icon?: React.ReactNode;
  onClick: (v: T | null) => void;
}

function Pill<T extends string>({ value, active, label, icon, onClick }: PillProps<T>) {
  const isActive = active === value;
  return (
    <button
      onClick={() => onClick(isActive ? null : value)}
      className={`inline-flex items-center gap-2 px-6 h-12 rounded-full text-label-md font-semibold transition-all duration-300 border ${
        isActive
          ? "bg-primary/20 border-primary/40 text-text-main shadow-[0_0_20px_rgba(98,87,244,0.2)]"
          : "bg-surface-container-high border-white/5 text-text-soft hover:bg-surface-bright hover:border-white/10 hover:text-text-main"
      }`}
    >
      {icon && <span className="w-4 h-4 opacity-70">{icon}</span>}
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Goal selector icons (inline SVGs to avoid import issues)
// ─────────────────────────────────────────────────────────────────────────────

const PlanetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <circle cx="12" cy="12" r="6" />
    <ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(-25 12 12)" strokeDasharray="2 2" />
  </svg>
);

const GalaxyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    <path d="M12 12c-3 3-6 3-6 0s3-6 6-6 6 3 6 6-3 6-6 6" />
  </svg>
);

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const CityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <rect x="3" y="9" width="7" height="12" /><rect x="14" y="5" width="7" height="16" />
    <path d="M6 21V12M9 21V12M17 21V8M20 21V8" />
  </svg>
);

const TelescopeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// Context description
// ─────────────────────────────────────────────────────────────────────────────

interface ContextDescProps {
  level: RecommendedLevel | null;
  goal: ObservationType | null;
  sky: SkyCondition | null;
  locale: "en" | "es";
}

function ContextDescription({ level, goal, sky, locale }: ContextDescProps) {
  if (!level && !goal && !sky) return null;

  const levelLabels: Record<RecommendedLevel, Record<"en" | "es", string>> = {
    beginner: { en: "beginners", es: "principiantes" },
    intermediate: { en: "intermediate observers", es: "observadores intermedios" },
    advanced: { en: "advanced users", es: "usuarios avanzados" },
  };
  const goalLabels: Record<ObservationType, Record<"en" | "es", string>> = {
    planetary: { en: "planetary observation", es: "observación planetaria" },
    deep_sky: { en: "deep-sky exploration", es: "exploración de cielo profundo" },
    astrophotography: { en: "astrophotography", es: "astrofotografía" },
    general: { en: "general astronomy", es: "astronomía general" },
  };
  const skyLabels: Record<SkyCondition, Record<"en" | "es", string>> = {
    city: { en: "city skies", es: "cielos urbanos" },
    suburban: { en: "suburban skies", es: "cielos suburbanos" },
    dark_sky: { en: "dark sky sites", es: "sitios de cielo oscuro" },
  };

  const parts: string[] = [];
  if (level) parts.push(locale === "en" ? `for ${levelLabels[level][locale]}` : `para ${levelLabels[level][locale]}`);
  if (goal) parts.push(locale === "en" ? `focused on ${goalLabels[goal][locale]}` : `enfocado en ${goalLabels[goal][locale]}`);
  if (sky) parts.push(locale === "en" ? `from ${skyLabels[sky][locale]}` : `desde ${skyLabels[sky][locale]}`);

  const text = locale === "en"
    ? `Showing equipment ${parts.join(", ")}.`
    : `Mostrando equipos ${parts.join(", ")}.`;

  return (
    <motion.p
      key={text}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-body-sm text-primary font-medium mt-6 text-center"
    >
      {text}
    </motion.p>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// QuickGuide — goal / level / sky selector chips
// ─────────────────────────────────────────────────────────────────────────────

interface QuickGuideProps {
  filters: UseCatalogFiltersReturn["filters"];
  setGoal: UseCatalogFiltersReturn["setGoal"];
  setLevel: UseCatalogFiltersReturn["setLevel"];
  setSky: UseCatalogFiltersReturn["setSky"];
  locale: "en" | "es";
}

export function QuickGuide({ filters, setGoal, setLevel, setSky, locale }: QuickGuideProps) {
  const labels = locale === "en"
    ? {
        goal: "What do you want to observe?",
        level: "What is your experience level?",
        sky: "Where will you observe from?",
        planetary: "Planets & Moon",
        deep_sky: "Deep Sky",
        astrophotography: "Astrophotography",
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
        city: "City",
        suburban: "Suburbs",
        dark_sky: "Dark Sky",
      }
    : {
        goal: "¿Qué deseas observar?",
        level: "¿Cuál es tu nivel de experiencia?",
        sky: "¿Desde dónde observarás?",
        planetary: "Planetas y Luna",
        deep_sky: "Cielo Profundo",
        astrophotography: "Astrofotografía",
        beginner: "Principiante",
        intermediate: "Intermedio",
        advanced: "Avanzado",
        city: "Ciudad",
        suburban: "Suburbios",
        dark_sky: "Cielo Oscuro",
      };

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
      {/* Goal row */}
      <div>
        <p className="text-label-sm text-text-faint mb-3">{labels.goal}</p>
        <div className="flex flex-wrap gap-2">
          <Pill value={"planetary" as ObservationType} active={filters.goal} label={labels.planetary} icon={<PlanetIcon />} onClick={setGoal} />
          <Pill value={"deep_sky" as ObservationType} active={filters.goal} label={labels.deep_sky} icon={<GalaxyIcon />} onClick={setGoal} />
          <Pill value={"astrophotography" as ObservationType} active={filters.goal} label={labels.astrophotography} icon={<CameraIcon />} onClick={setGoal} />
        </div>
      </div>

      {/* Level + Sky row */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1">
          <p className="text-label-sm text-text-faint mb-3">{labels.level}</p>
          <div className="flex flex-wrap gap-2">
            <Pill value={"beginner" as RecommendedLevel} active={filters.level} label={labels.beginner} onClick={setLevel} />
            <Pill value={"intermediate" as RecommendedLevel} active={filters.level} label={labels.intermediate} onClick={setLevel} />
            <Pill value={"advanced" as RecommendedLevel} active={filters.level} label={labels.advanced} onClick={setLevel} />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-label-sm text-text-faint mb-3">{labels.sky}</p>
          <div className="flex flex-wrap gap-2">
            <Pill value={"city" as SkyCondition} active={filters.sky} label={labels.city} icon={<CityIcon />} onClick={setSky} />
            <Pill value={"suburban" as SkyCondition} active={filters.sky} label={labels.suburban} icon={<TelescopeIcon />} onClick={setSky} />
            <Pill value={"dark_sky" as SkyCondition} active={filters.sky} label={labels.dark_sky} onClick={setSky} />
          </div>
        </div>
      </div>

      <ContextDescription level={filters.level} goal={filters.goal} sky={filters.sky} locale={locale} />
    </div>
  );
}
