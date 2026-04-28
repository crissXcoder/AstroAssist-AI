"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ProductImages } from "../../types";

interface ProductGalleryProps {
  images: ProductImages;
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const allImages = [images.primary, ...(images.gallery || [])];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Viewport */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-surface-container-low border border-outline/30 group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full"
          >
            <Image
              src={allImages[currentIndex]}
              alt={`${name} - View ${currentIndex + 1}`}
              fill
              className="object-contain p-8"
              priority
            />
            {/* Reflection Effect */}
            <div className="absolute inset-0 bg-linear-to-tr from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface/50 border border-outline/30 text-text-main opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-surface hover:scale-110 active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface/50 border border-outline/30 text-text-main opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-surface hover:scale-110 active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
        
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 blur-[100px] rounded-full" />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "shrink-0 rounded-lg overflow-hidden border border-white/5 hover:border-primary/40 transition-all duration-300 relative group/thumb",
                currentIndex === idx 
                  ? "border-primary ring-2 ring-primary/20 scale-95" 
                  : "border-outline/30 hover:border-outline/60"
              )}
            >
              <Image
                src={img}
                alt={`${name} thumb ${idx + 1}`}
                fill
                className="object-cover p-2"
              />
              {currentIndex !== idx && (
                <div className="absolute inset-0 bg-background/40 hover:bg-background/0 transition-colors" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
