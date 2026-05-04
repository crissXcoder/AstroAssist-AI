"use client";

import { useCart } from "../hooks/useCart";
import { useTranslations, useLocale } from "@/shared/providers/i18n-provider";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { QuantitySelector } from "./QuantitySelector";
import { Button } from "@/shared/components/ui/button";
import { formatCurrency } from "@/shared/utils/currency";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/utils/cn";

export function CartDrawer() {
  const { 
    items, 
    isOpen, 
    setOpen, 
    removeItem, 
    incrementQuantity, 
    decrementQuantity, 
    updateQuantity,
    summary,
    clearCart
  } = useCart();
  
  const t = useTranslations();
  const locale = useLocale();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-100 bg-background/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-110 w-full max-w-md bg-surface-container border-l border-outline/20 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-outline/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-primary" size={24} />
                <h2 className="text-title-md font-bold text-text-main">{t.cart.title}</h2>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">
                  {summary.totalItems}
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="rounded-full">
                <X size={20} />
              </Button>
            </div>

            {/* Content */}
            <ScrollArea className="flex-1">
              <div className="p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 rounded-full bg-surface-bright/50 flex items-center justify-center mb-6 border border-outline/10">
                      <ShoppingBag size={32} className="text-text-faint" />
                    </div>
                    <p className="text-text-soft mb-8 max-w-[200px]">{t.cart.empty}</p>
                    <Button 
                      asChild 
                      onClick={() => setOpen(false)}
                      className="rounded-full bg-primary hover:bg-primary-hover"
                    >
                      <Link href={`/${locale}/catalogo`}>
                        {t.cart.back_to_catalog}
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <motion.div 
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-4 p-4 rounded-2xl bg-surface-bright/30 border border-outline/10 group"
                      >
                        {/* Image */}
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-surface-dim border border-outline/10 shrink-0">
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill 
                            className="object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <h4 className="text-sm font-semibold text-text-main truncate">{item.name}</h4>
                              <p className="text-[10px] text-text-muted uppercase tracking-wider">{item.category}</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon-sm" 
                              onClick={() => removeItem(item.productId)}
                              className="text-text-faint hover:text-error transition-colors"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-bold text-primary">
                              {formatCurrency(item.price, locale)}
                            </span>
                            
                            <QuantitySelector
                              quantity={item.quantity}
                              onUpdate={(val) => updateQuantity(item.productId, val)}
                              onIncrement={() => incrementQuantity(item.productId)}
                              onDecrement={() => decrementQuantity(item.productId)}
                              variant="compact"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="p-6 bg-surface-container-high/80 backdrop-blur-xl border-t border-outline/20 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-soft">{t.cart.subtotal}</span>
                    <span className="text-text-main">{formatCurrency(summary.subtotal, locale)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-soft">{t.cart.shipping}</span>
                    <span className={cn(summary.shipping === 0 ? "text-success font-medium" : "text-text-main")}>
                      {summary.shipping === 0 ? t.cart.free : formatCurrency(summary.shipping, locale)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-soft">{t.cart.tax}</span>
                    <span className="text-text-main">{formatCurrency(summary.tax, locale)}</span>
                  </div>
                  <div className="pt-2 mt-2 border-t border-outline/20 flex justify-between items-center">
                    <span className="text-lg font-bold text-text-main">{t.cart.total}</span>
                    <span className="text-2xl font-bold text-primary text-glow">
                      {formatCurrency(summary.total, locale)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button 
                    asChild
                    className="w-full h-14 rounded-full bg-primary hover:bg-primary-hover text-lg font-bold group shadow-lg shadow-primary/20"
                    onClick={() => setOpen(false)}
                  >
                    <Link href={`/${locale}/checkout`}>
                      <span>{t.cart.checkout}</span>
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    asChild
                    className="w-full h-12 rounded-full border-outline/20 hover:bg-surface-bright/50"
                    onClick={() => setOpen(false)}
                  >
                    <Link href={`/${locale}/cart`}>
                      Ver carrito completo
                    </Link>
                  </Button>

                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      if (confirm(t.cart.clear_confirm || "¿Vaciar carrito?")) {
                        clearCart();
                      }
                    }}
                    className="text-text-faint hover:text-error transition-colors mt-2"
                  >
                    {t.cart.clear}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
