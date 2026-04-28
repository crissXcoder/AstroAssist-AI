"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/shared/providers/i18n-provider";
import { Product } from "../../types";
import { 
  Telescope, 
  Settings2, 
  Layers, 
  Maximize, 
  Weight, 
  Focus,
  CheckCircle2
} from "lucide-react";

interface ProductSpecsProps {
  product: Product;
  locale: string;
}

export function ProductSpecs({ product, locale }: ProductSpecsProps) {
  const t = useTranslations();

  const specs = [
    { 
      icon: <Telescope size={20} />, 
      label: t.product_detail.recommended_level, 
      value: t.product_detail.levels[product.recommendedLevel] 
    },
    { 
      icon: <Settings2 size={20} />, 
      label: t.product_detail.observation_type, 
      value: t.product_detail.goals[product.observationType] 
    },
    { 
      icon: <Layers size={20} />, 
      label: t.product_detail.sky_condition, 
      value: t.product_detail.sky[product.skyCondition] 
    },
    { 
      icon: <Maximize size={20} />, 
      label: t.product_detail.portability, 
      value: product.portability.toUpperCase() 
    },
    { 
      icon: <Weight size={20} />, 
      label: t.product_detail.complexity, 
      value: product.setupComplexity.toUpperCase() 
    },
    { 
      icon: <Focus size={20} />, 
      label: "Categoría", 
      value: product.category 
    },
  ];

  return (
    <div className="space-y-16">
      {/* Advantages & Ideal Use Cases Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Advantages */}
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-text-main flex items-center gap-2">
              <CheckCircle2 className="text-success" size={24} />
              {t.product_detail.advantages}
            </h3>
            <div className="h-1 w-12 bg-success/40 rounded-full" />
          </div>
          <ul className="space-y-4">
            {product.advantages.map((adv, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-3 text-text-soft"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
                {adv}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Use Cases */}
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-text-main flex items-center gap-2">
              <Focus className="text-primary" size={24} />
              {t.product_detail.ideal_use}
            </h3>
            <div className="h-1 w-12 bg-primary/40 rounded-full" />
          </div>
          <ul className="space-y-4">
            {product.idealUseCases.map((use, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-3 text-text-soft"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {use}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-text-main">{t.product_detail.specifications}</h2>
          <div className="h-1 w-20 bg-linear-to-r from-primary to-secondary rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specs.map((spec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-start gap-4 p-5 rounded-2xl bg-surface-container/50 border border-outline/20 hover:border-primary/30 transition-colors group"
            >
              <div className="p-3 rounded-xl bg-surface-bright text-text-muted group-hover:text-primary transition-colors">
                {spec.icon}
              </div>
              <div>
                <p className="text-sm text-text-muted font-medium mb-1">{spec.label}</p>
                <p className="text-text-main font-semibold">{spec.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
