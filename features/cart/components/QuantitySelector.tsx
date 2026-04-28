"use client";

import React, { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/cn";
import { validateQuantity } from "../utils/cart-logic";

interface QuantitySelectorProps {
  quantity: number;
  onUpdate: (quantity: number) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  variant?: "default" | "compact" | "large";
  className?: string;
  disabled?: boolean;
}

export function QuantitySelector({
  quantity,
  onUpdate,
  onIncrement,
  onDecrement,
  min = 1,
  max = 99,
  variant = "default",
  className,
  disabled = false,
}: QuantitySelectorProps) {
  const [inputValue, setInputValue] = useState(String(quantity));

  useEffect(() => {
    setInputValue(String(quantity));
  }, [quantity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow empty string while typing
    if (val === "") {
      setInputValue("");
      return;
    }
    
    // Only allow numbers
    if (/^\d*$/.test(val)) {
      setInputValue(val);
      const parsed = parseInt(val, 10);
      if (!isNaN(parsed)) {
        onUpdate(validateQuantity(parsed));
      }
    }
  };

  const handleBlur = () => {
    const validated = validateQuantity(parseInt(inputValue, 10));
    setInputValue(String(validated));
    onUpdate(validated);
  };

  const isAtMin = quantity <= min;
  const isAtMax = quantity >= max;

  const sizeClasses = {
    compact: "h-8 px-1 gap-1",
    default: "h-10 px-1.5 gap-2",
    large: "h-14 px-2 gap-4",
  };

  const buttonSizeClasses = {
    compact: "h-6 w-6",
    default: "h-8 w-8",
    large: "h-10 w-10",
  };

  const inputSizeClasses = {
    compact: "w-8 text-sm",
    default: "w-10 text-base",
    large: "w-16 text-xl",
  };

  const iconSizes = {
    compact: 14,
    default: 16,
    large: 20,
  };

  return (
    <div 
      className={cn(
        "flex items-center bg-surface-bright/30 rounded-full border border-outline/10 backdrop-blur-sm transition-all duration-300",
        disabled && "opacity-50 pointer-events-none",
        sizeClasses[variant],
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onDecrement}
        disabled={isAtMin || disabled}
        aria-label="Decrease quantity"
        className={cn(
          "rounded-full hover:bg-primary/20 hover:text-primary transition-all shrink-0",
          buttonSizeClasses[variant]
        )}
      >
        <Minus size={iconSizes[variant]} />
      </Button>

      <div className="relative flex items-center justify-center overflow-hidden">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className={cn(
            "bg-transparent border-none text-center font-mono font-bold text-text-main focus:ring-0 focus:outline-none p-0",
            inputSizeClasses[variant]
          )}
        />
        {/* Animated Background Pulse on change */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={quantity}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="absolute inset-0 bg-primary/5 rounded-lg -z-10"
          />
        </AnimatePresence>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onIncrement}
        disabled={isAtMax || disabled}
        aria-label="Increase quantity"
        className={cn(
          "rounded-full hover:bg-primary/20 hover:text-primary transition-all shrink-0",
          buttonSizeClasses[variant]
        )}
      >
        <Plus size={iconSizes[variant]} />
      </Button>
    </div>
  );
}
