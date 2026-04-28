"use client";

import { useCart } from "@/features/cart/hooks/useCart";
import { formatCurrency } from "@/shared/utils/currency";
import { useTranslations, useLocale } from "@/shared/providers/i18n-provider";
import { Card } from "@/shared/components/ui/card";
import { ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import { ShippingMethod } from "../types";
import { cn } from "@/shared/utils/cn";

interface OrderSummaryProps {
  shippingMethod?: ShippingMethod;
}

export function OrderSummary({ shippingMethod }: OrderSummaryProps) {
  const { items, summary } = useCart();
  const t = useTranslations();
  const locale = useLocale();

  // Override shipping cost if pickup is selected
  const displayShipping = shippingMethod === "pickup" ? 0 : summary.shipping;
  const displayTotal = summary.total - (summary.shipping - displayShipping);

  return (
    <Card className="p-6 md:p-8 bg-surface-container-high/40 border-outline/10 backdrop-blur-xl sticky top-32">
      <h3 className="text-title-md font-bold text-text-main mb-6 flex items-center gap-2">
        <ShoppingBag className="text-primary" size={20} />
        {t.cart.summary_title}
      </h3>

      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 mb-6 scrollbar-thin scrollbar-thumb-outline/20">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 items-center">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-surface-dim border border-outline/10 shrink-0">
              <Image 
                src={item.image} 
                alt={item.name} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-text-main truncate">{item.name}</h4>
              <p className="text-[10px] text-text-muted">{t.checkout.qty.replace("{count}", item.quantity.toString())}</p>
            </div>
            <span className="text-xs font-bold text-text-soft">
              {formatCurrency(item.price * item.quantity, locale)}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-3 border-t border-outline/10 pt-6">
        <div className="flex justify-between text-sm">
          <span className="text-text-soft">{t.cart.subtotal}</span>
          <span className="text-text-main">{formatCurrency(summary.subtotal, locale)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-soft">{t.cart.shipping}</span>
          <span className={cn(displayShipping === 0 ? "text-success" : "text-text-main")}>
            {displayShipping === 0 ? t.cart.free : formatCurrency(displayShipping, locale)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-soft">{t.cart.tax}</span>
          <span className="text-text-main">{formatCurrency(summary.tax, locale)}</span>
        </div>
        
        <div className="pt-4 mt-2 border-t border-outline/20 flex justify-between items-end">
          <span className="text-lg font-bold text-text-main">{t.cart.total}</span>
          <div className="text-right">
            <span className="text-2xl font-bold text-primary text-glow block">
              {formatCurrency(displayTotal, locale)}
            </span>
            <p className="text-[9px] text-text-faint uppercase tracking-tighter">IVA Incluido</p>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
          <ShieldCheck size={18} className="text-primary" />
          <p className="text-[11px] text-text-soft leading-tight">
            {t.checkout.secure_payment}
          </p>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-bright/20 border border-outline/10">
          <Truck size={18} className="text-text-muted" />
          <p className="text-[11px] text-text-soft leading-tight">
            {t.checkout.specialized_shipping}
          </p>
        </div>
      </div>
    </Card>
  );
}
