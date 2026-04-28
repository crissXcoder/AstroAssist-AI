"use client";

import { useCart } from "../hooks/useCart";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/utils/cn";

interface CartCounterProps {
  className?: string;
}

export function CartCounter({ className }: CartCounterProps) {
  const { totalItems, isHydrated, toggleCart } = useCart();

  if (!isHydrated) return (
    <div className={cn("p-2.5 rounded-xl border border-outline/20 bg-surface-bright/30 text-text-muted opacity-50", className)}>
      <ShoppingCart size={20} />
    </div>
  );

  return (
    <button
      onClick={toggleCart}
      className={cn(
        "relative p-2.5 rounded-xl border border-outline/20 bg-surface-bright/30 text-text-soft hover:text-primary hover:border-primary/30 transition-all group",
        className
      )}
    >
      <ShoppingCart size={20} />
      
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full border-2 border-background shadow-lg shadow-primary/20"
          >
            {totalItems > 99 ? "99+" : totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
