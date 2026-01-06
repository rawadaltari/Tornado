import { Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function RestaurantFooter() {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#29554d] text-[#E9E2DE] py-12 relative overflow-hidden border-t border-[#C3A05C]/30">
      {/* تأثيرات خلفية خفيفة */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#C3A05C] blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-[#73B17A] blur-3xl"></div>
      </div>

      {/* خط زخرفي أعلى الفوتر */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C3A05C] to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* المحتوى الرئيسي */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-8">
          {/* اللوغو والهوية */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-right"
          >
            <div className="flex flex-col lg:flex-row items-center gap-4 mb-4">
              <div className="inline-flex">
                <img
                  src="/assets/logotop.png"
                  alt={t("restaurantName")}
                  className="w-32 h-32"
                />
              </div>
              <div>{/* يمكن إضافة نص هنا إذا لزم الأمر */}</div>
            </div>
          </motion.div>

          {/* معلومات الاتصال */}
          <div className="space-y-4">
            {/* العنوان */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              <div className="bg-[#73B17A]/20 p-2 rounded-lg border border-[#73B17A]/30">
                <MapPin className="w-5 h-5 text-[#E9E2DE]" />
              </div>
              <div
                className={i18n.language === "ar" ? "text-right" : "text-left"}
              >
                <p className="text-[#E9E2DE] text-sm lg:text-base">
                  {t("address")}
                </p>
                <p className="text-[#E9E2DE]/70 text-md font-bold">
                  {t("cityCountry")}
                </p>
              </div>
            </motion.div>

            {/* رقم الهاتف */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              <div className="bg-[#73B17A]/20 p-2 rounded-lg border border-[#73B17A]/30">
                <Phone className="w-5 h-5 text-[#E9E2DE]" />
              </div>
              <div
                className={i18n.language === "ar" ? "text-right" : "text-left"}
              >
                <a
                  href="tel:+963112345678"
                  className="text-[#E9E2DE] hover:text-[#C3A05C] transition-colors duration-300 text-sm lg:text-base font-medium"
                >
                  +963 11 234 5678
                </a>
                <p className="text-[#E9E2DE]/70 text-xs">
                  {t("customerService")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* خط فاصل */}
        <div className="border-t border-[#73B17A]/30 my-8"></div>

        {/* حقوق النشر */}
        <div className="text-center">
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[#E9E2DE]/80 text-sm"
          >
            © {currentYear} {t("restaurantName")}. {t("allRightsReserved")}
          </motion.p>
          <p className="text-[#E9E2DE]/60 text-sm mt-2">
            {t("footerDescription")}
          </p>
        </div>

        {/* تصميم زخرفي سفلي */}
        <div className="mt-8 flex flex-col items-center justify-center space-y-4">
          {/* النقاط الزخرفية */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#C3A05C] animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-[#73B17A] animate-pulse delay-75"></div>
            <div className="w-2 h-2 rounded-full bg-[#E9E2DE] animate-pulse delay-150"></div>
            <div className="w-2 h-2 rounded-full bg-[#C3A05C] animate-pulse delay-300"></div>
            <div className="w-2 h-2 rounded-full bg-[#73B17A] animate-pulse delay-500"></div>
          </div>

          {/* نص تذييل الصفحة */}
          <div className="text-center">
            <p className="text-zinc-50 text-sm font-light tracking-wide">
              {i18n.language === "ar" ? "عمل بواسطة" : "Powered by"}{" "}
              <span className="text-gray-50 font-medium">Rawad Altari</span>
            </p>
            <div className="mt-2 w-20 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mx-auto"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
