"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/features/cart/hooks/useCart";
import { useTranslations, useLocale } from "@/shared/providers/i18n-provider";
import { SectionContainer as Section, SectionHeader } from "@/shared/components/ui/section";
import { Button } from "@/shared/components/ui/button";
import { OrderSummary } from "./OrderSummary";
import { CheckoutForm } from "./CheckoutForm";
import { ShoppingBag, ArrowLeft, Truck, CreditCard } from "lucide-react";
import Link from "next/link";
import { cn } from "@/shared/utils/cn";

import { CheckoutStep, CheckoutDraft, CheckoutData } from "../types";
import { saveOrder } from "../utils/order-utils";

export function CheckoutView() {
  const [step, setStep] = useState<CheckoutStep>("shipping");
  const [checkoutData, setCheckoutData] = useState<Partial<CheckoutDraft>>({
    shippingMethod: "standard",
    paymentMethod: "credit_card"
  });

  const router = useRouter();
  const { items, summary, clearCart } = useCart();
  const t = useTranslations();
  const locale = useLocale();

  const handleNextStep = (data?: CheckoutData) => {
    if (step === "shipping") {
      setCheckoutData(prev => ({ ...prev, ...data }));
      setStep("payment");
    }
    else if (step === "payment") {
      // Create final draft
      const finalDraft: CheckoutDraft = {
        shippingAddress: data?.shippingAddress || checkoutData.shippingAddress || null,
        paymentMethod: data?.paymentMethod || checkoutData.paymentMethod || "credit_card",
        shippingMethod: data?.shippingMethod || checkoutData.shippingMethod || "standard",
        items,
        summary
      };

      // Save order to localStorage
      const order = saveOrder(finalDraft);
      
      // Clear cart immediately before redirect
      clearCart();
      
      // Redirect to confirmation page
      router.push(`/${locale}/checkout/confirmation?orderId=${order.id}`);
    }
  };

  const handlePrevStep = () => {
    if (step === "payment") setStep("shipping");
  };

  if (items.length === 0) {
    return (
      <Section className="pt-32 pb-20 min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-surface-bright/50 flex items-center justify-center mb-6">
          <ShoppingBag size={32} className="text-text-faint" />
        </div>
        <h2 className="text-title-lg font-bold text-text-main mb-4">{t.cart.empty}</h2>
        <Button asChild>
          <Link href={`/${locale}/catalogo`}>{t.cart.explore_catalog}</Link>
        </Button>
      </Section>
    );
  }

  return (
    <Section className="pt-32 pb-20 min-h-screen">
      <div className="container px-6 md:px-12 mx-auto">
        <div className="mb-12">
            <Link 
              href={`/${locale}/cart`}
              className="inline-flex items-center text-label-sm text-text-soft hover:text-primary transition-colors group mb-6"
            >
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={14} />
              {t.checkout.back_to_cart}
            </Link>
            <SectionHeader
              title={t.checkout.title}
              description={t.checkout.subtitle}
              align="left"
            />
            
            {/* Stepper */}
            <div className="flex items-center gap-4 mt-8">
              <div className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full border transition-all",
                step === "shipping" ? "bg-primary/10 border-primary text-primary" : "bg-surface-bright/30 border-outline/10 text-text-muted"
              )}>
                <Truck size={16} />
                <span className="text-label-sm">{t.checkout.shipping_step}</span>
              </div>
              <div className="w-8 h-px bg-outline/20" />
              <div className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full border transition-all",
                step === "payment" ? "bg-primary/10 border-primary text-primary" : "bg-surface-bright/30 border-outline/10 text-text-muted"
              )}>
                <CreditCard size={16} />
                <span className="text-label-sm">{t.checkout.payment_step}</span>
              </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <CheckoutForm 
                  step={step} 
                  onNext={handleNextStep} 
                  onPrev={handlePrevStep} 
                  shippingMethod={checkoutData.shippingMethod || "standard"}
                  setShippingMethod={(method) => setCheckoutData(prev => ({ ...prev, shippingMethod: method }))}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <OrderSummary shippingMethod={checkoutData.shippingMethod} />
          </div>
        </div>
      </div>
    </Section>
  );
}
