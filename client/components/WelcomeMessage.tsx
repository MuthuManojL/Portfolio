import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";
import { Sparkles } from "lucide-react";

export default function WelcomeMessage() {
  const [show, setShow] = useState(false);
  const { tokens } = useTheme();

  useEffect(() => {
    // Check if user has seen the welcome message
    const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcome");
    
    if (!hasSeenWelcome) {
      setShow(true);
      sessionStorage.setItem("hasSeenWelcome", "true");
      
      // Hide after 5 seconds
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Curved loop path animation
  const curvedLoopPath = (index: number, total: number = 8) => {
    const angle = (index / total) * Math.PI * 2;
    const radius = 180;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Curved Loop Particles */}
          {[...Array(12)].map((_, i) => {
            const { x, y } = curvedLoopPath(i, 12);
            return (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                  background: `linear-gradient(135deg, ${tokens.primary}, ${tokens.accent})`,
                  boxShadow: `0 0 20px ${tokens.primary}`,
                }}
                animate={{
                  x: [0, x, x * 1.5, x, 0],
                  y: [0, y, y * 1.5, y, 0],
                  scale: [0, 1, 1.2, 1, 0],
                  opacity: [0, 1, 0.8, 1, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          <motion.div
            className="relative max-w-2xl w-full"
            initial={{ scale: 0.5, rotateY: -180 }}
            animate={{ scale: 1, rotateY: 0 }}
            exit={{ scale: 0.5, rotateY: 180 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.34, 1.56, 0.64, 1],
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            style={{ perspective: 1000 }}
          >
            {/* Orbital Rings */}
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute inset-0 rounded-full border-2"
                style={{
                  borderColor: `${tokens.primary}${Math.floor(50 / ring).toString(16).padStart(2, '0')}`,
                  transform: `scale(${1 + ring * 0.15})`,
                }}
                animate={{
                  rotate: ring % 2 === 0 ? 360 : -360,
                  scale: [1 + ring * 0.15, 1 + ring * 0.2, 1 + ring * 0.15],
                }}
                transition={{
                  rotate: {
                    duration: 8 + ring * 2,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              />
            ))}

            <motion.div
              className="relative px-8 sm:px-12 py-8 sm:py-10 rounded-3xl backdrop-blur-2xl border-2 shadow-2xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${tokens.primary}20, ${tokens.accent}15, ${tokens.primary}20)`,
                borderColor: tokens.primary,
                boxShadow: `0 0 80px ${tokens.primary}40, inset 0 0 60px ${tokens.primary}10`,
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                duration: 5,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {/* Floating Sparkles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + (i % 3) * 30}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  <Sparkles 
                    className="w-4 h-4" 
                    style={{ color: tokens.accent }}
                  />
                </motion.div>
              ))}

              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center mb-3"
                  style={{
                    background: `linear-gradient(135deg, ${tokens.primary}, ${tokens.accent}, ${tokens.primary})`,
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: `0 0 40px ${tokens.primary}50`,
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  Welcome
                </motion.h1>
                
                <motion.div
                  className="flex items-center justify-center gap-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <motion.div
                    className="h-px flex-1"
                    style={{ backgroundColor: tokens.primary }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  />
                  <motion.p
                    className="text-center text-base sm:text-lg md:text-xl font-semibold px-4"
                    style={{ color: tokens.text_primary }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    to Muthu Manoj's Portfolio
                  </motion.p>
                  <motion.div
                    className="h-px flex-1"
                    style={{ backgroundColor: tokens.primary }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  />
                </motion.div>

                <motion.p
                  className="text-center mt-4 text-xs sm:text-sm font-medium"
                  style={{ color: tokens.text_secondary }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Biomedical Engineering × Computer Science
                </motion.p>
              </motion.div>
            </motion.div>
            
            {/* Animated glow effect with curved path */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${tokens.primary}30 0%, ${tokens.accent}20 50%, transparent 70%)`,
                filter: "blur(40px)",
                zIndex: -1,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4],
                rotate: [0, 360],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
