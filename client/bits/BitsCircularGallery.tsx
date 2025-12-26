import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";

interface Achievement {
  src: string;
  title: string;
}

const ACHIEVEMENTS: Achievement[] = [
  { src: "/achievements/bookchapter.png", title: "Book Chapter Publication" },
  { src: "/achievements/firesidechat.jpg", title: "Fireside Chat Speaker" },
  { src: "/achievements/hackathonwinner.jpg", title: "Hackathon Winner" },
  { src: "/achievements/hindusthanpaper.jpeg", title: "Hindusthan Times Feature" },
  { src: "/achievements/hindusthanwinner.jpg", title: "Hindusthan University Winner" },
  { src: "/achievements/nptel_topper.jpg", title: "NPTEL Topper" },
  { src: "/achievements/pookolam.jpg", title: "Cultural Achievement" },
  { src: "/achievements/studentteaching.png", title: "Student Teaching Excellence" },
  { src: "/achievements/toastmaster.jpg", title: "Toastmaster Recognition" },
];

export const BitsCircularGallery: React.FC = () => {
  const { tokens } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % ACHIEVEMENTS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + ACHIEVEMENTS.length) % ACHIEVEMENTS.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % ACHIEVEMENTS.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  // Calculate positions for circular orbit thumbnails
  const getThumbnailPosition = (index: number) => {
    const total = ACHIEVEMENTS.length;
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    const radius = 180;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y, angle };
  };

  return (
    <div className="relative w-full py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-8 h-8" style={{ color: tokens.primary }} />
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ color: tokens.text_primary }}
            >
              Achievements Gallery
            </h2>
          </div>
          <p
            className="text-lg md:text-xl mt-2"
            style={{ color: tokens.text_secondary }}
          >
            Celebrating milestones and recognitions
          </p>
        </motion.div>

        {/* Main Gallery Container */}
        <div className="relative flex items-center justify-center min-h-[600px]">
          {/* Circular Orbit Background */}
          <motion.div
            className="absolute w-[360px] h-[360px] rounded-full border-2 border-dashed"
            style={{ borderColor: `${tokens.primary}30` }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Orbital Thumbnails */}
          <div className="absolute w-[360px] h-[360px]">
            {ACHIEVEMENTS.map((achievement, index) => {
              const pos = getThumbnailPosition(index);
              const isActive = index === currentIndex;

              return (
                <motion.button
                  key={index}
                  className="absolute rounded-full overflow-hidden border-2 cursor-pointer"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: isActive ? 60 : 40,
                    height: isActive ? 60 : 40,
                    borderColor: isActive ? tokens.primary : tokens.border,
                    boxShadow: isActive ? `0 0 20px ${tokens.primary}60` : "none",
                  }}
                  animate={{
                    x: pos.x - (isActive ? 30 : 20),
                    y: pos.y - (isActive ? 30 : 20),
                    scale: isActive ? 1.2 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <img
                    src={achievement.src}
                    alt={achievement.title}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Main Display Image */}
          <div
            className="relative w-full max-w-3xl aspect-[4/3] rounded-2xl overflow-hidden border-4"
            style={{
              borderColor: tokens.primary,
              boxShadow: `0 20px 60px ${tokens.primary}30`,
            }}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                  rotateY: { duration: 0.5 },
                }}
                className="absolute inset-0"
                style={{ perspective: 1000 }}
              >
                <img
                  src={ACHIEVEMENTS[currentIndex].src}
                  alt={ACHIEVEMENTS[currentIndex].title}
                  className="w-full h-full object-contain"
                  style={{ backgroundColor: tokens.surface }}
                />
                
                {/* Gradient Overlay for Title */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  style={{
                    background: `linear-gradient(to top, ${tokens.surface}f0, transparent)`,
                  }}
                >
                  <motion.h3
                    className="text-xl md:text-2xl font-bold text-center"
                    style={{ color: tokens.text_primary }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {ACHIEVEMENTS[currentIndex].title}
                  </motion.h3>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md border z-10 transition-all hover:scale-110"
              style={{
                backgroundColor: `${tokens.surface}cc`,
                borderColor: tokens.border,
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <ChevronLeft className="w-6 h-6" style={{ color: tokens.primary }} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md border z-10 transition-all hover:scale-110"
              style={{
                backgroundColor: `${tokens.surface}cc`,
                borderColor: tokens.border,
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <ChevronRight className="w-6 h-6" style={{ color: tokens.primary }} />
            </button>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {ACHIEVEMENTS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                backgroundColor: index === currentIndex ? tokens.primary : tokens.border,
                transform: index === currentIndex ? "scale(1.5)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
