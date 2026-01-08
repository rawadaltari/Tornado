import { useEffect, useState } from 'react';
import logoImage from '/assets/logo.jpg';

interface LoaderProps {
  onLoadComplete: () => void;
}

export function Loader({ onLoadComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      if (currentProgress > 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // اكتمال التحميل
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            onLoadComplete();
          }, 300);
        }, 300);
      }
      setProgress(currentProgress);
    }, 30);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = 'auto';
    };
  }, [onLoadComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black transition-opacity duration-300">
      {/* خلفية الصورة محسنة للجوال */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="relative w-full h-full">
          <img
            src={logoImage}
            alt="Logo"
            className="w-full h-full object-cover scale-105 opacity-95"
            style={{
              filter: 'brightness(0.95) contrast(1.1) saturate(1.1)',
            }}
          />
          
          {/* طبقات تدرج أخف */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
          
          {/* تأثير توهج أخف في المنتصف */}
          <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.2) 80%)" />
        </div>
      </div>

      {/* طبقة شفافية أخف */}
      <div className="absolute inset-0 bg-black/5" />

      {/* النسبة المئوية في وسط الشاشة */}
      <div className="relative z-10 text-center mb-6">
        <div className="text-white text-5xl sm:text-6xl font-bold drop-shadow-lg">
          {progress}%
        </div>
      </div>

      {/* شريط التقدم في أسفل الشاشة */}
      <div className="absolute bottom-8 sm:bottom-10 left-0 right-0 px-6">
        <div className="w-full max-w-xs mx-auto">
          <div className="h-1.5 bg-gray-800/80 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-primary-light via-accent to-primary-dark rounded-full transition-all duration-200 relative"
              style={{ width: `${progress}%` }}
            >
              {/* تأثير توهج خفيف للشريط */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}