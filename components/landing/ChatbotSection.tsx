"use client";

import { SectionContainer } from "@/components/ui/section";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { Badge } from "@/components/ui/badge";
import { Bot, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { STAGGER_CONTAINER, FADE_IN_LEFT, FADE_IN_RIGHT } from "@/lib/motion";

export function ChatbotSection() {
  return (
    <SectionContainer delay={0} className="py-32 relative overflow-hidden bg-background">
      {/* Decorative Background */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(147,51,234,0.08),transparent_70%)] rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* Text Content wrapped in Staggered parent */}
          <motion.div 
            variants={STAGGER_CONTAINER} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} 
            className="flex flex-col space-y-8"
          >
            <motion.div variants={FADE_IN_RIGHT}>
              <Badge variant="glass" className="w-fit border-primary/30 text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.2)] gap-2 px-4 py-2 bg-background/50">
                <Bot className="w-4 h-4 text-primary" />
                <span>Integra AstroAssist AI</span>
              </Badge>
            </motion.div>
            
            <motion.h2 variants={FADE_IN_RIGHT} className="text-5xl md:text-6xl font-black tracking-tighter leading-[1.1] text-foreground">
              Tu Asesor Experto, <br/>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-400 text-glow">Disponible 24/7</span>
            </motion.h2>
            
            <motion.p variants={FADE_IN_RIGHT} className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light max-w-lg">
              No estás solo bajo las estrellas. Nuestra IA desarrollada a medida conoce el catálogo completo y evalúa condiciones técnicas para asegurar la fotografía perfecta.
            </motion.p>
            
            <motion.ul variants={STAGGER_CONTAINER} className="space-y-6 mt-4">
              <motion.li variants={FADE_IN_RIGHT} className="flex items-center gap-4 text-foreground group">
                <div className="p-3 rounded-2xl bg-secondary/80 border border-white/5 group-hover:border-primary/30 group-hover:bg-primary/20 transition-colors"><Sparkles className="w-5 h-5 text-primary" /></div>
                <span className="font-medium md:text-lg tracking-tight">Recomendaciones técnicas instantáneas</span>
              </motion.li>
              <motion.li variants={FADE_IN_RIGHT} className="flex items-center gap-4 text-foreground group">
                <div className="p-3 rounded-2xl bg-secondary/80 border border-white/5 group-hover:border-primary/30 group-hover:bg-primary/20 transition-colors"><Zap className="w-5 h-5 text-yellow-400" /></div>
                <span className="font-medium md:text-lg tracking-tight">Cálculo de compatibilidad óptica y Cargas útiles</span>
              </motion.li>
              <motion.li variants={FADE_IN_RIGHT} className="flex items-center gap-4 text-foreground group">
                <div className="p-3 rounded-2xl bg-secondary/80 border border-white/5 group-hover:border-primary/30 group-hover:bg-primary/20 transition-colors"><ShieldCheck className="w-5 h-5 text-green-400" /></div>
                <span className="font-medium md:text-lg tracking-tight">Evaluación de niveles para principiantes</span>
              </motion.li>
            </motion.ul>
          </motion.div>

          <motion.div 
            variants={FADE_IN_LEFT} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }}
            className="relative w-full h-[650px] max-h-[85vh] flex items-center justify-center lg:justify-end group"
          >
            {/* Huge background glow behind chat reacting to group hover */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.2),transparent_70%)] rounded-3xl blur-[60px] -z-10 group-hover:blur-[80px] transition-all duration-[3s]" />
            <div className="w-full lg:w-[95%] h-full glass rounded-[2rem] overflow-hidden flex flex-col shadow-2xl border border-white/10 group-hover:border-primary/30 transition-colors duration-1000">
               <ChatWindow />
            </div>
          </motion.div>

        </div>
      </div>
    </SectionContainer>
  );
}
