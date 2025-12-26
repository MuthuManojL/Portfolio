import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CurvedLoop from "./CurvedLoop";
import { useTheme } from "@/theme/ThemeProvider";

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

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: `linear-gradient(135deg, ${tokens.primary}10, ${tokens.accent}10)`,
            backdropFilter: "blur(10px)",
          }}
        >
          <motion.div
            className="w-full"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: -50 }}
            transition={{ 
              duration: 0.8, 
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
          >
            <CurvedLoop 
              marqueeText="✦ Welcome to Muthu Manoj's Portfolio ✦ Biomedical Engineering × Computer Science ✦"
              speed={2}
              curveAmount={500}
              direction="left"
              interactive={true}
              className="text-white"
              style={{ color: tokens.primary }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
