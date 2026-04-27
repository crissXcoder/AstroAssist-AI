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
    if (isLoading) return { color: "bg-warning", label: "Procesando...", pulse: true };
    
    switch (status) {
      case 'error_auth': return { color: "bg-error", label: "Error de Configuración", pulse: false };
      case 'error_quota': return { color: "bg-warning", label: "Límite de Cuota (Free)", pulse: false };
      case 'error_model': return { color: "bg-error", label: "Modelo no Disponible", pulse: false };
      case 'offline': return { color: "bg-text-muted", label: "Servidor Desconectado", pulse: false };
      default: return { color: "bg-success", label: "Sistemas Online", pulse: false };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="flex flex-col h-full w-full bg-surface-container-low/95 backdrop-blur-3xl">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-surface-container/50 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 relative shadow-inner">
            <Bot className={cn("w-6 h-6 text-primary transition-all duration-500", isLoading && "animate-pulse scale-110 text-primary-hover")} />
            <span className={cn(
              "absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2 border-background transition-all duration-500 shadow-lg",
              statusConfig.color,
              statusConfig.pulse && "animate-pulse shadow-sm shadow-current"
            )} />
          </div>
          <div>
            <h3 className="font-bold text-text-main tracking-tight text-sm">AstroAssist AI</h3>
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
          className="text-text-muted hover:text-error hover:bg-error/10 transition-colors h-10 w-10"
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
              <div className="w-10 h-10 rounded-full border border-primary/20 bg-primary-container mt-1 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div className="bg-surface-container-high px-5 py-4 rounded-xl rounded-tl-sm border border-white/5 flex items-center gap-1.5 shadow-xl">
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-5 bg-surface-container/50 border-t border-white/5 backdrop-blur-md shrink-0">
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
