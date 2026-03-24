"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Telescope, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            ? "bg-background/80 dark:bg-background/60 backdrop-blur-2xl border-b border-border/50 dark:border-white/5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="container px-4 md:px-6 mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-primary/20 rounded-[10px] border border-primary/30 group-hover:bg-primary/40 transition-colors shadow-[0_0_15px_rgba(var(--primary),0.2)] group-hover:scale-105 duration-300">
              <Telescope className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground transition-all group-hover:text-glow">AstroAssist AI</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-foreground dark:hover:text-white transition-colors">Inicio</Link>
            <Link href="#features" className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-foreground dark:hover:text-white transition-colors">Tecnología</Link>
            <Link href="/catalogo" className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-foreground dark:hover:text-white transition-colors">Sistema Óptico</Link>
            <Link href="#community" className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-foreground dark:hover:text-white transition-colors">Comunidad</Link>
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
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
            className="fixed inset-0 z-60 bg-background/95 backdrop-blur-3xl flex flex-col p-6 border-l border-border/50 dark:border-white/10"
          >
            <div className="flex justify-between items-center mb-12">
               <span className="text-xl font-bold tracking-tight text-glow">AstroAssist AI</span>
               <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                 <X className="w-6 h-6" />
               </Button>
            </div>
            
            <nav className="flex flex-col gap-6 text-xl font-medium tracking-tight">
              {['Catálogo', 'Galería', 'Comunidad', 'IA Asistente'].map((item, i) => (
                 <motion.div 
                   key={item}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1 }}
                 >
                   <Link href="#" className="p-2 -mr-2 text-foreground dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>{item}</Link>
                 </motion.div>
              ))}
            </nav>
            
            <div className="mt-auto flex flex-col gap-4">
               <Button className="w-full h-14 rounded-2xl text-base shadow-[0_0_30px_rgba(var(--primary),0.3)]">Probar AstroAssist</Button>
               <Button variant="glass" className="w-full h-14 rounded-2xl text-base">Acceder</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
