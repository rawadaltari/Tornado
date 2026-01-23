import { ChefHat, Coffee, Utensils } from "lucide-react";
import { useState, useEffect } from "react";
import { CategoryCard } from "../components/Card/CategoryCard";
import { CATEGORIES, MENU_ITEMS } from "../data/menuData";
import type { Category, MenuItem } from "../lib/database.types";
import TextType from "../compon/TextType";
import { motion, AnimatePresence } from "framer-motion";
import Steam from "../components/Steam";
import RestaurantFooter from "../components/RestaurantFooter";
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';

export default function TornadoMenu() {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedMenuType, setSelectedMenuType] = useState<"kitchen" | "bar" | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showMenuTypeModal, setShowMenuTypeModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // دالة للتعامل مع النقر على العنصر
  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
  };

  // دالة لترجمة اسم التصنيف
  const getTranslatedCategoryName = (categoryId: string) => {
    return t(`categories.${categoryId}`, categoryId);
  };

  // دالة لترجمة اسم المنتج
  const getTranslatedItemName = (itemId: string) => {
    // إذا كان العنصر يحتوي على كائن name و description
    const translated = t(`menuItems.${itemId}`, { returnObjects: true });
    if (translated && typeof translated === 'object' && 'name' in translated) {
      return (translated as { name: string }).name;
    }
    // البحث عن الاسم من البيانات الأصلية إذا لم تكن هناك ترجمة
    const item = MENU_ITEMS.find(i => i.id === itemId);
    return item?.name || itemId;
  };

  // دالة للحصول على وصف المنتج
  const getTranslatedItemDescription = (itemId: string) => {
    const translated = t(`menuItems.${itemId}`, { returnObjects: true });
    if (translated && typeof translated === 'object' && 'description' in translated) {
      return (translated as { description: string }).description;
    }
    return '';
  };

  const TropicalLeaf = ({
    className,
    style,
  }: {
    className?: string;
    style?: React.CSSProperties;
  }) => (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M256 20C140 80 40 200 40 320c0 100 80 160 200 160s200-60 200-160C440 200 360 80 256 20z"
        fill="currentColor"
      />
      <path
        d="M256 40v420"
        stroke="currentColor"
        strokeWidth="6"
        opacity="0.35"
      />
    </svg>
  );

  const FloralBackground = ({ count = 14 }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: isMobile ? 8 : count }).map((_, i) => {
          const size = isMobile 
            ? Math.random() * 100 + 80 
            : Math.random() * 120 + 60;
          
          const top = Math.random() * 80 + 10;
          const left = Math.random() * 80 + 10;
          
          const rotate = Math.random() * 360;
          const opacity = Math.random() * 0.08 + 0.04;

          return (
            <TropicalLeaf
              key={i}
              className="absolute text-white/90"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${top}%`,
                left: `${left}%`,
                transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
                opacity,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                transition: isMobile ? 'all 0.3s ease' : 'none'
              }}
            />
          );
        })}
        
        {!isMobile && (
          <>
            <TropicalLeaf
              className="absolute text-white/80"
              style={{
                width: '180px',
                height: '180px',
                top: '5%',
                left: '5%',
                transform: 'rotate(45deg)',
                opacity: 0.06,
              }}
            />
            <TropicalLeaf
              className="absolute text-white/80"
              style={{
                width: '200px',
                height: '200px',
                top: '85%',
                left: '90%',
                transform: 'rotate(120deg)',
                opacity: 0.05,
              }}
            />
          </>
        )}
      </div>
    );
  };

  // تصفية التصنيفات حسب نوع المنيو
  const getCategoriesByMenuType = (menuType: "kitchen" | "bar") => {
    return CATEGORIES.filter((category) => category.menu_type === menuType);
  };

  const handleMenuTypeClick = (menuType: "kitchen" | "bar") => {
    setSelectedMenuType(menuType);
    setShowMenuTypeModal(true);
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
  };

  const handleCloseMenuTypeModal = () => {
    setShowMenuTypeModal(false);
    setSelectedMenuType(null);
  };

  const getItemsByCategory = (categoryId: string) =>
    MENU_ITEMS.filter((item) => item.category_id === categoryId);

  // إحصائيات
  const kitchenItemsCount = MENU_ITEMS.filter((item) => {
    const category = CATEGORIES.find((cat) => cat.id === item.category_id);
    return category?.menu_type === "kitchen";
  }).length;

  const barItemsCount = MENU_ITEMS.filter((item) => {
    const category = CATEGORIES.find((cat) => cat.id === item.category_id);
    return category?.menu_type === "bar";
  }).length;

  useEffect(() => {
    document.body.style.overflow = showModal || showMenuTypeModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal, showMenuTypeModal]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="bg-white min-h-screen flex flex-col" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 text-center">
          <TextType
            text={[" ", "TORNADO DUBAI  Café and Restaurant "]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor
            cursorCharacter="|"
            className="text-2xl sm:text-3xl font-kufi text-gray-900"
          />
        </div>
      </header>

      {/* Hero */}
      <section className="  " />
      <img 
        src="/assets/1134.JPG" 
        className="
          w-full
          max-w-6xl
          mx-auto
          aspect-[4/3]
          sm:aspect-[16/9]
          md:aspect-[21/9]
          rounded-xl
          sm:rounded-2xl
          mt-4
          shadow-lg
          sm:shadow-xl
          object-cover
          object-center
          transition-all
          duration-300
          hover:shadow-2xl
          hover:shadow-gray-500/20
          border
          border-white/10
        "
      />

      {/* Main Menu Types - Kitchen & Bar Menu */}
      <main className="flex-1 py-12 px-4 bg-[#285349] mt-10">
        <FloralBackground count={18} />
        <div className="max-w-7xl mx-auto mt-11">
          <div className="flex items-center justify-center mb-12">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-amber-400 mr-4"></div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center px-4">
              <span className="bg-gradient-to-b from-white to-amber-100 bg-clip-text text-transparent drop-shadow-lg">
                {t('chooseMenu')}
              </span>
            </h2>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-amber-400 ml-4"></div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 max-w-4xl mx-auto"
          >
            {/* Kitchen Menu */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="relative"
            >
              <Steam />
              <div
                onClick={() => handleMenuTypeClick("kitchen")}
                className="cursor-pointer"
              >
                <CategoryCard
                  category={{
                    id: "kitchen-menu",
                    name: t('kitchenMenu'),
                    display_order: 1,
                    created_at: "",
                    image: "/assets/6.png",
                    menu_type: "kitchen",
                  }}
                  itemCount={kitchenItemsCount}
                  onClick={() => handleMenuTypeClick("kitchen")}
                  isCollection={false}
                  index={0}
                  customIcon={<Utensils className="w-12 h-12" />}
                  customDescription={t('kitchenMenuDescription')}
                />
              </div>
            </motion.div>

            {/* Bar Menu */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="relative"
            >
              <Steam />
              <div
                onClick={() => handleMenuTypeClick("bar")}
                className="cursor-pointer"
              >
                <CategoryCard
                  category={{
                    id: "bar-menu",
                    name: t('barMenu'),
                    display_order: 2,
                    created_at: "",
                    image: "/assets/7.png",
                    menu_type: "bar",
                  }}
                  itemCount={barItemsCount}
                  onClick={() => handleMenuTypeClick("bar")}
                  isCollection={false}
                  index={1}
                  customIcon={<Coffee className="w-12 h-12" />}
                  customDescription={t('barMenuDescription')}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <RestaurantFooter />
      </footer>

      {/* Modal for displaying categories of selected menu type */}
      <AnimatePresence>
        {showMenuTypeModal && selectedMenuType && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-white flex flex-col"
          >
            <header className="sticky top-0 bg-white border-b px-4 py-4">
              <div className="max-w-5xl mx-auto flex items-center justify-between">
                <button
                  onClick={handleCloseMenuTypeModal}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={i18n.language === 'ar' ? 'rotate-0' : 'rotate-180'}
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  {t('back')}
                </button>
                <h3 className="font-bold text-lg">
                  {selectedMenuType === "kitchen" ? t('kitchenMenu') : t('barMenu')}
                </h3>
                <span />
              </div>
            </header>

            <div className="flex-1 overflow-y-auto px-4 py-6 bg-[#285349]">
              <div className="max-w-7xl mx-auto mt-11">
                {getCategoriesByMenuType(selectedMenuType).length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl p-12 text-center shadow-lg"
                  >
                    <ChefHat className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                    <p className="text-gray-900 font-semibold text-xl">
                      {t('categoriesComingSoon')}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 gap-x-8 px-4"
                  >
                    {getCategoriesByMenuType(selectedMenuType).map(
                      (category, index) => (
                        <motion.div
                          key={category.id}
                          variants={{
                            hidden: { opacity: 0, y: 40 },
                            visible: { opacity: 1, y: 0 },
                          }}
                          whileHover={{ scale: 1.03 }}
                          transition={{ type: "spring", stiffness: 120 }}
                          className="relative"
                        >
                          <Steam />
                          <CategoryCard
                            category={{
                              ...category,
                              name: getTranslatedCategoryName(category.id)
                            }}
                            itemCount={getItemsByCategory(category.id).length}
                            onClick={handleCategoryClick}
                            isCollection={category.name === "Kasr Al-Safra"}
                            index={index}
                          />
                        </motion.div>
                      )
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal for displaying items of selected category */}
     <AnimatePresence>
  {showModal && selectedCategory && (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-white flex flex-col"
    >
      <header className="sticky top-0 bg-white border-b px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={handleCloseModal}
            className="flex items-center gap-2 text-gray-700"
          >
            {i18n.language === 'ar' ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            )}
            {t('back')}
          </button>
          <h3 className="font-bold text-lg ">
            {getTranslatedCategoryName(selectedCategory.id)}
          </h3>
          <span />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {getItemsByCategory(selectedCategory.id).length > 0 ? (
            getItemsByCategory(selectedCategory.id).map((item, index) => {
              const isOdd = index % 2 === 1;
              const verticalOffset = isOdd ? 'mt-4' : 'mt-0';
              
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-white rounded-[20px] shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden h-[120px] ${verticalOffset}`}
                  style={{
                    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                  }}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex h-full">
                    <div 
                      className="flex-1 p-5 flex flex-col justify-center"
                      style={{ 
                        backgroundColor: '#0E5A55',
                        backgroundImage: 'linear-gradient(135deg, #0E5A55 0%, #0D4D49 100%)'
                      }}
                    >
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white line-clamp-2">
                          {getTranslatedItemName(item.id)}
                        </h3>
                        
                        {!item.available ? (
                          <span className="inline-block text-xs text-red-300 font-medium bg-red-900/20 px-3 py-1 rounded-full">
                            {t('unavailable')}
                          </span>
                        ) : (
                          <div className="space-y-1">
                            <p className="text-lg text-white/85 font-medium">
                              {item.price.toFixed(0)} {t('currency')}
                            </p>
                            
                            
                          </div>
                        )}
                        
                        {item.available && (
                          <div className="flex items-center gap-1 mt-2">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-white/85 font-medium">{t('popular')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 relative overflow-hidden">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={getTranslatedItemName(item.id)}
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{
                            borderRadius: '0 20px 20px 0',
                          }}
                        />
                      ) : (
                        <div 
                          className="absolute inset-0 flex items-center justify-center"
                          style={{
                            backgroundColor: '#1A7A73',
                            borderRadius: '0 20px 20px 0',
                          }}
                        >
                          <span className="text-3xl font-bold text-white/40">
                            {getTranslatedItemName(item.id).charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.03) 100%)',
                          borderRadius: '0 20px 20px 0',
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              {t('noItemsInCategory')}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

{/* Dialog للعنصر المحدد */}
<AnimatePresence>
  {selectedItem && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={() => setSelectedItem(null)}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative w-full max-w-3xl bg-white rounded-[20px] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        }}
      >
        {/* زر الإغلاق */}
        <button
          onClick={() => setSelectedItem(null)}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
        >
          {i18n.language === 'ar' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          )}
        </button>

        {/* محتوى الدايلوج - عمودي على الموبايل وأفقي على الديسكتوب */}
        <div className="flex flex-col md:flex-row h-auto md:h-[500px]">
          {/* الصورة - في الأعلى على الموبايل */}
          <div className="relative w-full md:w-1/2 h-64 md:h-full overflow-hidden">
            {selectedItem.image_url ? (
              <img
                src={selectedItem.image_url}
                alt={getTranslatedItemName(selectedItem.id)}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  borderRadius: '0',
                }}
              />
            ) : (
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backgroundColor: '#1A7A73',
                }}
              >
                <span className="text-6xl font-bold text-white/40">
                  {getTranslatedItemName(selectedItem.id).charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 100%)',
              }}
            />
          </div>
          
          {/* المحتوى - تحت الصورة على الموبايل */}
          <div 
            className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between"
            style={{ 
              backgroundColor: '#0E5A55',
              backgroundImage: 'linear-gradient(135deg, #0E5A55 0%, #0D4D49 100%)'
            }}
          >
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {getTranslatedItemName(selectedItem.id)}
              </h3>
              
              {!selectedItem.available ? (
                <span className="inline-block text-sm text-red-300 font-medium bg-red-900/20 px-4 py-2 rounded-full">
                  {t('unavailable')}
                </span>
              ) : (
                <div className="space-y-4">
                  
                  
                  {/* قسم المكونات (الوصف) */}
                  <div className="mt-2">
                    <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {t('ingredients')}
                    </h4>
                    
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="text-sm md:text-base text-white/70 leading-relaxed">
                        {getTranslatedItemDescription(selectedItem.id) || t('noIngredientsAvailable')}
                      </p>
                    </div>
                  </div>

                 
                </div>
              )}
            </div>

            {/* أزرار */}
            <div className="mt-6 md:mt-8">
              <button
                onClick={() => setSelectedItem(null)}
                className="w-full px-4 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-colors duration-200"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
}