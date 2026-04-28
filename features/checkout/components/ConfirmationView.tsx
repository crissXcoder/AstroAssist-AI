"use client";

// Cosmic Confirmation View

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  ArrowRight, 
  Telescope, 
  Mail, 
  Sparkles, 
  Share2,
  Package,
  MapPin,
  CreditCard,
  Calendar,
  AlertCircle,
  ChevronRight,
  ShoppingCart
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import Link from "next/link";
import { useLocale, useTranslations } from "@/shared/providers/i18n-provider";
import { getOrderById } from "../utils/order-utils";
import { Order } from "../types";
import { formatCurrency } from "@/shared/utils/currency";
import Image from "next/image";
import { Badge } from "@/shared/components/ui/badge";

interface ConfirmationViewProps {
  orderId?: string;
}

export function ConfirmationView({ orderId }: ConfirmationViewProps) {
  const locale = useLocale();
  const t = useTranslations();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      // Small artificial delay for "processing" feel
      const timer = setTimeout(() => {
        const foundOrder = getOrderById(orderId);
        if (foundOrder) {
          setOrder(foundOrder);
        }
        setLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-8">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Telescope size={24} className="text-primary animate-pulse" />
          </div>
        </div>
        <p className="text-text-muted font-mono animate-pulse uppercase tracking-[0.2em] text-label-sm">
          {t.checkout.processing}
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center py-20 px-6"
      >
        <div className="w-20 h-20 rounded-3xl bg-error/10 flex items-center justify-center mx-auto mb-8 border border-error/20">
          <AlertCircle size={40} className="text-error" />
        </div>
        <h2 className="text-headline-md font-bold text-text-main mb-4">{t.checkout.no_order_found}</h2>
        <p className="text-body-md text-text-muted mb-10">{t.checkout.no_order_desc}</p>
        <Button asChild size="lg" className="rounded-full px-8 bg-primary">
          <Link href={`/${locale}/catalogo`}>
            {t.checkout.view_catalog}
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Top Section: Celebration */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
          className="w-24 h-24 rounded-3xl bg-success/10 border border-success/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(16,185,129,0.2)] relative"
        >
          <CheckCircle2 size={48} className="text-success" />
          <motion.div 
            animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-3xl border-2 border-success/20"
          />
        </motion.div>

        <h1 className="text-headline-xl font-bold text-text-main mb-6 tracking-tight text-glow">
          {t.checkout.success}
        </h1>
        <p className="text-body-lg text-text-soft mb-8 max-w-2xl mx-auto leading-relaxed">
          {t.checkout.success_desc}
        </p>

        <div className="inline-flex flex-col items-center gap-2">
          <span className="text-text-faint text-[10px] uppercase tracking-[0.3em] font-bold">Expedition Protocol ID</span>
          <div className="px-8 py-3 rounded-2xl bg-surface-bright/10 border border-outline/10 backdrop-blur-md shadow-inner flex items-center gap-3">
            <span className="text-primary font-mono text-title-md font-bold tracking-wider">{order.id}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Order Summary Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="overflow-hidden bg-surface-container/30 border-outline/10 backdrop-blur-sm">
              <div className="p-6 border-b border-outline/10 bg-surface-bright/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="text-primary" size={20} />
                  <h3 className="text-title-sm font-bold text-text-main uppercase tracking-wider">{t.checkout.order_summary}</h3>
                </div>
                <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary">
                  {order.status.toUpperCase()}
                </Badge>
              </div>
              <div className="p-0">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-bright/5">
                    <tr>
                      <th className="px-6 py-4 text-label-sm text-text-muted uppercase tracking-widest">{t.checkout.products}</th>
                      <th className="px-6 py-4 text-label-sm text-text-muted uppercase tracking-widest text-center">{t.checkout.qty.split(':')[0]}</th>
                      <th className="px-6 py-4 text-label-sm text-text-muted uppercase tracking-widest text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline/5">
                    {order.items.map((item) => (
                      <tr key={item.id} className="hover:bg-surface-bright/5 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-xl bg-background/50 border border-outline/10 overflow-hidden shrink-0">
                              <Image 
                                src={item.image} 
                                alt={item.name} 
                                fill 
                                className="object-cover group-hover:scale-110 transition-transform duration-500" 
                              />
                            </div>
                            <div>
                              <div className="text-body-sm font-bold text-text-main mb-1">{item.name}</div>
                              <div className="text-[11px] text-text-faint font-mono">SKU: {item.id.slice(0, 8).toUpperCase()}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center text-body-sm text-text-soft font-mono">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-5 text-right text-body-sm font-bold text-text-main font-mono">
                          {formatCurrency(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-8 bg-surface-bright/5 space-y-3">
                <div className="flex justify-between text-body-sm text-text-soft">
                  <span>{t.cart.subtotal}</span>
                  <span className="font-mono">{formatCurrency(order.summary.subtotal)}</span>
                </div>
                <div className="flex justify-between text-body-sm text-text-soft">
                  <span>{t.cart.shipping}</span>
                  <span className="font-mono">{order.summary.shipping === 0 ? t.cart.free : formatCurrency(order.summary.shipping)}</span>
                </div>
                <div className="flex justify-between text-body-sm text-text-soft">
                  <span>{t.cart.tax}</span>
                  <span className="font-mono">{formatCurrency(order.summary.tax)}</span>
                </div>
                <div className="pt-4 mt-4 border-t border-outline/10 flex justify-between items-baseline">
                  <span className="text-title-sm font-bold text-text-main uppercase tracking-widest">{t.cart.total}</span>
                  <span className="text-headline-sm font-bold text-primary font-mono drop-shadow-[0_0_15px_rgba(98,87,244,0.3)]">
                    {formatCurrency(order.summary.total)}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Logistics & Support Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-8 rounded-3xl bg-surface-bright/5 border border-outline/10 hover:border-primary/20 transition-all group/step"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover/step:scale-110 transition-transform">
                  <Telescope size={24} className="text-primary" />
                </div>
                <span className="text-label-sm uppercase font-bold tracking-[0.2em] text-primary">{t.checkout.next_steps}</span>
              </div>
              <p className="text-body-sm text-text-muted leading-relaxed">
                {t.checkout.next_steps_desc}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-8 rounded-3xl bg-surface-bright/5 border border-outline/10 hover:border-secondary/20 transition-all group/step"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover/step:scale-110 transition-transform">
                  <Mail size={24} className="text-secondary" />
                </div>
                <span className="text-label-sm uppercase font-bold tracking-[0.2em] text-secondary">{t.checkout.tracking}</span>
              </div>
              <p className="text-body-sm text-text-muted leading-relaxed">
                {t.checkout.tracking_desc}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Sidebar Info */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-8 bg-surface-container/30 border-outline/10 backdrop-blur-sm space-y-8">
              {/* Customer Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-text-main font-bold uppercase tracking-wider text-[11px]">
                  <MapPin size={16} className="text-primary" />
                  {t.checkout.shipping_address}
                </div>
                <div className="space-y-1">
                  <p className="text-body-sm font-bold text-text-main">{order.shippingAddress?.fullName}</p>
                  <p className="text-body-sm text-text-soft">{order.shippingAddress?.address}</p>
                  <p className="text-body-sm text-text-soft">{order.shippingAddress?.city}, {order.shippingAddress?.zipCode}</p>
                  <p className="text-body-sm text-text-soft">{order.shippingAddress?.country}</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-text-main font-bold uppercase tracking-wider text-[11px]">
                  <Mail size={16} className="text-primary" />
                  Contact Information
                </div>
                <div className="space-y-1">
                  <p className="text-body-sm text-text-soft">{order.shippingAddress?.email}</p>
                  <p className="text-body-sm text-text-soft">{order.shippingAddress?.phone}</p>
                </div>
              </div>

              {/* Payment & Shipping Method */}
              <div className="space-y-4 pt-4 border-t border-outline/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-text-main font-bold uppercase tracking-wider text-[11px]">
                    <CreditCard size={16} className="text-primary" />
                    Payment
                  </div>
                  <span className="text-[11px] text-text-soft uppercase tracking-wider">{order.paymentMethod.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-text-main font-bold uppercase tracking-wider text-[11px]">
                    <Calendar size={16} className="text-primary" />
                    Date
                  </div>
                  <span className="text-[11px] text-text-soft uppercase tracking-wider">
                    {new Date(order.createdAt).toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-outline/10 space-y-4">
                <Button asChild className="w-full h-14 rounded-2xl bg-primary hover:bg-primary-hover shadow-lg shadow-primary/20 group">
                  <Link href={`/${locale}`} className="flex items-center justify-center gap-3">
                    <span className="font-bold uppercase tracking-widest text-label-sm">{t.checkout.back_home}</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full h-14 rounded-2xl border-outline/10 bg-surface-bright/5 hover:bg-surface-bright/20 transition-all group">
                  <Link href={`/${locale}/catalogo`} className="flex items-center justify-center gap-3">
                    <Sparkles size={18} className="text-secondary group-hover:scale-110 transition-transform" />
                    <span className="font-bold uppercase tracking-widest text-label-sm">{t.checkout.continue_shopping}</span>
                  </Link>
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Social / Share Tip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="p-6 rounded-3xl bg-primary/5 border border-primary/10 text-center"
          >
            <h4 className="text-label-sm font-bold text-primary uppercase tracking-[0.2em] mb-2">Share your expedition</h4>
            <p className="text-[11px] text-text-muted mb-4">Join the community and share your setup using #AstroAssistAI</p>
            <div className="flex justify-center gap-3">
              <button className="w-10 h-10 rounded-xl bg-surface-bright/10 flex items-center justify-center text-text-soft hover:text-primary transition-colors">
                <Share2 size={18} />
              </button>
              <button className="w-10 h-10 rounded-xl bg-surface-bright/10 flex items-center justify-center text-text-soft hover:text-primary transition-colors">
                <Mail size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
