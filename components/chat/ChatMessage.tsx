"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, Sparkles, AlertCircle, Info, ArrowRight } from "lucide-react";
import { Message } from "@/hooks/useChat";
import { useRouter, useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import React, { isValidElement } from "react";
import remarkGfm from "remark-gfm";
import productsData from "@/data/products.json";
import type { Product } from "@/types/catalog";

const products = productsData as Product[];

export function ChatMessage({ message }: { message: Message }) {
  const isBot = message.role === "assistant";
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as string) || "es";

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
              <div key={i} className="bg-surface-container border border-white/5 rounded-xl overflow-hidden flex items-center gap-4 p-4 group hover:bg-surface-bright transition-all duration-300 shadow-xl animate-in fade-in slide-in-from-bottom-2">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-background shrink-0 relative border border-white/5">
                  <img src={product.images.primary} alt={product.nameEn} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-body-sm font-bold text-text-main group-hover:text-primary transition-colors leading-tight mb-0.5">{product.nameEs}</h4>
                      <p className="text-[10px] text-primary font-bold tracking-widest uppercase">{product.category}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-text-muted">{product.price}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                    <span className="text-[10px] text-text-faint uppercase tracking-tighter">{product.recommendedLevel}</span>
                    <button 
                      onClick={() => router.push(`/${locale}/catalogo?search=${product.id}`)}
                      className="text-[10px] text-primary hover:text-primary-hover transition-colors flex items-center gap-1 font-bold cursor-pointer bg-transparent border-none p-0"
                    >
                      {locale === 'en' ? 'Details' : 'Detalles'} <ArrowRight className="w-2.5 h-2.5" />
                    </button>
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
          h1: ({ children }) => <h1 className="text-title-md font-bold mt-4 mb-2 text-text-main">{children}</h1>,
          h2: ({ children }) => <h2 className="text-body-md font-bold mt-3 mb-1 text-primary">{children}</h2>,
          p: ({ children }) => {
            const text = isValidElement(children) 
              ? "" 
              : Array.isArray(children) 
                ? children.map(c => (typeof c === 'string' ? c : '')).join("")
                : String(children || "");

            const ALLOWED_HEADERS = ["ENTENDIMIENTO", "RECOMENDACIÓN", "POR QUÉ", "PRÓXIMO PASO", "CONSEJO", "TÉCNICA", "CONFIGURACIÓN"];
            
            // Si el texto contiene patrones tipo [HEADER], lo dividimos para procesar cada badge
            const headerRegex = new RegExp(`\\[(${ALLOWED_HEADERS.join("|")})\\]`, "gi");
            
            if (headerRegex.test(text)) {
              // Dividimos el texto manteniendo los delimitadores
              const parts = text.split(/(\[(?:ENTENDIMIENTO|RECOMENDACIÓN|POR QUÉ|PRÓXIMO PASO|CONSEJO|TÉCNICA|CONFIGURACIÓN)\])/gi);
              
              return (
                <div className="flex flex-col gap-1">
                  {parts.map((part, i) => {
                    const cleanPart = part.trim();
                    if (!cleanPart) return null;
                    
                    const headerMatch = cleanPart.match(/^\[(.*)\]$/);
                    const headerKey = headerMatch ? headerMatch[1].toUpperCase() : null;
                    
                    if (headerKey && ALLOWED_HEADERS.includes(headerKey)) {
                      return (
                        <div key={i} className="mt-6 mb-2 first:mt-2 animate-in fade-in slide-in-from-left-2 duration-500">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-[10px] uppercase font-black tracking-widest text-on-primary-container mb-2.5 shadow-sm shadow-primary/10">
                            <Sparkles className="w-2.5 h-2.5" /> {headerKey}
                          </span>
                        </div>
                      );
                    }
                    
                    return (
                      <p key={i} className="mb-4 last:mb-0 text-body-sm leading-relaxed text-text-soft/90 tracking-tight pl-3 border-l-2 border-primary/20 ml-1">
                        {renderTextWithProducts(cleanPart)}
                      </p>
                    );
                  })}
                </div>
              );
            }
            
            return (
              <p className="mb-4 last:mb-0 text-body-sm leading-relaxed text-text-soft/90 tracking-tight">
                {renderTextWithProducts(text)}
              </p>
            );
          },
          ul: ({ children }) => <ul className="space-y-2 mb-4 list-none">{children}</ul>,
          li: ({ children }) => (
            <li className="flex gap-2 text-body-sm text-text-muted">
              <span className="text-primary mt-1.5">•</span>
              <span>{children}</span>
            </li>
          ),
          strong: ({ children }) => <strong className="font-bold text-text-main tracking-tight">{children}</strong>,
          code: ({ children }) => <code className="bg-surface-bright px-1.5 py-0.5 rounded text-[11px] font-mono text-primary-hover">{children}</code>,
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  return (
    <div className={cn("flex w-full gap-3", isBot ? "justify-start" : "justify-end")}>
      {isBot && (
        <Avatar className="w-10 h-10 border border-primary/20 bg-primary-container mt-1 flex items-center justify-center shrink-0">
          <AvatarFallback className="bg-transparent">
            <Bot className="w-5 h-5 text-primary" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div 
        className={cn(
          "max-w-[88%] px-5 py-4 rounded-2xl",
          isBot 
            ? "bg-surface-container-high text-text-soft rounded-tl-sm border border-white/5 shadow-xl" 
            : "bg-primary text-on-primary rounded-tr-sm shadow-lg shadow-primary/20"
        )}
      >
        <div className="prose prose-invert prose-sm max-w-none">
          {renderContent(message.content)}
        </div>
        
        <div className={cn(
          "flex items-center gap-2 mt-3 pt-3 border-t border-white/5",
          !isBot && "justify-end border-white/10"
        )}>
          {isBot && <Sparkles className="w-3 h-3 text-primary opacity-50" />}
          <span className={cn(
            "text-[10px] opacity-40 font-bold tracking-widest uppercase",
            !isBot && "text-right"
          )}>
            {dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            {isBot && " • AstroAssist Expert"}
          </span>
        </div>
      </div>

      {!isBot && (
        <Avatar className="w-10 h-10 border border-primary/20 bg-primary mt-1 flex items-center justify-center shrink-0">
          <AvatarFallback className="bg-transparent">
            <User className="w-5 h-5 text-on-primary" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>

  );
}
