"use client";

import { useRef, useEffect } from "react";
import { Bot, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "./ChatMessage";
import { MessageInput } from "./MessageInput";
import { useChat } from "@/hooks/useChat";

export function ChatWindow() {
  const { messages, input, setInput, sendMessage, isLoading, clearHistory } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full w-full bg-background/50 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-card/40 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 relative">
            <Bot className="w-5 h-5 text-primary" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground tracking-tight">AstroAssist AI</h3>
            <p className="text-xs text-green-400 font-medium tracking-wide">En línea</p>
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
