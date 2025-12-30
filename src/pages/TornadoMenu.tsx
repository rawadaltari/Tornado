import { ChefHat, Coffee, Utensils } from "lucide-react";
import { useState, useEffect } from "react";
import { MenuItem } from "../components/MenuItem";
import { CategoryCard } from "../components/Card/CategoryCard";
import { CATEGORIES, MENU_ITEMS } from "../data/menuData";
import type { Category } from "../lib/database.types";
import TextType from "../compon/TextType";
import { motion, AnimatePresence } from "framer-motion";
import Steam from "../components/Steam";
import RestaurantFooter from "../components/RestaurantFooter";
export default function TornadoMenu() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedMenuType, setSelectedMenuType] = useState<
    "kitchen" | "bar" | null
  >(null);
  const [showModal, setShowModal] = useState(false);
  const [showMenuTypeModal, setShowMenuTypeModal] = useState(false);
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
        // تكبير الحجم على الجوال لجعلها أكثر وضوحاً
        const size = isMobile 
          ? Math.random() * 100 + 80 
          : Math.random() * 120 + 60;
        
        // توزيع أكثر تنظيماً مع تجنب الحواف
        const top = Math.random() * 80 + 10; // تجنب 10% من الأعلى والأسفل
        const left = Math.random() * 80 + 10; // تجنب 10% من الجانبين
        
        const rotate = Math.random() * 360;
        
        // زيادة الشفافية قليلاً لجعلها أقل كثافة
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
              // إضافة انتقال سلس للحجم على الجوال
              transition: isMobile ? 'all 0.3s ease' : 'none'
            }}
          />
        );
      })}
      
      {/* إضافة بعض الأوراق الإضافية في الزوايا */}
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
  // const kitchenCategories = getCategoriesByMenuType("kitchen");
  // const barCategories = getCategoriesByMenuType("bar");

  const kitchenItemsCount = MENU_ITEMS.filter((item) => {
    const category = CATEGORIES.find((cat) => cat.id === item.category_id);
    return category?.menu_type === "kitchen";
  }).length;

  const barItemsCount = MENU_ITEMS.filter((item) => {
    const category = CATEGORIES.find((cat) => cat.id === item.category_id);
    return category?.menu_type === "bar";
  }).length;

  useEffect(() => {
    document.body.style.overflow =
      showModal || showMenuTypeModal ? "hidden" : "";
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
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 text-center">
          <TextType
            text={[" ", "Tornado Restaurant and Café"]}
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
                Choose Menu
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
                    name: "Kitchen Menu",
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
                  customDescription="Wide variety of main dishes, appetizers, salads, and traditional foods"
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
                    name: "Bar Menu",
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
                  customDescription="Hot and cold drinks, cocktails, fresh juices, and premium hookah"
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
                    className="rotate-90"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  Back
                </button>
                <h3 className="font-bold text-lg">
                  {selectedMenuType === "kitchen" ? "Kitchen Menu" : "Bar Menu"}
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
                      Categories Coming Soon
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
                            category={category}
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
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="rotate-90"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  Back
                </button>
                <h3 className="font-bold text-lg">{selectedCategory.name}</h3>
                <span />
              </div>
            </header>

            <div className="flex-1 overflow-y-auto px-4 py-6">
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                {getItemsByCategory(selectedCategory.id).length > 0 ? (
                  getItemsByCategory(selectedCategory.id).map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <MenuItem item={item} />
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 col-span-full">
                    No items in this category
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
