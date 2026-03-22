import { Variants } from "framer-motion";

type EaseCubicBezier = [number, number, number, number];

export const EASING = {
  spring: [0.22, 1, 0.36, 1] as EaseCubicBezier,
  soft: [0.16, 1, 0.3, 1] as EaseCubicBezier,
  expo: [0.19, 1, 0.22, 1] as EaseCubicBezier,
};

export const ANIMATION = {
  duration: {
    base: 0.6,
    slow: 0.8,
    fast: 0.4,
  },
};

export const FADE_IN_UP: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: ANIMATION.duration.base,
      ease: EASING.spring
    }
  }
};

export const SCALE_IN: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: ANIMATION.duration.base,
      ease: EASING.spring
    }
  }
};

export const FADE_IN_RIGHT: Variants = {
  initial: { opacity: 0, x: -40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION.duration.base,
      ease: EASING.spring
    }
  }
};

export const FADE_IN_LEFT: Variants = {
  initial: { opacity: 0, x: 40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION.duration.base,
      ease: EASING.spring
    }
  }
};

export const STAGGER_CONTAINER: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
};
