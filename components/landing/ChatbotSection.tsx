"use client";

import { SectionContainer } from "@/components/ui/section";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { Badge } from "@/components/ui/badge";
import { Bot, Sparkles, Zap, ShieldCheck } from "lucide-react";

export function ChatbotSection() {
  return (
    <SectionContainer delay={0.2} className="py-24 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <div className="flex flex-col space-y-6">
            <Badge variant="glass" className="w-fit border-primary/30 text-primary gap-2">
              <Bot className="w-4 h-4" />
              AstroAssist AI
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
              Tu Asesor Experto, <br/>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-400">Disponible 24/7</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              No estás solo bajo las estrellas. Nuestra inteligencia artificial integrada conoce nuestro catálogo completo y puede recomendarte la configuración perfecta para tus necesidades fotográficas o de observación visual.
            </p>
            
            <ul className="space-y-4 mt-6">
              <li className="flex items-center gap-4 text-foreground">
                <div className="p-2 rounded-full bg-primary/20"><Sparkles className="w-4 h-4 text-primary" /></div>
                <span className="font-medium text-sm md:text-base">Recomendaciones personalizadas al instante</span>
              </li>
              <li className="flex items-center gap-4 text-foreground">
                <div className="p-2 rounded-full bg-primary/20"><Zap className="w-4 h-4 text-primary" /></div>
                <span className="font-medium text-sm md:text-base">Resolución de dudas sobre compatibilidad técnica</span>
              </li>
              <li className="flex items-center gap-4 text-foreground">
                <div className="p-2 rounded-full bg-primary/20"><ShieldCheck className="w-4 h-4 text-primary" /></div>
                <span className="font-medium text-sm md:text-base">Orientación garantizada para principiantes</span>
              </li>
            </ul>
          </div>

          <div className="relative w-full h-[600px] max-h-[80vh] flex items-center justify-center lg:justify-end">
             {/* Huge background glow behind chat */}
            <div className="absolute inset-0 bg-linear-to-tr from-primary/30 to-transparent rounded-3xl blur-[80px] -z-10" />
            <div className="w-full lg:w-[90%] h-full glass rounded-3xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(var(--primary),0.2)] border border-primary/30">
               <ChatWindow />
            </div>
          </div>

        </div>
      </div>
    </SectionContainer>
  );
}
