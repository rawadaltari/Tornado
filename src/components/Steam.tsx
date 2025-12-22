import { motion } from "framer-motion";

export default function Steam({ className = "" }) {
  return (
    <div className={`absolute -top-10 left-1/2 -translate-x-1/2 ${className}`}>
      {[...Array(3)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-6 h-6 rounded-full bg-white/30 blur-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: -40, opacity: [0, 0.6, 0] }}
          transition={{
            duration: 3,
            delay: i * 1,
            repeat: Infinity,
            ease: "easeOut",
          }}
          style={{ left: i * 20 }}
        />
      ))}
    </div>
  );
}
