"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASING, ANIMATION } from "@/lib/motion";

interface SectionProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
  delay?: number;
  glass?: boolean;
}

export function SectionContainer({ 
  className, 
  children, 
  delay = 0, 
  glass = false,
  ...props 
}: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: ANIMATION.duration.slow, 
        ease: EASING.spring,
        delay 
      }}
      className={cn(
        "relative w-full overflow-hidden",
        glass && "glass-panel rounded-[2rem] p-6 md:p-10 border border-white/5 shadow-2xl",
        className
      )}
      {...props}
    >
      {children}
    </motion.section>
  );
}
