import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTheme } from '@/theme/ThemeProvider';
import CircularGallery from './CircularGallery';

const ACHIEVEMENTS = [
  { 
    image: '/achievements/bookchapter.png', 
    text: 'Book Chapter Publication',
    title: 'Published Research'
  },
  { 
    image: '/achievements/firesidechat.jpg', 
    text: 'Fireside Chat Speaker',
    title: 'Speaking Engagement'
  },
  { 
    image: '/achievements/hackathonwinner.jpg', 
    text: 'Hackathon Winner',
    title: 'Competition Winner'
  },
  { 
    image: '/achievements/hindusthanpaper.jpeg', 
    text: 'Hindustan Times',
    title: 'Media Feature'
  },
  { 
    image: '/achievements/hindusthanwinner.jpg', 
    text: 'Hindustan University Winner',
    title: 'University Award'
  },
  { 
    image: '/achievements/nptel_topper.jpg', 
    text: 'NPTEL Topper',
    title: 'Academic Excellence'
  },
  { 
    image: '/achievements/pookolam.jpg', 
    text: 'Cultural Achievement',
    title: 'Cultural Event'
  },
  { 
    image: '/achievements/studentteaching.png', 
    text: 'Student Teaching Excellence',
    title: 'Teaching Award'
  },
  { 
    image: '/achievements/toastmaster.jpg', 
    text: 'Toastmaster Recognition',
    title: 'Public Speaking'
  },
];

export default function AchievementsGallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tokens } = useTheme();

  // Intercept clicks on the gallery to open modal
  const handleGalleryClick = (e: React.MouseEvent) => {
    const canvas = (e.target as HTMLElement)?.closest('canvas');
    if (canvas && !isModalOpen) {
      // Get the current center image index (simplified - you can enhance this)
      const currentIndex = Math.floor(Math.random() * ACHIEVEMENTS.length);
      setSelectedImageIndex(currentIndex);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
  };

  const selectedImage = selectedImageIndex !== null ? ACHIEVEMENTS[selectedImageIndex] : null;

  return (
    <div className="w-full relative">
      <div onClick={handleGalleryClick} className="cursor-pointer">
        <CircularGallery 
          items={ACHIEVEMENTS}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          font="bold 30px Figtree"
          scrollSpeed={2}
          scrollEase={0.05}
          autoScroll={true}
          autoScrollSpeed={0.5}
        />
      </div>

      {/* Full Image Modal */}
      <AnimatePresence>
        {isModalOpen && selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: `${tokens.surface}e6`,
              backdropFilter: 'blur(10px)',
            }}
            onClick={closeModal}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-6 right-6 p-2 rounded-full transition-all hover:scale-110 z-60"
              style={{
                backgroundColor: `${tokens.primary}20`,
                borderColor: tokens.primary,
              }}
              onClick={closeModal}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <X className="w-6 h-6" style={{ color: tokens.primary }} />
            </motion.button>

            {/* Modal Content */}
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.5, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 100 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container */}
              <div
                className="relative rounded-2xl overflow-hidden border-2"
                style={{
                  borderColor: tokens.primary,
                  boxShadow: `0 20px 60px ${tokens.primary}40`,
                }}
              >
                <motion.img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto object-contain max-h-[70vh]"
                  style={{
                    backgroundColor: tokens.surface,
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                />
              </div>

              {/* Title and Description */}
              <motion.div
                className="text-center mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <h3
                  className="text-2xl md:text-3xl font-bold mb-2"
                  style={{ color: tokens.text_primary }}
                >
                  {selectedImage.title}
                </h3>
                <p
                  className="text-lg md:text-xl"
                  style={{ color: tokens.text_secondary }}
                >
                  {selectedImage.text}
                </p>
              </motion.div>

              {/* Navigation Hints */}
              <motion.p
                className="text-center mt-4 text-sm"
                style={{ color: tokens.text_tertiary }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                Click the X button or outside to close
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
