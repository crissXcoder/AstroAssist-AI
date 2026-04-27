"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatWindow } from "./ChatWindow";

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-open chat if URL hash matches #chat or #assistant
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#chat" || window.location.hash === "#assistant") {
        setIsOpen(true);
        // Optional: scroll to top or just show chat
      }
    };

    // Check on mount
    handleHashChange();

    // Listen for changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <>
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-16 right-0 md:bottom-20 w-[calc(100vw-2rem)] sm:w-[400px] h-[600px] md:h-[650px] max-h-[calc(100vh-6rem)] md:max-h-[calc(100vh-8rem)] bg-card/90 backdrop-blur-3xl border border-white/10 rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col z-50"
            >
               <ChatWindow />
            </motion.div>
          )}
        </AnimatePresence>

        <Button 
          onClick={() => setIsOpen(!isOpen)}
          size="icon" 
          className="h-14 w-14 md:h-16 md:w-16 rounded-full shadow-[0_0_30px_rgba(var(--primary),0.5)] hover:shadow-[0_0_40px_rgba(var(--primary),0.8)] transition-all bg-primary/90 hover:bg-primary backdrop-blur-md hover:scale-105 border border-white/10"
        >
          {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageSquare className="h-6 w-6 text-white" />}
        </Button>
      </div>
    </>
  );
}
