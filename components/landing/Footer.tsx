"use client";

import { Telescope, Github, Twitter, Linkedin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations, useLocale } from "@/components/i18n-provider";

export function Footer() {
  const t = useTranslations().footer;
  const locale = useLocale();
  return (
    <footer className="relative border-t border-white/5 pt-24 pb-12 overflow-hidden bg-surface-container-lowest">
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(98,87,244,0.12),transparent_70%)] rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container px-6 md:px-12 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          <div className="flex flex-col space-y-6 lg:col-span-2 pr-0 lg:pr-12">
            <Link href={`/${locale}`} className="flex items-center gap-4 group w-fit">
              <div className="p-2.5 bg-primary-container rounded-xl border border-primary/30 group-hover:bg-primary/20 transition-all duration-300 shadow-xl shadow-primary/10">
                <Telescope className="w-7 h-7 text-primary" />
              </div>
              <span className="text-title-lg font-black tracking-tight text-text-main group-hover:text-glow transition-all">AstroAssist AI</span>
            </Link>
            <p className="text-text-soft text-body-sm leading-relaxed max-w-[340px]">
              {t.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
               {[Twitter, Github, Linkedin].map((Icon, idx) => (
                 <a key={idx} href="#" className="w-11 h-11 rounded-full bg-surface-container border border-white/5 flex items-center justify-center text-text-muted hover:text-text-main hover:border-primary/40 hover:bg-primary-container/30 transition-all duration-300 group">
                   <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                 </a>
               ))}
            </div>
          </div>

          <div className="flex flex-col space-y-6 lg:col-span-1">
            <h4 className="text-label-md uppercase tracking-widest text-text-muted">{locale === 'en' ? 'EQUIPMENT' : 'EQUIPAMIENTO'}</h4>
            <ul className="space-y-3.5">
              {t.catalog_items.map(item => (
                <li key={item}>
                  <Link href={`/${locale}/catalogo`} className="text-body-sm text-text-soft hover:text-primary transition-all duration-300 flex items-center gap-2.5 group">
                    <span className="w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary group-hover:scale-125 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col space-y-6 lg:col-span-1">
            <h4 className="text-label-md uppercase tracking-widest text-text-muted">{t.resources}</h4>
            <ul className="space-y-3.5">
              {t.resources_items.map(item => (
                <li key={item}>
                  <Link href="#" className="text-body-sm text-text-soft hover:text-primary transition-all duration-300 flex items-center gap-2.5 group">
                    <span className="w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary group-hover:scale-125 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col space-y-6 lg:col-span-1">
            <h4 className="text-label-md uppercase tracking-widest text-text-muted">{t.subscribe}</h4>
            <p className="text-body-sm text-text-soft leading-relaxed max-w-[240px]">
              {t.subscribe_desc}
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input 
                placeholder="tu@email.com" 
                className="bg-surface-container border-white/5 focus:border-primary/50 transition-all h-12 rounded-xl"
              />
              <Button size="icon" variant="primary" className="shrink-0 h-12 w-12 rounded-xl shadow-lg shadow-primary/20">
                <ArrowRight className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-label-sm text-text-faint font-medium">
            © {new Date().getFullYear()} {t.rights}
          </p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-label-sm text-text-faint hover:text-text-main transition-colors uppercase tracking-widest font-bold">Privacidad</Link>
            <Link href="#" className="text-label-sm text-text-faint hover:text-text-main transition-colors uppercase tracking-widest font-bold">Términos</Link>
          </div>
        </div>
      </div>
    </footer>

  );
}
