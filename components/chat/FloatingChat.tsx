"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatWindow } from "./ChatWindow";

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-20 right-0 w-[400px] h-[650px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)] bg-card/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
            >
               <ChatWindow />
            </motion.div>
          )}
        </AnimatePresence>

        <Button 
          onClick={() => setIsOpen(!isOpen)}
          size="icon" 
          className="h-16 w-16 rounded-full shadow-[0_0_30px_rgba(var(--primary),0.5)] hover:shadow-[0_0_40px_rgba(var(--primary),0.8)] transition-all bg-primary/90 hover:bg-primary backdrop-blur-md hover:scale-105 border border-white/10"
        >
          {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageSquare className="h-6 w-6 text-white" />}
        </Button>
      </div>
    </>
  );
}
