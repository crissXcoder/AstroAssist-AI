"use client";

import { useState, useEffect } from "react";
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
      const timer = setTimeout(() => {
        setLoading(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
          <Telescope className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-primary/40" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-text-main">
            {t.checkout.confirmation.processing.title}
          </h2>
          <p className="text-text-soft">
            {t.checkout.confirmation.processing.message}
          </p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-8">
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="w-10 h-10 text-destructive" />
        </div>
        <div className="space-y-4 max-w-md">
          <h2 className="text-3xl font-bold tracking-tight text-text-main">
            {t.checkout.confirmation.error.title}
          </h2>
          <p className="text-text-soft text-lg leading-relaxed">
            {t.checkout.confirmation.error.message}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Link href={`/${locale}/catalogo`} className="flex-1">
            <Button variant="outline" className="w-full h-12 rounded-xl group border-white/10 hover:bg-white/5">
              <ShoppingCart className="mr-2 w-4 h-4" />
              {t.checkout.confirmation.error.browse_catalog}
            </Button>
          </Link>
          <Link href={`/${locale}/`} className="flex-1">
            <Button className="w-full h-12 rounded-xl group bg-primary hover:bg-primary-dark">
              {t.checkout.confirmation.error.home}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header Card */}
          <Card className="relative overflow-hidden border-white/5 bg-surface-container/30 backdrop-blur-xl p-8 rounded-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -mr-32 -mt-32" />
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/30 ring-8 ring-secondary/5">
                <CheckCircle2 className="w-10 h-10 text-secondary" />
              </div>
              
              <div className="space-y-2">
                <h1 className="text-4xl font-black text-text-main tracking-tight">
                  {t.checkout.confirmation.success.title}
                </h1>
                <p className="text-text-soft text-lg">
                  {t.checkout.confirmation.success.message} <span className="text-text-main font-semibold">{order.shippingAddress?.email}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <Badge variant="secondary" className="px-4 py-1.5 rounded-full bg-surface-container border-white/5 text-xs font-bold uppercase tracking-widest">
                  ID: {order.id.slice(0, 8)}
                </Badge>
                <Badge className="px-4 py-1.5 rounded-full bg-secondary/10 text-secondary border-secondary/20 text-xs font-bold uppercase tracking-widest">
                  {t.checkout.confirmation.order_details.status}: {order.status}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Action Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-surface-container/20 border border-white/5 hover:bg-surface-container/30 transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-text-main mb-1">{t.checkout.confirmation.actions.email_sent.title}</h3>
              <p className="text-sm text-text-soft leading-relaxed">
                {t.checkout.confirmation.actions.email_sent.message}
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-surface-container/20 border border-white/5 hover:bg-surface-container/30 transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-bold text-text-main mb-1">{t.checkout.confirmation.actions.next_steps.title}</h3>
              <p className="text-sm text-text-soft leading-relaxed">
                {t.checkout.confirmation.actions.next_steps.message}
              </p>
            </div>
          </div>

          {/* Order Content */}
          <Card className="border-white/5 bg-surface-container/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/5 flex items-center gap-3">
              <Package className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-text-main">{t.checkout.confirmation.order_details.title}</h3>
            </div>
            <div className="divide-y divide-white/5">
              {order.items.map((item) => (
                <div key={item.id} className="p-6 flex gap-4 hover:bg-white/5 transition-colors">
                  <div className="w-20 h-20 rounded-2xl bg-black/40 overflow-hidden border border-white/10 shrink-0">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      width={80} 
                      height={80} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-text-main truncate">{item.name}</h4>
                    <p className="text-xs text-text-soft mb-2 uppercase tracking-widest">{item.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-soft">Qty: {item.quantity}</span>
                      <span className="font-bold text-secondary">{formatCurrency(item.price)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-white/5 space-y-3">
              <div className="flex justify-between text-sm text-text-soft">
                <span>{t.checkout.confirmation.order_details.subtotal}</span>
                <span>{formatCurrency(order.summary.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-text-soft">
                <span>{t.checkout.confirmation.order_details.shipping}</span>
                <span className="text-secondary font-medium">{order.summary.shipping === 0 ? "Free" : formatCurrency(order.summary.shipping)}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-white/10">
                <span className="font-bold text-text-main">{t.checkout.confirmation.order_details.total}</span>
                <span className="text-2xl font-black text-secondary">{formatCurrency(order.summary.total)}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Shipping Info */}
          <Card className="p-6 border-white/5 bg-surface-container/20 rounded-3xl space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <h4 className="font-bold text-text-main text-sm uppercase tracking-widest">{t.checkout.confirmation.order_details.shipping_address}</h4>
              </div>
              <div className="text-sm text-text-soft space-y-1 pl-11">
                <p className="font-bold text-text-main">{order.shippingAddress?.fullName}</p>
                <p>{order.shippingAddress?.address}</p>
                <p>{order.shippingAddress?.city}, {order.shippingAddress?.zipCode}</p>
                <p>{order.shippingAddress?.country}</p>
              </div>
            </div>

            <div className="h-px bg-white/5" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-secondary" />
                </div>
                <h4 className="font-bold text-text-main text-sm uppercase tracking-widest">{t.checkout.confirmation.order_details.payment_method}</h4>
              </div>
              <div className="text-sm text-text-soft pl-11">
                <p className="flex items-center gap-2 uppercase">
                  {order.paymentMethod.replace('_', ' ')}
                </p>
              </div>
            </div>

            <div className="h-px bg-white/5" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cosmic-500/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-cosmic-500" />
                </div>
                <h4 className="font-bold text-text-main text-sm uppercase tracking-widest">{t.checkout.confirmation.order_details.delivery_est}</h4>
              </div>
              <div className="text-sm text-text-soft pl-11">
                <p className="text-secondary font-bold">Oct 12 - Oct 15, 2026</p>
              </div>
            </div>
          </Card>

          {/* Social / Support */}
          <div className="p-8 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20 border border-white/10 text-center space-y-4">
            <h4 className="font-bold text-text-main">{t.checkout.confirmation.support.title}</h4>
            <p className="text-sm text-text-soft">
              {t.checkout.confirmation.support.message}
            </p>
            <Button variant="outline" className="w-full rounded-xl border-white/10 hover:bg-white/10">
              <Share2 className="w-4 h-4 mr-2" />
              {t.checkout.confirmation.support.share}
            </Button>
          </div>

          <Link href={`/${locale}/catalogo`} className="block">
            <Button variant="ghost" className="w-full rounded-xl hover:bg-white/5 text-text-soft">
              <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
              {t.checkout.confirmation.actions.continue_shopping}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
