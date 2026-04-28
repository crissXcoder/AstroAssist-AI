"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { useTranslations } from "@/shared/providers/i18n-provider";
import { CheckoutStep } from "./types";
import { ArrowRight, ArrowLeft, CreditCard, Wallet, Truck, Landmark } from "lucide-react";
import { cn } from "@/shared/utils/cn";

/**
 * Props for the CheckoutForm component
 */
interface CheckoutFormProps {
  /** Current step in the checkout process */
  step: CheckoutStep;
  /** Callback to advance to the next step */
  onNext: () => void;
  /** Callback to return to the previous step */
  onPrev: () => void;
}

/**
 * CheckoutForm Component
 * 
 * Handles user input for shipping and payment steps of the checkout process.
 * Features a cosmic-premium aesthetic with glassmorphism and smooth transitions.
 */
export function CheckoutForm({ step, onNext, onPrev }: CheckoutFormProps) {
  const t = useTranslations();
  
  // Local state for form data management
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiry: "",
    cvc: ""
  });

  /**
   * Handle input changes and update local state
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would perform validation here
    onNext();
  };

  return (
    <Card className="p-8 md:p-12 bg-surface-container/50 border-outline/10 backdrop-blur-md relative overflow-hidden group">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />
      
      <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
        {/* SHIPPING STEP */}
        {step === "shipping" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Truck className="text-primary" size={20} />
              </div>
              <h3 className="text-headline-md font-bold text-text-main">{t.checkout.shipping}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-label-sm text-text-muted uppercase tracking-wider">{t.checkout.full_name}</label>
                <Input 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  placeholder={t.checkout.full_name}
                  className="bg-background/40 border-outline/10 focus:border-primary/50 h-12 rounded-xl"
                  required
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-label-sm text-text-muted uppercase tracking-wider">{t.checkout.email}</label>
                <Input 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="commander@astroassist.ai"
                  className="bg-background/40 border-outline/10 focus:border-primary/50 h-12 rounded-xl"
                  required
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-label-sm text-text-muted uppercase tracking-wider">{t.checkout.address}</label>
                <Input 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  placeholder={t.checkout.address}
                  className="bg-background/40 border-outline/10 focus:border-primary/50 h-12 rounded-xl"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-label-sm text-text-muted uppercase tracking-wider">{t.checkout.city}</label>
                <Input 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  placeholder={t.checkout.city}
                  className="bg-background/40 border-outline/10 focus:border-primary/50 h-12 rounded-xl"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-label-sm text-text-muted uppercase tracking-wider">{t.checkout.zip_code}</label>
                <Input 
                  name="zipCode" 
                  value={formData.zipCode} 
                  onChange={handleChange} 
                  placeholder={t.checkout.zip_code}
                  className="bg-background/40 border-outline/10 focus:border-primary/50 h-12 rounded-xl"
                  required
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* PAYMENT STEP */}
        {step === "payment" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20">
                <CreditCard className="text-secondary" size={20} />
              </div>
              <h3 className="text-headline-md font-bold text-text-main">{t.checkout.payment}</h3>
            </div>
            
            {/* Payment Method Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <button 
                type="button"
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-primary bg-primary/10 text-primary transition-all shadow-lg shadow-primary/10"
              >
                <CreditCard size={24} />
                <span className="text-label-sm font-bold uppercase tracking-widest">{t.checkout.credit_card}</span>
              </button>
              <button 
                type="button"
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-outline/5 bg-surface-bright/10 text-text-muted hover:border-outline/20 hover:text-text-soft transition-all"
              >
                <Wallet size={24} />
                <span className="text-label-sm font-bold uppercase tracking-widest">PayPal</span>
              </button>
              <button 
                type="button"
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-outline/5 bg-surface-bright/10 text-text-muted hover:border-outline/20 hover:text-text-soft transition-all"
              >
                <Landmark size={24} />
                <span className="text-label-sm font-bold uppercase tracking-widest">Transfer</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-label-sm text-text-muted uppercase tracking-wider">{t.checkout.card_number}</label>
                <div className="relative">
                  <Input 
                    name="cardNumber" 
                    value={formData.cardNumber} 
                    onChange={handleChange} 
                    placeholder="0000 0000 0000 0000"
                    className="bg-background/40 border-outline/10 focus:border-primary/50 h-12 rounded-xl pl-12 font-mono tracking-widest"
                    required
                  />
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-text-faint" size={18} />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-label-sm text-text-muted uppercase tracking-wider">{t.checkout.expiry}</label>
                <Input 
                  name="expiry" 
                  value={formData.expiry} 
                  onChange={handleChange} 
                  placeholder="MM/YY"
                  className="bg-background/40 border-outline/10 focus:border-primary/50 h-12 rounded-xl font-mono text-center"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-label-sm text-text-muted uppercase tracking-wider">{t.checkout.cvc}</label>
                <Input 
                  name="cvc" 
                  type="password"
                  maxLength={4}
                  value={formData.cvc} 
                  onChange={handleChange} 
                  placeholder="000"
                  className="bg-background/40 border-outline/10 focus:border-primary/50 h-12 rounded-xl font-mono text-center"
                  required
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* ACTIONS */}
        <div className="flex items-center justify-between pt-10 border-t border-outline/10">
          {step === "payment" ? (
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onPrev}
              className="h-14 px-8 text-text-soft hover:text-text-main group rounded-2xl"
            >
              <ArrowLeft className="mr-3 group-hover:-translate-x-1 transition-transform" size={20} />
              <span className="font-bold uppercase tracking-widest text-label-md">{t.checkout.back}</span>
            </Button>
          ) : (
            <div />
          )}
          
          <Button 
            type="submit" 
            size="lg"
            className="h-14 px-10 rounded-2xl bg-primary hover:bg-primary-hover group shadow-xl shadow-primary/20"
          >
            <span className="font-bold uppercase tracking-widest text-label-md">
              {step === "shipping" ? t.checkout.continue : t.checkout.place_order}
            </span>
            <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
        </div>
      </form>
    </Card>
  );
}
