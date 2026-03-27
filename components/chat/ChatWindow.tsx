"use client";

import { useRef, useEffect } from "react";
import { Bot, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "./ChatMessage";
import { MessageInput } from "./MessageInput";
import { useChat } from "@/hooks/useChat";

export function ChatWindow() {
  const { messages, input, setInput, sendMessage, isLoading, error, status, clearHistory } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const getStatusConfig = () => {
    if (isLoading) return { color: "bg-amber-400", label: "Procesando...", pulse: true };
    
    switch (status) {
      case 'error_auth': return { color: "bg-red-500", label: "Error de Configuración", pulse: false };
      case 'error_quota': return { color: "bg-amber-500", label: "Límite de Cuota (Free)", pulse: false };
      case 'error_model': return { color: "bg-red-400", label: "Modelo no Disponible", pulse: false };
      case 'offline': return { color: "bg-neutral-500", label: "Servidor Desconectado", pulse: false };
      default: return { color: "bg-emerald-500", label: "Sistemas Online", pulse: false };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="flex flex-col h-full w-full bg-background/50 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-card/40 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 relative shadow-inner">
            <Bot className={cn("w-5 h-5 text-indigo-400 transition-all duration-500", isLoading && "animate-pulse scale-110 text-indigo-300")} />
            <span className={cn(
              "absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-950 transition-all duration-500 shadow-[0_0_8px_rgba(0,0,0,0.5)]",
              statusConfig.color,
              statusConfig.pulse && "animate-pulse shadow-sm shadow-current"
            )} />
          </div>
          <div>
            <h3 className="font-bold text-white tracking-tight text-sm">AstroAssist AI</h3>
            <p className={cn(
              "text-[10px] font-black uppercase tracking-widest transition-colors duration-500",
              statusConfig.color.replace('bg-', 'text-')
            )}>
              {statusConfig.label}
            </p>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={clearHistory}
          title="Borrar historial"
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages Area - Native overflow scroll for reliable scrollTop manipulation */}
      <div className="flex-1 p-6 overflow-y-auto" ref={scrollRef}>
        <div className="flex flex-col gap-6 pb-4 min-h-full justify-end">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isLoading && (
            <div className="flex w-full justify-start gap-3 animate-in fade-in duration-300">
              <div className="w-8 h-8 rounded-full border border-primary/20 bg-primary/10 mt-1 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-secondary/70 px-4 py-4 rounded-2xl rounded-tl-sm border border-border/30 flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-card/40 border-t border-white/5 backdrop-blur-md shrink-0">
        <MessageInput 
          input={input}
          setInput={setInput}
          onSubmit={sendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
