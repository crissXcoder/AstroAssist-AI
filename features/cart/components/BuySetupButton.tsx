"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { Product } from "@/features/catalog/types";
import { useCart } from "@/features/cart/hooks/useCart";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/cn";

interface BuySetupButtonProps {
  products: Product[];
  locale: "en" | "es";
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}

export function BuySetupButton({ 
  products, 
  locale, 
  className,
  variant = "primary" 
}: BuySetupButtonProps) {
  const { addBundle } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  if (!products || products.length === 0) return null;

  const totalPrice = products.reduce((sum, p) => {
    // Parse price string like "$1,299.00" or similar
    const num = parseFloat(p.price.replace(/[$,]/g, ""));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const formattedPrice = new Intl.NumberFormat(locale === "en" ? "en-US" : "es-ES", {
    style: "currency",
    currency: "USD",
  }).format(totalPrice);

  const handleAdd = () => {
    addBundle(products);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const label = locale === "en" ? "Buy Full Setup" : "Comprar Setup Completo";
  const addedLabel = locale === "en" ? "Added to Cart!" : "¡Añadido al Carrito!";
  const itemsLabel = locale === "en" ? "items" : "productos";

  return (
    <Button
      onClick={handleAdd}
      className={cn(
        "group relative overflow-hidden rounded-full h-14 px-8 transition-all duration-500",
        variant === "primary" ? "bg-primary text-on-primary hover:bg-primary-hover shadow-xl shadow-primary/20" : "",
        variant === "secondary" ? "bg-surface-container-highest text-text-main hover:bg-surface-bright" : "",
        className
      )}
      disabled={isAdded}
    >
      <motion.div
        animate={{ y: isAdded ? -40 : 0 }}
        className="flex items-center gap-3"
      >
        <div className="flex flex-col items-start leading-tight">
          <span className="text-label-md font-bold tracking-tight">{label}</span>
          <span className="text-[10px] opacity-70 uppercase tracking-widest font-medium">
            {products.length} {itemsLabel} • {formattedPrice}
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
          <ShoppingCart className="w-4 h-4" />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 40 }}
        animate={{ y: isAdded ? 0 : 40 }}
        className="absolute inset-0 flex items-center justify-center gap-2 bg-success text-on-success"
      >
        <Check className="w-5 h-5" />
        <span className="font-bold">{addedLabel}</span>
      </motion.div>
    </Button>
  );
}
