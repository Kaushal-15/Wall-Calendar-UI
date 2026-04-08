import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import { Calendar } from './components/Calendar';
import { MONTH_THEMES } from './config/themes';
import './index.css';

function App() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3, 1)); // Start April 2026

  const theme = MONTH_THEMES[currentMonth.getMonth()];

  // Apply the accent color globally whenever the month changes
  useEffect(() => {
    document.documentElement.style.setProperty('--primary', theme.accentColor);
  }, [theme]);

  return (
    <ThemeProvider>
      {/* 
        The Wall: 
        A dynamic container background that responds to themes & seasons.
      */}
      <div className={`min-h-screen relative bg-background transition-colors duration-1000 flex items-center justify-center p-4 sm:p-12 lg:p-24 selection:bg-primary/20 overflow-hidden`}>
        
        {/* Ambient Blur Background (Image-based gradient effect) */}
        <div 
          className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out pointer-events-none scale-[1.2]"
          style={{ 
            backgroundImage: `url(${theme.imagePath})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(100px) saturate(200%)',
            opacity: 0.15 
          }}
        />

        {/* Color mood overlay */}
        <div className={`absolute inset-0 z-0 transition-colors duration-1000 bg-gradient-to-br ${theme.moodClass} opacity-40 mix-blend-multiply dark:opacity-80 dark:mix-blend-normal`} />

        {/* Subtle texture overlay for the wall */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }} />
        
        <div className="relative z-10 w-full max-w-[1000px] mx-auto flex flex-col items-center justify-center">
          <Calendar currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;


