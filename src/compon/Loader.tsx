import { useEffect, useRef } from 'react';
import logoImage from '../assets/logo.png';
import gsap from 'gsap';

interface LoaderProps {
  onLoadComplete: () => void;
  slideDirection?: 'left' | 'right' | 'up' | 'down';
}

export function Loader({
  onLoadComplete,
  slideDirection = 'left',
}: LoaderProps) {
  const logoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // تحديد اتجاه التزحلق
  const getSlideValues = () => {
    switch (slideDirection) {
      case 'left':
        return { x: '-100vw', rotation: -15 };
      case 'right':
        return { x: '100vw', rotation: 15 };
      case 'up':
        return { y: '-100vh', rotation: -10 };
      case 'down':
        return { y: '100vh', rotation: 10 };
      default:
        return { x: '-100vw', rotation: -15 };
    }
  };

  useEffect(() => {
    // 🔒 اقفل السكرول أثناء اللودر
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;

    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';

    if (!logoRef.current || !containerRef.current) return;

    const slideValues = getSlideValues();

    const timeline = gsap.timeline({
      onComplete: () => {
        onLoadComplete();
      },
    });

    // 1. تكبير مع توهج خفيف
    timeline.to(logoRef.current, {
      scale: 1.5,
      duration: 2,
      ease: 'power2.out',
      boxShadow: '0 0 25px rgba(255, 255, 255, 0.1)',
    });

    // 2. تزحلق للخارج
    timeline.to(logoRef.current, {
      ...slideValues,
      scale: 0.7,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.in',
      boxShadow: '0 0 50px rgba(255, 255, 255, 0.3)',
    });

    // 3. إخفاء الحاوية
    timeline.to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
    });

    // ✅ cleanup مهم جدًا
    return () => {
      timeline.kill();
      document.body.style.overflow = originalOverflow || 'auto';
      document.body.style.height = originalHeight || 'auto';
    };
  }, [onLoadComplete, slideDirection]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-background-light flex items-center justify-center z-[9999]"
    >
      <div ref={logoRef} className="relative">
        <img
          src={logoImage}
          alt="Restaurant Logo"
          className="w-64 h-64 object-contain"
        />
      </div>
    </div>
  );
}
