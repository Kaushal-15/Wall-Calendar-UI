import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { MONTH_THEMES } from "../config/themes";

export function HeroSection({ currentMonth, onPrev, onNext }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [extIndex, setExtIndex] = useState(0);
  const exts = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

  const seasonalImagesUnsplash = [
    "1516131206008-df3f318359b3", // Jan
    "1457100344445-64d50eb7ffae", // Feb
    "1462275646968-10adfb232c94", // Mar
    "1490682121708-ba90ec76d63e", // Apr
    "1469474968028-56623f02e42e", // May
    "1476937660205-d91d03de73bb", // Jun
    "1501862700950-18382cd41497", // Jul
    "1445964047600-b5ee3a3f5a54", // Aug
    "1474540412666-104d493a54b4", // Sep
    "1444158495096-7b81ea19e1e1", // Oct
    "1505832018823-50ed37dda210", // Nov
    "1513221087541-b4f0b727409c"  // Dec
  ];

  const currentMonthIndex = currentMonth.getMonth();
  
  // Try local images with different extensions before falling back to Unsplash
  const imageSrc = imageError 
    ? `https://images.unsplash.com/photo-${seasonalImagesUnsplash[currentMonthIndex]}?auto=format&fit=crop&w=1200&q=80`
    : `${process.env.PUBLIC_URL}/IMG/${currentMonthIndex === 3 ? 5 : currentMonthIndex + 1}${exts[extIndex]}`;

  useEffect(() => {
    setIsLoaded(false);
    setImageError(false);
    setExtIndex(0); // Reset extension search on month change
  }, [currentMonth]);

  const handleImageError = () => {
    if (extIndex < exts.length - 1) {
      setExtIndex(prev => prev + 1);
    } else {
      setImageError(true);
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden group bg-muted dark:bg-slate-900 select-none rounded-[12px] shadow-inner transition-colors duration-500">
      
      {/* Loading Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center bg-muted dark:bg-slate-900">
        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>

      {/* Hero Image */}
      <AnimatePresence mode="wait">
        <motion.img 
          key={imageSrc}
          src={imageSrc}
          alt={`${format(currentMonth, "MMMM")} Poster`}
          onLoad={() => setIsLoaded(true)}
          onError={handleImageError}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </AnimatePresence>
      
      {/* Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10" />

      {/* Hero Typography */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-12">
        
        <div className="flex justify-between items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col"
          >
            <h1 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tight leading-none font-montserrat drop-shadow-lg">
              {format(currentMonth, "MMMM")}
            </h1>
            <p className="text-white/80 text-base md:text-lg font-medium mt-2 tracking-[0.2em] font-inter italic">
              {MONTH_THEMES[currentMonthIndex].tagline}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-end"
          >
            <span className="text-white text-3xl md:text-5xl font-bold font-montserrat drop-shadow-lg">
              {format(currentMonth, "yyyy")}
            </span>
          </motion.div>
        </div>

        {/* Navigation Control */}
        <div className="flex justify-end items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 bg-white/10 dark:bg-black/20 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/20 shadow-2xl"
          >
            <button 
              onClick={onPrev} 
              className="text-white hover:text-primary transition-colors p-1 active:scale-90 transform"
              aria-label="Previous Month"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <span className="text-white text-sm font-black min-w-[70px] text-center font-montserrat tracking-widest uppercase">
              {format(currentMonth, "MMM")}
            </span>
            <button 
              onClick={onNext} 
              className="text-white hover:text-primary transition-colors p-1 active:scale-90 transform"
              aria-label="Next Month"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


