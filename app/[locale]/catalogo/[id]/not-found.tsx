"use client";

import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { useTranslations, useLocale } from "@/shared/providers/i18n-provider";
import { Telescope, Home } from "lucide-react";

export default function ProductNotFound() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-[radial-gradient(circle,rgba(98,87,244,0.1)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="relative z-10 space-y-8 max-w-2xl">
        <div className="relative inline-block">
          <div className="absolute inset-0 blur-2xl bg-primary/20 rounded-full" />
          <Telescope size={120} className="text-primary relative animate-bounce" />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-text-main">
            {t.product_detail.not_found_title}
          </h1>
          <p className="text-lg text-text-soft">
            {t.product_detail.not_found_desc}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="rounded-full px-8 h-14">
            <Link href={`/${locale}/catalogo`}>
              {t.product_detail.not_found_cta}
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="rounded-full px-8 h-14 text-text-muted hover:text-text-main">
            <Link href={`/${locale}`}>
              <Home size={20} className="mr-2" />
              {t.navbar.home}
            </Link>
          </Button>
        </div>
      </div>

      {/* Atmospheric Star Field Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: Math.random() * 3 + "px",
              height: Math.random() * 3 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 5 + "s",
              animationDuration: Math.random() * 3 + 2 + "s"
            }}
          />
        ))}
      </div>
    </div>
  );
}
