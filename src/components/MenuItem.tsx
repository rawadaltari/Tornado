import { Star } from "lucide-react";
import { motion } from "framer-motion";
import type { MenuItem as MenuItemType } from "../lib/database.types";
import { useTranslation } from "react-i18next";
import { ArrowIcon } from "../compon/ArrowIcon";
interface MenuItemProps {
  item: MenuItemType;
  index: number;
}

export function MenuItem({ item, index }: MenuItemProps) {
  const { t } = useTranslation();
  const isOdd = index % 2 === 1;
  const verticalOffset = isOdd ? "mt-4" : "mt-0";
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-white rounded-[20px] shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden h-[120px] ${verticalOffset}`}
      style={{
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      }}
    >
      <div className="flex h-full">
        <div
          className="flex-1 p-5 flex flex-col justify-center"
          style={{
            backgroundColor: "#0E5A55",
            backgroundImage:
              "linear-gradient(135deg, #0E5A55 0%, #0D4D49 100%)",
          }}
        >
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white line-clamp-2">
              {item.name}
            </h3>

            {!item.available ? (
              <span className="inline-block text-xs text-red-300 font-medium bg-red-900/20 px-3 py-1 rounded-full">
                {t("unavailable")}
              </span>
            ) : (
              <div className="space-y-1">
                <p className="text-lg text-white/85 font-medium">
                  {item.price.toFixed(0)} {t("currency")}
                </p>

                {item.description && (
                  <p className="text-xs text-white/70 line-clamp-2 mt-1">
                    {item.description}
                  </p>
                )}
              </div>
            )}

            {item.available && (
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-white/85 font-medium">
                  {t("popular")}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 relative overflow-hidden">
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                borderRadius: "0 20px 20px 0",
              }}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                backgroundColor: "#1A7A73",
                borderRadius: "0 20px 20px 0",
              }}
            >
              <span className="text-3xl font-bold text-white/40">
                {item.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* Overlay gradient for better text contrast if needed */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.03) 100%)",
              borderRadius: "0 20px 20px 0",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function MenuPageLayout({
  children,
  categoryName,
}: {
  children: React.ReactNode;
  categoryName: string;
}) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 h-16 bg-white rounded-full m-4 z-50 flex items-center justify-between px-6"
        style={{
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        }}
      >
        <button className="flex items-center gap-2 text-[#0E5A55] ">
          <ArrowIcon/>
          <span className="text-sm font-medium">{t("back")}</span>
        </button>

        <h1 className="text-lg font-semibold text-gray-900 text-center">
          {categoryName}
        </h1>

        <div className="w-20" />
      </motion.header>

      <div className="pt-24 pb-8 px-6">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          style={{
            gap: "24px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
