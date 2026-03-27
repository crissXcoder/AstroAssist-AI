"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, Sparkles, AlertCircle, Info, ArrowRight } from "lucide-react";
import { Message } from "@/hooks/useChat";
import ReactMarkdown from "react-markdown";
import React, { isValidElement } from "react";
import remarkGfm from "remark-gfm";
import productsData from "@/data/products.json";
import type { Product } from "@/types/catalog";

const products = productsData as Product[];

export function ChatMessage({ message }: { message: Message }) {
  const isBot = message.role === "assistant";

  const dateObj = message.createdAt instanceof Date 
    ? message.createdAt 
    : new Date(message.createdAt || Date.now());

  // Helper to render text with nested product cards
  const renderTextWithProducts = (text: string) => {
    if (!text.includes("[[PRODUCT:") || !text.includes("]]")) {
      return text;
    }

    const parts = text.split(/(\[\[PRODUCT:.*?\]\])/g);
    return (
      <div className="space-y-4 my-2">
        {parts.map((part, i) => {
          if (part.startsWith("[[PRODUCT:") && part.endsWith("]]")) {
            const productId = part.replace("[[PRODUCT:", "").replace("]]", "").trim();
            const product = products.find(p => p.id === productId);
            if (!product) return null;
            
            return (
              <div key={i} className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl overflow-hidden flex items-center gap-4 p-4 group hover:bg-indigo-500/10 transition-all duration-300 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-black shrink-0 relative border border-white/5">
                  <img src={product.images.primary} alt={product.nameEn} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors leading-tight mb-1">{product.nameEs}</h4>
                      <p className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase">{product.category}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-300 bg-white/5 px-2 py-1 rounded-md">{product.price}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-tighter">{product.recommendedLevel}</span>
                    <span className="text-[10px] text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold cursor-pointer">Detalles <ArrowRight className="w-2.5 h-2.5" /></span>
                  </div>
                </div>
              </div>
            );
          }
          return part ? <span key={i}>{part}</span> : null;
        })}
      </div>
    );
  };

  const renderContent = (content: string) => {
    return (
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-lg font-bold mt-4 mb-2">{children}</h1>,
          h2: ({ children }) => <h2 className="text-md font-bold mt-3 mb-1 text-indigo-400">{children}</h2>,
          p: ({ children }) => {
            const text = isValidElement(children) 
              ? "" 
              : Array.isArray(children) 
                ? children.map(c => (typeof c === 'string' ? c : '')).join("")
                : String(children || "");

            // Handle [HEADER] formatting with restricted list
            const ALLOWED_HEADERS = ["ENTENDIMIENTO", "RECOMENDACIÓN", "POR QUÉ", "PRÓXIMO PASO", "CONSEJO", "TÉCNICA", "CONFIGURACIÓN"];
            if (text.startsWith("[") && text.includes("]")) {
              const [header, ...rest] = text.split("]");
              const headerKey = header.replace("[", "").trim().toUpperCase();
              
              if (ALLOWED_HEADERS.includes(headerKey)) {
                return (
                  <div className="mt-6 mb-4 first:mt-2 animate-in fade-in slide-in-from-left-2 duration-500">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[10px] uppercase font-black tracking-widest text-indigo-400 mb-2.5 shadow-sm shadow-indigo-500/5">
                      <Sparkles className="w-2.5 h-2.5" /> {headerKey}
                    </span>
                    <div className="text-[15px] font-normal leading-relaxed text-neutral-200 pl-1 border-l-2 border-indigo-500/20 ml-1 py-0.5">
                      {renderTextWithProducts(rest.join("]").trim())}
                    </div>
                  </div>
                );
              }
            }
            
            return (
              <p className="mb-4 last:mb-0 leading-relaxed font-normal text-neutral-300/90 tracking-tight">
                {renderTextWithProducts(text)}
              </p>
            );
          },
          ul: ({ children }) => <ul className="space-y-2 mb-4 list-none">{children}</ul>,
          li: ({ children }) => (
            <li className="flex gap-2 text-sm font-light text-neutral-400">
              <span className="text-indigo-500 mt-1.5">•</span>
              <span>{children}</span>
            </li>
          ),
          strong: ({ children }) => <strong className="font-bold text-white tracking-tight">{children}</strong>,
          code: ({ children }) => <code className="bg-white/5 px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>,
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  return (
    <div className={cn("flex w-full gap-3", isBot ? "justify-start" : "justify-end")}>
      {isBot && (
        <Avatar className="w-9 h-9 border border-indigo-500/30 bg-indigo-500/10 mt-1 flex items-center justify-center shrink-0">
          <AvatarFallback className="bg-transparent">
            <Bot className="w-5 h-5 text-indigo-400" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div 
        className={cn(
          "max-w-[88%] px-5 py-4 rounded-3xl",
          isBot 
            ? "bg-white/[0.03] text-neutral-200 rounded-tl-sm border border-white/[0.05] backdrop-blur-md shadow-xl" 
            : "bg-indigo-600 text-white rounded-tr-sm shadow-lg shadow-indigo-600/20"
        )}
      >
        <div className="prose prose-invert prose-sm max-w-none">
          {renderContent(message.content)}
        </div>
        
        <div className={cn(
          "flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.05]",
          !isBot && "justify-end border-indigo-500/30"
        )}>
          {isBot && <Sparkles className="w-3 h-3 text-indigo-400 opacity-50" />}
          <span className={cn(
            "text-[10px] opacity-40 font-medium tracking-widest uppercase",
            !isBot && "text-right"
          )}>
            {dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            {isBot && " • AstroAssist Expert"}
          </span>
        </div>
      </div>

      {!isBot && (
        <Avatar className="w-9 h-9 border border-indigo-500/30 bg-indigo-600 mt-1 flex items-center justify-center shrink-0">
          <AvatarFallback className="bg-transparent">
            <User className="w-5 h-5 text-white" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
