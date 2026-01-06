import TornadoLogo from "../components/TornadoLogo";
import { useState } from "react";
import { Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function Tornado() {
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [opening, setOpening] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const goToMenu = () => {
    const audio = new Audio("/sounds/book-open.mp3");
    audio.volume = 0.5;
    audio.play();

    setOpening(true);

    setTimeout(() => {
      navigate("/menu");
    }, 900);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    // يمكنك حفظ تفضيل اللغة في localStorage إذا أردت
    localStorage.setItem('preferredLanguage', newLang);
    
    // تغيير اتجاه الصفحة حسب اللغة
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900">

      {/* تأثير غلق الصفحة */}
      <AnimatePresence>
        {opening && (
          <>
            <motion.div
              className="fixed inset-y-0 left-0 w-1/2 bg-[#285349] z-30"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <motion.div
              className="fixed inset-y-0 right-0 w-1/2 bg-[#f4c559] z-30"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Floating Menu Toggle */}
      <button
        onClick={() => setShowFloatingMenu(!showFloatingMenu)}
        className="fixed right-4 top-4 z-20 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg hover:bg-amber-600"
      >
        ☰
      </button>

      {/* Floating Menu */}
      {showFloatingMenu && (
        <div className="fixed right-4 top-20 z-20 flex flex-col gap-4">
          {/* زر تبديل اللغة */}
          <button
            onClick={toggleLanguage}
            className="social-btn bg-teal-800 hover:bg-teal-700 transition-colors duration-200"
            title={i18n.language === 'ar' ? 'Switch to English' : 'التغيير إلى العربية'}
          >
            <Globe className="w-5 h-5" />
            <span className="text-xs mt-1">
              {i18n.language === 'ar' ? 'EN' : 'AR'}
            </span>
          </button>
          
          <Link 
            to="https://wa.me/1234567890" 
            target="_blank" 
            className="social-btn bg-green-500 hover:bg-green-600 transition-colors duration-200"
            title="واتساب"
          >
            <FaWhatsapp />
          </Link>
          <Link 
            to="https://www.instagram.com/tornado_dubai1?igsh=NTJodDFuNW9lODJm&utm_source=qr" 
            target="_blank"
            className="social-btn bg-pink-500 hover:bg-pink-600 transition-colors duration-200"
            title="إنستغرام"
          >
            <FaInstagram />
          </Link>
          <Link 
            to="https://www.facebook.com/share/1DUYTq3yvn/?mibextid=wwXIfr" 
            target="_blank"
            className="social-btn bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            title="فيسبوك"
          >
            <FaFacebookF />
          </Link>
          <Link 
            to="tel:+1234567890" 
            className="social-btn bg-amber-500 hover:bg-amber-600 text-black transition-colors duration-200"
            title="اتصل بنا"
          >
            <Phone />
          </Link>
        </div>
      )}

      {/* Content */}
      <div className="h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center px-6"
        >
          <TornadoLogo />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToMenu}
            className="mt-14 px-4 py-2 bg-[#f4ce61] text-[#285349] rounded-full text-md shadow-2xl hover:from-amber-600 hover:to-amber-700 transition-all duration-200"
          >
            
            <div className="text-sm  mt-1">
              {i18n.language === 'ar' ? 'View Menu' : 'عرض القائمة'}
            </div>
          </motion.button>

          <p className="mt-16 text-amber-300/60 text-sm">
            {i18n.language === 'ar' ? 'عمل بواسطة' : 'Powered by'} <span className="text-amber-400">Rawad altari</span>
          </p>
        </motion.div>
      </div>
    </div>
  );

}