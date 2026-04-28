"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/shared/providers/i18n-provider";
import { Product } from "../../types";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { 
  ShoppingCart, 
  ShieldCheck, 
  Zap, 
  MessageSquareText,
  Star,
  Check,
  Telescope
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/shared/utils/cn";

interface ProductInfoProps {
  product: Product;
  locale: string;
}

export function ProductInfo({ product, locale }: ProductInfoProps) {
  const t = useTranslations();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const name = locale === "es" ? product.nameEs : product.nameEn;
  const description = locale === "es" ? product.descriptionEs : product.descriptionEn;

  const handleAddToCart = () => {
    setIsAdding(true);
    // Simulate API call
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 3000);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header Info */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2"
        >
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 backdrop-blur-sm">
            {product.category.toUpperCase()}
          </Badge>
          {product.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-surface-bright/50 border-outline/30">
              {tag}
            </Badge>
          ))}
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-text-main"
        >
          {name}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-baseline gap-4"
        >
          <span className="text-3xl font-bold text-primary">{product.price}</span>
          <div className="flex items-center gap-1 text-accent">
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <span className="text-sm text-text-muted ml-2">(4.9/5 Stellar Reviews)</span>
          </div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-text-soft leading-relaxed max-w-xl"
        >
          {description}
        </motion.p>
      </div>

      {/* Quick Specs Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="grid grid-cols-2 gap-4"
      >
        <div className="flex items-center gap-3 text-sm text-text-soft">
          <div className="w-8 h-8 rounded-lg bg-surface-bright flex items-center justify-center text-primary">
            <Telescope size={16} />
          </div>
          <span>{t.product_detail.levels[product.recommendedLevel]}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-text-soft">
          <div className="w-8 h-8 rounded-lg bg-surface-bright flex items-center justify-center text-primary">
            <Zap size={16} />
          </div>
          <span>{t.product_detail.goals[product.observationType]}</span>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button 
          size="lg" 
          className={cn(
            "h-14 px-8 rounded-full text-lg font-semibold transition-all duration-500 relative overflow-hidden group",
            isAdded ? "bg-success hover:bg-success" : "bg-primary hover:bg-primary-hover"
          )}
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          <div className="flex items-center gap-2 relative z-10">
            {isAdding ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isAdded ? (
              <Check size={20} />
            ) : (
              <ShoppingCart size={20} />
            )}
            <span>
              {isAdding 
                ? t.product_detail.adding 
                : isAdded 
                  ? t.product_detail.added 
                  : t.product_detail.add_to_cart
              }
            </span>
          </div>
          {/* Button Shine Effect */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
        </Button>

        <Button 
          variant="outline" 
          size="lg" 
          className="h-14 px-8 rounded-full text-lg border-outline/30 hover:bg-surface-bright/50 backdrop-blur-md"
        >
          <MessageSquareText size={20} className="mr-2 text-primary" />
          {t.product_detail.ai_assistant}
        </Button>
      </motion.div>

      {/* Trust & Confidence Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-outline/30"
      >
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface-container-high/40 border border-outline/20">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="font-semibold text-text-main text-sm">{t.product_detail.secure_checkout}</h4>
            <p className="text-xs text-text-muted">{t.product_detail.secure_desc}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface-container-high/40 border border-outline/20">
          <div className="p-2 rounded-xl bg-accent/10 text-accent">
            <Zap size={24} />
          </div>
          <div>
            <h4 className="font-semibold text-text-main text-sm">{t.product_detail.ai_assistant}</h4>
            <p className="text-xs text-text-muted">{t.product_detail.ai_desc}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
