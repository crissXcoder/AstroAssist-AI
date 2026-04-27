"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import { EASING, ANIMATION } from "@/shared/utils/motion";
import { Badge } from "./badge";

interface SectionProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
  delay?: number;
  glass?: boolean;
  background?: React.ReactNode;
  containerClassName?: string;
}

export function SectionContainer({ 
  className, 
  children, 
  delay = 0, 
  glass = false,
  background,
  containerClassName,
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
        className
      )}
      {...props}
    >
      {background}
      <div className={cn(
        "container px-4 md:px-6 mx-auto relative z-10",
        glass && "glass-panel rounded-4xl p-6 md:p-10 border border-white/5 shadow-2xl",
        containerClassName
      )}>
        {children}
      </div>
    </motion.section>
  );
}

interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  badgeText?: string;
  badgeIcon?: React.ReactNode;
  badgeNode?: React.ReactNode;
  titleNode?: React.ReactNode;
  title?: string;
  titlePart1?: string;
  titlePart2?: string;
  description?: string;
  descriptionClassName?: string;
  titleClassName?: string;
  align?: "left" | "center" | "right";
}

export function SectionHeader({
  badgeText,
  badgeIcon,
  badgeNode,
  titleNode,
  title,
  titlePart1,
  titlePart2,
  description,
  className,
  descriptionClassName,
  titleClassName,
  align = "center",
  ...props
}: SectionHeaderProps) {
  return (
    <div 
      className={cn(
        "flex flex-col space-y-6 mb-24", 
        align === "center" && "items-center text-center justify-center",
        align === "left" && "items-start text-left justify-start",
        align === "right" && "items-end text-right justify-end",
        className
      )} 
      {...props}
    >
      {badgeNode}
      {badgeText && (
        <Badge variant="glass" className="bg-primary/5 border-primary/10 text-label-sm text-text-muted">
          {badgeIcon && <>{badgeIcon}</>}
          {badgeText}
        </Badge>
      )}
      {titleNode ? (
        <h2 className={cn("text-headline-lg font-semibold tracking-tight text-text-main leading-[1.08]", titleClassName)}>
          {titleNode}
        </h2>
      ) : title ? (
        <h2 className={cn("text-headline-lg md:text-headline-xl font-semibold tracking-tight text-text-main leading-[1.08]", titleClassName)}>
          {title}
        </h2>
      ) : (titlePart1 && (
        <h2 className={cn("text-headline-lg md:text-headline-xl font-semibold tracking-tight text-text-main leading-[1.08]", titleClassName)}>
          {titlePart1} {titlePart2 && (
            <>
              <br className="md:hidden" />
              <span className="text-primary">{titlePart2}</span>
            </>
          )}
        </h2>
      ))}
      {description && (
        <p className={cn(
          "text-text-soft md:text-body-lg font-light leading-relaxed", 
          align === "center" && "max-w-[600px] mx-auto",
          descriptionClassName
        )}>
          {description}
        </p>
      )}
    </div>
  );
}
