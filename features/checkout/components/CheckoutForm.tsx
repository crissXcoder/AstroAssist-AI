"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { useTranslations } from "@/shared/providers/i18n-provider";
import { CheckoutStep, PaymentMethod, ShippingMethod, CheckoutData } from "../types";
import { 
  ArrowRight, 
  ArrowLeft, 
  CreditCard, 
  Wallet, 
  Truck, 
  Landmark, 
  Phone, 
  Globe, 
  FileText,
  Check,
  Loader2
} from "lucide-react";
import { cn } from "@/shared/utils/cn";

/**
 * Props for the CheckoutForm component
 */
interface CheckoutFormProps {
  step: CheckoutStep;
  onNext: (data: CheckoutData) => void;
  onPrev: () => void;
  shippingMethod: ShippingMethod;
  setShippingMethod: (method: ShippingMethod) => void;
}

export function CheckoutForm({ step, onNext, onPrev, shippingMethod, setShippingMethod }: CheckoutFormProps) {
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Local state for form data management
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    notes: "",
    cardNumber: "",
    expiry: "",
    cvc: ""
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit_card");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  /**
   * Validate current step fields
   */
  const validate = () => {
    const newErrors: Record<string, boolean> = {};
    
    if (step === "shipping") {
      if (!formData.fullName.trim()) newErrors.fullName = true;
      if (!formData.email.trim() || !formData.email.includes("@")) newErrors.email = true;
      if (!formData.phone.trim()) newErrors.phone = true;
      if (!formData.address.trim()) newErrors.address = true;
      if (!formData.city.trim()) newErrors.city = true;
      if (!formData.country.trim()) newErrors.country = true;
      if (!formData.zipCode.trim()) newErrors.zipCode = true;
    } else if (step === "payment" && paymentMethod === "credit_card") {
      if (!formData.cardNumber.trim() || formData.cardNumber.length < 16) newErrors.cardNumber = true;
      if (!formData.expiry.trim()) newErrors.expiry = true;
      if (!formData.cvc.trim() || formData.cvc.length < 3) newErrors.cvc = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle input changes and update local state
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    if (step === "payment") {
      setIsSubmitting(true);
      // Simulate API call for order placement
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitting(false);
    }
    
    onNext({
      shippingAddress: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        zipCode: formData.zipCode,
        notes: formData.notes
      },
      paymentMethod,
      shippingMethod
    });
  };

  return (
    <Card className="p-8 md:p-12 bg-surface-container/50 border-outline/10 backdrop-blur-md relative overflow-hidden group">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />
      
      <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
        <AnimatePresence mode="wait">
          {/* SHIPPING STEP */}
          {step === "shipping" && (
            <motion.div 
              key="shipping"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
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
                    className={cn(
                      "bg-background/40 border-outline/10 focus:border-primary/50 h-12 rounded-xl",
                      errors.fullName && "border-error/50 ring-1 ring-error/20"
                    )}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-label-sm text-text-muted uppercase tracking-wider">{t.checkout.email}</label>
                  <Input 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="commander@astroassist.ai"
                    className={cn(
                      "bg-background/40 border-outline/10 focus:border-primary/50 h-12 rounded-xl",
                      errors.email && "border-error/50 ring-1 ring-error/20"
                    )}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-label-sm text-text-muted uppercase tracking-wider">{t.checkout.phone}</label>
                  <div className="relative">
                    <Input 
                      name="phone" 
                      type="tel"
                      value={formData.phone} 
                      onChange={handleChange} 
                      placeholder="+1 555 000 0000"
                      className={cn(
                        "bg-background/40 border-outline/10 focus:border-primary/50 h-12 rounded-xl pl-10",
                        errors.phone && "border-error/50 ring-1 ring-error/20"
                      )}
                      required
                    />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint" size={16} />
                  </div>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-label-sm text-text-muted uppercase tracking-wider">{t.checkout.address}</label>
                  <Input 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    placeholder={t.checkout.address}
                    className={cn(
                      "bg-background/40 border-outline/10 focus:border-primary/50 h-12 rounded-xl",
                      errors.address && "border-error/50 ring-1 ring-error/20"
                    )}
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
                    className={cn(
                      "bg-background/40 border-outline/10 focus:border-primary/50 h-12 rounded-xl",
                      errors.city && "border-error/50 ring-1 ring-error/20"
                    )}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-label-sm text-text-muted uppercase tracking-wider">{t.checkout.country}</label>
                  <div className="relative">
                    <Input 
                      name="country" 
                      value={formData.country} 
                      onChange={handleChange} 
                      placeholder={t.checkout.country_placeholder}
                      className={cn(
                        "bg-background/40 border-outline/10 focus:border-primary/50 h-12 rounded-xl pl-10",
                        errors.country && "border-error/50 ring-1 ring-error/20"
                      )}
                      required
                    />
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint" size={16} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-label-sm text-text-muted uppercase tracking-wider">{t.checkout.zip_code}</label>
                  <Input 
                    name="zipCode" 
                    value={formData.zipCode} 
                    onChange={handleChange} 
                    placeholder={t.checkout.zip_code}
                    className={cn(
                      "bg-background/40 border-outline/10 focus:border-primary/50 h-12 rounded-xl",
                      errors.zipCode && "border-error/50 ring-1 ring-error/20"
                    )}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-label-sm text-text-muted uppercase tracking-wider">{t.checkout.notes}</label>
                  <div className="relative">
                    <textarea 
                      name="notes" 
                      value={formData.notes} 
                      onChange={handleChange} 
                      placeholder="..."
                      className="w-full bg-background/40 border border-outline/10 focus:border-primary/50 rounded-xl p-4 min-h-[100px] text-body-sm text-text-main outline-none transition-colors"
                    />
                    <FileText className="absolute right-4 bottom-4 text-text-faint" size={16} />
                  </div>
                </div>

                {/* Shipping Method Selector */}
                <div className="md:col-span-2 pt-6">
                  <label className="text-label-sm text-text-muted uppercase tracking-wider block mb-4">{t.checkout.shipping_method}</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                      type="button"
                      onClick={() => setShippingMethod("standard")}
                      className={cn(
                        "flex flex-col gap-2 p-5 rounded-2xl border-2 transition-all text-left group/opt",
                        shippingMethod === "standard" 
                          ? "border-primary bg-primary/10 text-text-main" 
                          : "border-outline/5 bg-surface-bright/5 text-text-soft hover:border-outline/20"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-label-md font-bold uppercase tracking-widest">{t.checkout.standard_shipping}</span>
                        {shippingMethod === "standard" && <Check size={16} className="text-primary" />}
                      </div>
                      <span className="text-[11px] text-text-muted leading-tight group-hover/opt:text-text-soft">
                        {t.checkout.standard_shipping_desc}
                      </span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShippingMethod("pickup")}
                      className={cn(
                        "flex flex-col gap-2 p-5 rounded-2xl border-2 transition-all text-left group/opt",
                        shippingMethod === "pickup" 
                          ? "border-primary bg-primary/10 text-text-main" 
                          : "border-outline/5 bg-surface-bright/5 text-text-soft hover:border-outline/20"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-label-md font-bold uppercase tracking-widest">{t.checkout.pickup_shipping}</span>
                        {shippingMethod === "pickup" && <Check size={16} className="text-primary" />}
                      </div>
                      <span className="text-[11px] text-text-muted leading-tight group-hover/opt:text-text-soft">
                        {t.checkout.pickup_shipping_desc}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* PAYMENT STEP */}
          {step === "payment" && (
            <motion.div 
              key="payment"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
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
                  onClick={() => setPaymentMethod("credit_card")}
                  className={cn(
                    "flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all",
                    paymentMethod === "credit_card" 
                      ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10" 
                      : "border-outline/5 bg-surface-bright/10 text-text-muted hover:border-outline/20 hover:text-text-soft"
                  )}
                >
                  <CreditCard size={24} />
                  <span className="text-label-sm font-bold uppercase tracking-widest">{t.checkout.credit_card}</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setPaymentMethod("paypal")}
                  className={cn(
                    "flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all",
                    paymentMethod === "paypal" 
                      ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10" 
                      : "border-outline/5 bg-surface-bright/10 text-text-muted hover:border-outline/20 hover:text-text-soft"
                  )}
                >
                  <Wallet size={24} />
                  <span className="text-label-sm font-bold uppercase tracking-widest">PayPal</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setPaymentMethod("transfer")}
                  className={cn(
                    "flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all",
                    paymentMethod === "transfer" 
                      ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10" 
                      : "border-outline/5 bg-surface-bright/10 text-text-muted hover:border-outline/20 hover:text-text-soft"
                  )}
                >
                  <Landmark size={24} />
                  <span className="text-label-sm font-bold uppercase tracking-widest">{t.checkout.bank_transfer}</span>
                </button>
              </div>

              {paymentMethod === "credit_card" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-label-sm text-text-muted uppercase tracking-wider">{t.checkout.card_number}</label>
                    <div className="relative">
                      <Input 
                        name="cardNumber" 
                        value={formData.cardNumber} 
                        onChange={handleChange} 
                        placeholder="0000 0000 0000 0000"
                        className={cn(
                          "bg-background/40 border-outline/10 focus:border-primary/50 h-12 rounded-xl pl-12 font-mono tracking-widest",
                          errors.cardNumber && "border-error/50 ring-1 ring-error/20"
                        )}
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
                      className={cn(
                        "bg-background/40 border-outline/10 focus:border-primary/50 h-12 rounded-xl font-mono text-center",
                        errors.expiry && "border-error/50 ring-1 ring-error/20"
                      )}
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
                      className={cn(
                        "bg-background/40 border-outline/10 focus:border-primary/50 h-12 rounded-xl font-mono text-center",
                        errors.cvc && "border-error/50 ring-1 ring-error/20"
                      )}
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    {paymentMethod === "paypal" ? <Wallet className="text-primary" size={32} /> : <Landmark className="text-primary" size={32} />}
                  </div>
                  <div>
                    <h4 className="text-title-sm font-bold text-text-main mb-2">
                      {paymentMethod === "paypal" ? "PayPal Express" : t.checkout.bank_transfer}
                    </h4>
                    <p className="text-body-sm text-text-muted max-w-sm">
                      {paymentMethod === "paypal" 
                        ? "Serás redirigido a PayPal para completar tu pago de forma segura." 
                        : "Los detalles de transferencia se enviarán a tu correo tras confirmar el pedido."}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACTIONS */}
        <div className="flex items-center justify-between pt-10 border-t border-outline/10">
          {step === "payment" ? (
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onPrev}
              disabled={isSubmitting}
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
            disabled={isSubmitting}
            className={cn(
              "h-14 px-10 rounded-2xl bg-primary hover:bg-primary-hover group shadow-xl shadow-primary/20",
              isSubmitting && "opacity-80 pointer-events-none"
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-3 animate-spin" size={20} />
                <span className="font-bold uppercase tracking-widest text-label-md">{t.checkout.processing}</span>
              </>
            ) : (
              <>
                <span className="font-bold uppercase tracking-widest text-label-md">
                  {step === "shipping" ? t.checkout.continue : t.checkout.place_order}
                </span>
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}

