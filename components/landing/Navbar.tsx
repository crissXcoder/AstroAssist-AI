"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Telescope, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslations, useLocale } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const t = useTranslations().navbar;
  const locale = useLocale();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? "bg-surface-container/80 backdrop-blur-2xl border-b border-white/5 py-3 shadow-2xl shadow-black/40" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="container px-6 md:px-12 mx-auto flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-4 group">
            <div className="p-2.5 bg-primary-container rounded-xl border border-primary/20 group-hover:bg-primary/40 transition-all shadow-xl shadow-primary/20 group-hover:scale-105 duration-300">
              <Telescope className="w-6 h-6 text-primary" />
            </div>
            <span className="text-title-md font-bold tracking-tight text-text-main transition-all group-hover:text-glow">AstroAssist AI</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href={`/${locale}`} className="text-label-md text-text-soft hover:text-text-main transition-colors uppercase">{t.home}</Link>
            <Link href={`/${locale}#benefits`} className="text-label-md text-text-soft hover:text-text-main transition-colors uppercase">{t.technology}</Link>
            <Link href={`/${locale}/catalogo`} className="text-label-md text-text-soft hover:text-text-main transition-colors uppercase">{t.optics}</Link>
            <Link href={`/${locale}/builder`} className="text-label-md text-primary hover:text-primary-hover font-bold transition-colors uppercase">Startup</Link>
            <Link href={`/${locale}#gallery`} className="text-label-md text-text-soft hover:text-text-main transition-colors uppercase">{t.community}</Link>
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon-sm" 
              onClick={() => setMobileMenuOpen(true)}
            >
               <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-60 bg-background/98 backdrop-blur-3xl flex flex-col p-6 border-l border-white/10"
          >
            <div className="flex justify-between items-center mb-12">
               <span className="text-title-lg font-bold tracking-tight text-glow">AstroAssist AI</span>
               <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                 <X className="w-6 h-6" />
               </Button>
            </div>
            
            <nav className="flex flex-col gap-6 text-headline-md font-medium tracking-tight">
              {[
                { label: t.home, href: `/${locale}` },
                { label: t.technology, href: `/${locale}#benefits` },
                { label: t.optics, href: `/${locale}/catalogo` },
                { label: 'Startup', href: `/${locale}/builder` },
                { label: t.community, href: `/${locale}#gallery` }
              ].map((item, i) => (
                 <motion.div 
                   key={item.label}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1 }}
                 >
                   <Link 
                     href={item.href} 
                     className={cn(
                       "p-2 -mr-2 flex items-center justify-between rounded-xl transition-colors",
                       item.label === 'Startup' ? "text-primary font-bold" : "text-text-main"
                     )} 
                     onClick={() => setMobileMenuOpen(false)}
                   >
                     {item.label}
                   </Link>
                 </motion.div>
              ))}
            </nav>
            
            <div className="mt-auto flex flex-col gap-4">
               <Link 
                 href={`/${locale}#assistant`} 
                 onClick={() => setMobileMenuOpen(false)}
                 className={cn(
                   buttonVariants({ variant: "default", size: "lg" }),
                   "w-full rounded-full"
                 )}
               >
                 Probar AstroAssist
               </Link>
               <Button variant="secondary" size="lg" className="w-full">Acceder</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
