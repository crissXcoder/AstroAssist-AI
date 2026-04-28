"use client";

import { useCart } from "../hooks/useCart";
import { useTranslations, useLocale } from "@/shared/providers/i18n-provider";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { QuantitySelector } from "./QuantitySelector";
import { calculateItemSubtotal } from "../utils/cart-logic";
import { Button } from "@/shared/components/ui/button";
import { formatCurrency } from "@/shared/utils/currency";
import { SectionContainer as Section, SectionHeader } from "@/shared/components/ui/section";
import { Card } from "@/shared/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/utils/cn";
import { CartRecommendations } from "./CartRecommendations";

export function CartView() {
  const { 
    items, 
    removeItem, 
    incrementQuantity, 
    decrementQuantity, 
    updateQuantity,
    summary,
    isHydrated
  } = useCart();
  
  const t = useTranslations();
  const locale = useLocale();

  if (!isHydrated) return null;

  return (
    <Section className="pt-32 pb-20 min-h-screen">
      <div className="container px-6 md:px-12 mx-auto">
        <div className="mb-12">
          <Link 
            href={`/${locale}/catalogo`}
            className="inline-flex items-center text-label-md text-text-soft hover:text-primary transition-colors group mb-6"
          >
            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={16} />
            {t.cart.back_to_catalog}
          </Link>
          <SectionHeader
            title={t.cart.title}
            description={items.length > 0 ? t.cart.items_count.replace("{count}", summary.totalItems.toString()) : t.cart.empty_desc}
            align="left"
          />
        </div>

        {items.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center bg-surface-container/30 rounded-3xl border border-outline/10 backdrop-blur-sm"
          >
            <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center mb-8 border border-primary/10 shadow-2xl shadow-primary/5">
              <ShoppingBag size={40} className="text-primary/40" />
            </div>
            <h3 className="text-headline-md font-bold text-text-main mb-4">{t.cart.empty}</h3>
            <p className="text-text-soft mb-10 max-w-md mx-auto">
              {t.cart.empty_desc}
            </p>
            <Button 
              asChild 
              size="lg"
              className="rounded-full bg-primary hover:bg-primary-hover shadow-xl shadow-primary/20 px-10 h-14"
            >
              <Link href={`/${locale}/catalogo`}>
                {t.cart.explore_catalog}
              </Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Items List */}
            <div className="lg:col-span-8 space-y-6">
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="p-6 md:p-8 bg-surface-container/50 border-outline/10 backdrop-blur-md hover:bg-surface-container/70 transition-all duration-300">
                      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        {/* Image */}
                        <div className="relative w-full md:w-40 h-40 rounded-2xl overflow-hidden bg-surface-dim border border-outline/10 shrink-0 shadow-inner">
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between h-full min-w-0 w-full">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <p className="text-label-sm text-primary uppercase tracking-widest mb-1">{item.category}</p>
                              <h3 className="text-title-lg font-bold text-text-main leading-tight mb-2">{item.name}</h3>
                              <p className="text-body-sm text-text-muted line-clamp-2">
                                {t.catalog_page.products[item.id as keyof typeof t.catalog_page.products]?.description || "Equipamiento de precisión diseñado para astrofotografía avanzada."}
                              </p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => removeItem(item.productId)}
                              className="text-text-faint hover:text-error hover:bg-error/5 rounded-full transition-all shrink-0"
                            >
                              <Trash2 size={20} />
                            </Button>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-6 mt-8">
                            <QuantitySelector
                              quantity={item.quantity}
                              onUpdate={(val) => updateQuantity(item.productId, val)}
                              onIncrement={() => incrementQuantity(item.productId)}
                              onDecrement={() => decrementQuantity(item.productId)}
                            />
                            
                            <div className="text-right">
                              <p className="text-label-sm text-text-faint mb-1">{t.cart.item_total}</p>
                              <span className="text-title-lg font-bold text-text-main text-glow">
                                {formatCurrency(calculateItemSubtotal(item.price, item.quantity), locale)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-4 sticky top-32">
              <Card className="p-8 bg-surface-container-high/60 border-primary/20 backdrop-blur-2xl shadow-2xl shadow-primary/5">
                <h3 className="text-title-md font-bold text-text-main mb-8 flex items-center gap-2">
                  {t.cart.summary_title}
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-text-soft">{t.cart.subtotal}</span>
                    <span className="text-text-main font-medium">{formatCurrency(summary.subtotal, locale)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-text-soft">{t.cart.shipping}</span>
                    <span className={cn("font-medium", summary.shipping === 0 ? "text-success" : "text-text-main")}>
                      {summary.shipping === 0 ? t.cart.free : formatCurrency(summary.shipping, locale)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-text-soft">{t.cart.tax}</span>
                    <span className="text-text-main font-medium">{formatCurrency(summary.tax, locale)}</span>
                  </div>
                  
                  <div className="pt-6 mt-4 border-t border-outline/20">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-title-md font-bold text-text-main">{t.cart.total}</span>
                      <span className="text-headline-lg font-bold text-primary text-glow leading-none">
                        {formatCurrency(summary.total, locale)}
                      </span>
                    </div>
                    <p className="text-[10px] text-text-faint text-right uppercase tracking-wider">IVA Incluido • Envío asegurado</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    asChild
                    className="w-full h-16 rounded-full bg-primary hover:bg-primary-hover text-lg font-bold group shadow-xl shadow-primary/20"
                  >
                    <Link href={`/${locale}/checkout`}>
                      <span>{t.cart.checkout}</span>
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
                    </Link>
                  </Button>
                  
                  <div className="grid grid-cols-1 gap-4 pt-8">
                    {[
                      { icon: ShieldCheck, text: t.cta.guarantee },
                      { icon: Truck, text: t.benefits.items[2].title },
                      { icon: RotateCcw, text: "30 días de devolución" }
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-label-sm text-text-muted">
                        <feature.icon size={16} className="text-primary/60" />
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Promo Code Suggestion */}
              <div className="mt-6 p-4 rounded-2xl border border-outline/10 bg-surface-container/20 text-center">
                <p className="text-body-sm text-text-faint">
                  {t.cart.promo_suggestion}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations Section */}
        <CartRecommendations />
      </div>
    </Section>
  );
}
