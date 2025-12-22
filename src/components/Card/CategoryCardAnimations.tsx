// CategoryCardAnimations.tsx
import { Variants } from 'framer-motion';

export const getVerticalOffset = (index: number, isMobile: boolean): string => {
  const desktopOffsets = ['mt-0', 'mt-4', 'mt-2', 'mt-6', 'mt-1', 'mt-5', 'mt-3', 'mt-7'];
  const mobileOffsets = ['mt-0', 'mt-2', 'mt-1', 'mt-3', 'mt-0', 'mt-2', 'mt-1', 'mt-3'];
  const offsets = isMobile ? mobileOffsets : desktopOffsets;
  return offsets[index % offsets.length];
};

export const getCardVariants = (index: number): Variants => ({
  offscreen: { y: 50, opacity: 0, scale: 0.9 },
  onscreen: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", bounce: 0.3, duration: 0.5, delay: index * 0.05 }
  },
  hover: {
    y: -8,
    scale: 1.03,
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
    transition: { type: "spring", stiffness: 250, damping: 12 }
  },
  tap: { scale: 0.97 }
});

export const getImageVariants = (index: number): Variants => ({
  offscreen: { scale: 0.8, opacity: 0 },
  onscreen: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, duration: 0.4, delay: index * 0.05 + 0.1 }
  },
  hover: {
    scale: 1.1,
    rotate: 2,
    transition: { type: "spring", stiffness: 180 }
  }
});

export const getContentVariants = (index: number): Variants => ({
  offscreen: { opacity: 0, y: 10 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.05 + 0.15, duration: 0.3 }
  }
});

export const getCircleSize = (isMobile: boolean) => {
  return isMobile 
    ? { className: 'absolute -top-8 w-24 h-24', textSize: 'text-lg' }
    : { className: 'absolute -top-10 w-28 h-28', textSize: 'text-xl' };
};

export const getTextSizes = (isMobile: boolean) => ({
  title: isMobile ? 'text-sm' : 'text-base',
  count: isMobile ? 'text-xs' : 'text-sm',
  placeholder: isMobile ? 'text-lg' : 'text-xl'
});

export const getMarginBottom = (isMobile: boolean): string => {
  return isMobile ? 'mb-4' : 'mb-6';
};

export const getViewportMargin = (isMobile: boolean): string => {
  return isMobile ? "-20px" : "-40px";
};