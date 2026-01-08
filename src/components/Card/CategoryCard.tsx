// CategoryCard.tsx
import type { Category } from '../../lib/database.types';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  getVerticalOffset,
  getCardVariants,
  getImageVariants,
  getContentVariants,
  getCircleSize,
  getTextSizes,
  getMarginBottom,
  getViewportMargin
} from './CategoryCardAnimations';
import { useTranslation } from 'react-i18next';

interface CategoryCardProps {
  category: Category & { image?: string };
  itemCount: number;
  onClick: (category: Category) => void;
  isCollection?: boolean;
  index: number;
  customIcon?: React.ReactNode;
  customDescription?: string;
}

export function CategoryCard({
  category,
  itemCount,
  onClick,
  isCollection = false,
  index,
  customIcon,
  customDescription,
}: CategoryCardProps) {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const verticalOffset = getVerticalOffset(index, isMobile);
  const cardVariants = getCardVariants(index);
  const imageVariants = getImageVariants(index);
  const contentVariants = getContentVariants(index);
  const circleSize = getCircleSize(isMobile);
  const textSizes = getTextSizes(isMobile);
  const marginBottom = getMarginBottom(isMobile);
  const viewportMargin = getViewportMargin(isMobile);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageUrl = category.image || (category as any).image_url || '';
  const firstLetter = category.name.charAt(0);

  // Reset image error when imageUrl changes
  useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      whileHover="hover"
      whileTap="tap"
      viewport={{ once: true, amount: 0.1, margin: viewportMargin }}
      variants={cardVariants}
      onClick={() => onClick(category)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(category);
        }
      }}
      role="button"
      tabIndex={0}
      className={`
        relative bg-[#c3a05c]
        rounded-3xl shadow-lg hover:shadow-xl
        transition-all duration-200
        pt-14 pb-5 px-3
        flex flex-col items-center text-center
        cursor-pointer h-full min-h-[170px] 
        ${verticalOffset} ${marginBottom}
        border-2 border-yellow-100 hover:border-[#285349]/20
        overflow-visible group transform-gpu will-change-transform
      `}
    >
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#285349]/10 to-transparent opacity-0"
        variants={{ hover: { opacity: 1 } }}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        variants={imageVariants}
        className={`${circleSize.className} z-10`}
        style={{ filter: 'drop-shadow(0 8px 15px rgba(40, 83, 73, 0.2))' }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-yellow-50 shadow-md transform -rotate-6 opacity-60 group-hover:opacity-80 transition-opacity duration-200" />
          
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
            {customIcon ? (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#285349]/10 to-[#f4ce62]/20">
                <div className="text-[#285349] transform scale-110">
                  {customIcon}
                </div>
              </div>
            ) : imageUrl && !imageError ? (
              <motion.img
                src={imageUrl}
                alt={category.name}
                loading="lazy"
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#285349]/10 to-[#f4ce62]/20">
                <motion.span
                  className={`text-[#285349] ${textSizes.placeholder} font-bold`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                >
                  {firstLetter}
                </motion.span>
              </div>
            )}
          </div>

          <motion.div
            className="absolute -inset-1 rounded-full border-2 border-[#285349]/30"
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      <motion.div
        variants={contentVariants}
        className="flex-1 flex flex-col justify-center items-center pt-8"
      >
        <motion.h2
          className={`${textSizes.title} font-bold text-[#285349] mb-1 line-clamp-2 min-h-[1.6rem] px-1 text-xl`}
          whileHover={{ color: "#285349", scale: 1.02 }}
          transition={{ duration: 0.15 }}
        >
          {category.name}
        </motion.h2>

        {customDescription && (
          <motion.p
            className="text-xs text-[#285349]/70 mb-2 px-1 line-clamp-2"
            whileHover={{ color: "#285349" }}
            transition={{ duration: 0.15 }}
          >
            {customDescription}
          </motion.p>
        )}

        {isCollection ? (
          <motion.span
            className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 bg-gradient-to-r from-[#285349]/10 to-[#f4ce62]/20 rounded-full border border-[#285349]/20 text-[#285349]"
            whileHover={{ scale: 1.02, backgroundColor: "rgba(40, 83, 73, 0.15)" }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[10px]"
            >
              ✨
            </motion.span>
            {t('collection')}
          </motion.span>
        ) : (
          <motion.div
            className="relative mt-0.5"
            whileHover={{ scale: 1.02 }}
          >
            <span className={`${textSizes.count} font-semibold text-[#285349]`}>
              {itemCount} {itemCount === 1 ? t('item') : t('items')}
            </span>
            <motion.div
              className="absolute -inset-1.5 bg-gradient-to-r from-[#285349]/10 to-[#f4ce62]/10 rounded-full -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        )}
      </motion.div>

      {!isMobile && (
        <>
          <motion.div
            className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <svg className="w-3 h-3 text-[#285349]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>

          <div className="absolute top-0 left-0 w-3 h-3 rounded-tr-3xl bg-gradient-to-br from-[#285349]/5 to-transparent" />
          <div className="absolute top-0 right-0 w-3 h-3 rounded-tl-3xl bg-gradient-to-bl from-[#285349]/5 to-transparent" />
          <div className="absolute bottom-0 left-0 w-3 h-3 rounded-br-3xl bg-gradient-to-tr from-[#285349]/5 to-transparent" />
          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-bl-3xl bg-gradient-to-tl from-[#285349]/5 to-transparent" />
        </>
      )}
    </motion.div>
  );
}