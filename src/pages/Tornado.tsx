import TornadoLogo from "../components/TornadoLogo";
import { useState } from "react";
import { Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Tornado() {
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [opening, setOpening] = useState(false);
  const navigate = useNavigate();

  const goToMenu = () => {
    const audio = new Audio("/sounds/book-open.mp3");
    audio.volume = 0.5;
    audio.play();

    setOpening(true);

    setTimeout(() => {
      navigate("/menu");
    }, 900);
  };

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900">

      {/* تأثير غلق الصفحة */}
      <AnimatePresence>
        {opening && (
          <>
            <motion.div
              className="fixed inset-y-0 left-0 w-1/2 bg-[#f5e6c8] z-30"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <motion.div
              className="fixed inset-y-0 right-0 w-1/2 bg-[#fdf3dc] z-30"
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
          <Link to="https://wa.me/1234567890" target="_blank" className="social-btn bg-green-500">
            <FaWhatsapp />
          </Link>
          <Link to="https://www.instagram.com/tornado_dubai1?igsh=NTJodDFuNW9lODJm&utm_source=qr" className="social-btn bg-pink-500">
            <FaInstagram />
          </Link>
          <Link to="https://www.facebook.com/share/1DUYTq3yvn/?mibextid=wwXIfr" className="social-btn bg-blue-600">
            <FaFacebookF />
          </Link>
          <Link to="tel:+1234567890" className="social-btn bg-amber-500 text-black">
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
            className="mt-10 px-8 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-lg shadow-2xl"
          >
            عرض القائمة
            <div className="text-sm opacity-80">View Menu</div>
          </motion.button>

          <p className="mt-10 text-amber-300/60 text-sm">
            Powered by <span className="text-amber-400">Webath</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
