"use client";

import { Telescope, Github, Twitter, Linkedin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 dark:border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.12),transparent_70%)] rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="flex flex-col space-y-6 lg:col-span-2 pr-0 lg:pr-12">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="p-2 bg-primary/20 rounded-xl border border-primary/30 group-hover:bg-primary/40 transition-colors shadow-[0_0_20px_rgba(var(--primary),0.2)]">
                <Telescope className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-glow">AstroAssist AI</span>
            </Link>
            <p className="text-muted-foreground font-light text-sm leading-relaxed max-w-[320px]">
              El ecosistema definitivo para la iteración óptica y astrofotografía premium, potenciado por telemetría e Inteligencia Artificial.
            </p>
            <div className="flex items-center gap-4 pt-2">
               <a href="#" className="w-10 h-10 rounded-full bg-secondary dark:bg-secondary/80 border border-border/50 dark:border-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground dark:hover:text-white hover:border-primary/50 hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all">
                 <Twitter className="w-4 h-4" />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-secondary dark:bg-secondary/80 border border-border/50 dark:border-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground dark:hover:text-white hover:border-primary/50 hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all">
                 <Github className="w-4 h-4" />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-secondary dark:bg-secondary/80 border border-border/50 dark:border-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground dark:hover:text-white hover:border-primary/50 hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all">
                 <Linkedin className="w-4 h-4" />
               </a>
            </div>
          </div>

          <div className="flex flex-col space-y-5 lg:col-span-1">
            <h4 className="text-foreground font-semibold tracking-tight">Equipamiento</h4>
            <ul className="space-y-4">
              {['Telescopios Reflectores', 'Refractores Apocromáticos', 'Monturas Ecuatoriales', 'Cámaras CMOS', 'Filtros Optométricos'].map(item => (
                <li key={item}><Link href="#" className="text-sm font-light text-muted-foreground hover:text-primary transition-colors tracking-wide relative group"><span className="absolute -left-3 opacity-0 group-hover:opacity-100 group-hover:left-0 transition-all text-primary">&rsaquo;</span> <span className="group-hover:pl-3 transition-all inline-block">{item}</span></Link></li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col space-y-5 lg:col-span-1">
              <h4 className="text-lg font-bold text-foreground dark:text-white tracking-tight">Catálogo</h4>
            <ul className="space-y-4">
              {['Calculadora Astronómica', 'Guía de Resoluciones', 'Mapa de Cielos Oscuros', 'Centro de Soporte', 'API Docs'].map(item => (
                <li key={item}><Link href="#" className="text-sm font-light text-muted-foreground hover:text-primary transition-colors tracking-wide relative group"><span className="absolute -left-3 opacity-0 group-hover:opacity-100 group-hover:left-0 transition-all text-primary">&rsaquo;</span> <span className="group-hover:pl-3 transition-all inline-block">{item}</span></Link></li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col space-y-5 lg:col-span-1">
              <h4 className="text-lg font-bold text-foreground dark:text-white tracking-tight">Suscríbete a la Órbita</h4>
            <p className="text-sm text-muted-foreground leading-relaxed font-light mb-1">
              Únete a nuestra élite observatoria.
            </p>
            <form className="flex gap-2">
              <Input 
                placeholder="tu@email.com" 
                className="bg-card/50 border-border/50 dark:border-white/10 focus-visible:ring-primary/50 rounded-xl h-11 backdrop-blur-md"
              />
              <Button size="icon" className="rounded-xl shrink-0 h-11 w-11 shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:scale-105 transition-transform bg-primary hover:bg-primary/90">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-light tracking-wide">
            © {new Date().getFullYear()} AstroAssist AI Technologies. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-muted-foreground hover:text-white transition-colors tracking-widest uppercase">Privacidad</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-white transition-colors tracking-widest uppercase">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
