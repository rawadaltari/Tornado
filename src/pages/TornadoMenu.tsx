import { ChefHat } from "lucide-react";
import { useState, useEffect } from "react";
import { MenuItem } from "../components/MenuItem";
import { CategoryCard } from "../components/Card/CategoryCard";
import { CATEGORIES, MENU_ITEMS } from "../data/menuData";
import type { Category } from "../lib/database.types";
import TextType from "../compon/TextType";
import { motion, AnimatePresence } from "framer-motion";
import Steam from "../components/Steam";

export default function TornadoMenu() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
  };

  const getItemsByCategory = (categoryId: string) =>
    MENU_ITEMS.filter((item) => item.category_id === categoryId);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

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
            text={["اهلا وسهلًا بِكُم ", "مطعمُ وكافيُهُ تورنادو"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor
            cursorCharacter="|"
            className="text-2xl sm:text-3xl font-kufi text-gray-900"
          />
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[url(/src/assets/1122.png)] bg-cover bg-center h-72 sm:h-96 w-[95%] mx-auto rounded-3xl mt-4" />

      {/* Categories */}
      <main className="flex-1 py-12 px-4 bg-[#285349] mt-10">
        <div className="max-w-7xl mx-auto mt-11">
          {CATEGORIES.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-12 text-center shadow-lg"
            >
              <ChefHat className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <p className="text-gray-900 font-semibold text-xl">
                Menu Coming Soon
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
              {CATEGORIES.map((category, index) => (
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
              ))}
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-auto">
        <div className="text-center text-sm">
          © 2025 Tornado Dubai. All rights reserved.
        </div>
      </footer>

      {/* Modal – Book Style */}
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
                  رجوع
                </button>
                <h3 className="font-bold text-lg">
                  {selectedCategory.name}
                </h3>
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
                    لا توجد عناصر في هذه الفئة
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
