import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { Message } from "@/hooks/useChat";

export function ChatMessage({ message }: { message: Message }) {
  const isBot = message.role === "assistant";

  // Safeguard: handle missing createdAt or string dates
  const dateObj = message.createdAt instanceof Date 
    ? message.createdAt 
    : new Date(message.createdAt || Date.now());

  return (
    <div className={cn("flex w-full gap-3", isBot ? "justify-start" : "justify-end")}>
      {isBot && (
        <Avatar className="w-8 h-8 border border-primary/30 bg-primary/20 mt-1 flex items-center justify-center shrink-0">
          <AvatarFallback className="bg-transparent"><Bot className="w-5 h-5 text-primary" /></AvatarFallback>
        </Avatar>
      )}
      
      <div 
        className={cn(
          "max-w-[85%] text-sm px-4 py-3 rounded-2xl wrap-break-word",
          isBot 
            ? "bg-secondary/60 text-secondary-foreground rounded-tl-sm border border-white/5 backdrop-blur-sm" 
            : "bg-primary text-primary-foreground rounded-tr-sm shadow-md shadow-primary/20"
        )}
      >
        <p className="leading-relaxed whitespace-pre-wrap font-light">{message.content}</p>
        <span className={cn(
          "text-[10px] block mt-1.5 opacity-50 font-mono tracking-widest",
          !isBot && "text-right"
        )}>
          {dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </span>
      </div>

      {!isBot && (
        <Avatar className="w-8 h-8 border border-primary/30 bg-primary/20 mt-1 flex items-center justify-center shrink-0">
          <AvatarFallback className="bg-transparent"><User className="w-4 h-4 text-primary-foreground" /></AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
