import React, { useState, useRef } from "react";
import { addMonths, subMonths } from "date-fns";
import { ThemeToggle } from "./ThemeToggle";
import { HeroSection } from "./HeroSection";
import { CalendarGrid } from "./CalendarGrid";
import { NotesPanel } from "./NotesPanel";
import { formatDateKey } from "../utils/dateHelpers";

export function Calendar({ currentMonth, setCurrentMonth }) {
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);
  const [flipState, setFlipState] = useState("");
  
  // Audio reference for flip sound
  const audioRef = useRef(null);

  const triggerFlip = (direction) => {
    if (flipState) return;
    setFlipState(direction);
    
    // Play flip sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio play failed", e));
    }
    
    // Switch month halfway through the flip
    setTimeout(() => {
      setSelectedStart(null);
      setSelectedEnd(null);
      if (direction === "next") {
        setCurrentMonth(addMonths(currentMonth, 1));
      } else {
        setCurrentMonth(subMonths(currentMonth, 1));
      }
    }, 350); 
    
    // Reset flip state after animation finishes
    setTimeout(() => {
      setFlipState("");
    }, 700);
  };

  const prevMonth = () => {
    if (currentMonth.getFullYear() === 2026 && currentMonth.getMonth() === 0) return; // Prevent going before Jan 2026
    triggerFlip("prev");
  };
  const nextMonth = () => {
    if (currentMonth.getFullYear() === 2026 && currentMonth.getMonth() === 11) return; // Prevent going after Dec 2026
    triggerFlip("next");
  };

  const handleDateClick = (day) => {
    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(day);
      setSelectedEnd(null);
    } else {
      if (day < selectedStart) {
        setSelectedEnd(selectedStart);
        setSelectedStart(day);
      } else {
        setSelectedEnd(day);
      }
    }
  };

  const dateKey = formatDateKey(selectedStart, selectedEnd);

  return (
    <div className="relative w-full max-w-5xl mx-auto perspective-container mt-32 pb-24">
      {/* Hidden Audio Element for Flip Sound */}
      <audio 
        ref={audioRef} 
        src="/IMG/AUDIO.mp3" 
        preload="auto" 
      />
      
      {/* 
        Hanging Detail: 
        Wire Arch and Spiral Binder
      */}
      <div className="wire-hanger-container">
        <div className="hanger-nail" />
        <div className="wire-hanger-arch">
          <div className="wire-hanger-center-loop" />
        </div>
      </div>

      {/* The Spiral rings that bind the paper */}
      <div className="spiral-wire">
        {[...Array(18)].map((_, i) => (
          <div key={i} className="spiral-ring shadow-md" />
        ))}
      </div>

      {/* The Physical Calendar Paper */}
      <div className={`calendar-paper relative flex flex-col w-full text-card-foreground overflow-visible ring-1 ring-black/5 dark:ring-white/5 group transition-all duration-700 flip-origin-top animate-in fade-in zoom-in-95 ${
        flipState === "next" ? "is-flipping-next" : flipState === "prev" ? "is-flipping-prev" : ""
      }`}>
        
        {/* Top Half - Artwork Anchor */}
        <div className="w-full relative shrink-0 z-10 p-4 md:p-6 h-[280px] sm:h-[350px] md:h-[420px] lg:h-[480px]">
          <HeroSection 
            currentMonth={currentMonth} 
            onPrev={prevMonth}
            onNext={nextMonth}
          />
        </div>

        {/* Bottom Half - Integrated Grid & Notes Section */}
        <div className="flex flex-col md:flex-row w-full z-20 pb-12 bg-white dark:bg-card min-h-[500px] relative px-6 md:px-10 gap-8">
          
          {/* Left Side: Integrated Notes Area */}
          <div className="w-full md:w-[35%] flex-shrink-0 pt-4">
             <NotesPanel 
               key={`notes-${currentMonth.getMonth()}-${dateKey || "monthly"}`}
               dateKey={dateKey || "monthly"} 
               selectedStart={selectedStart} 
               selectedEnd={selectedEnd} 
               currentMonth={currentMonth}
             />
          </div>

          {/* Right Side: Editorial Calendar Grid */}
          <div className="flex-1 pt-4 overflow-y-visible w-full">
            <CalendarGrid 
              currentMonth={currentMonth} 
              selectedStart={selectedStart}
              selectedEnd={selectedEnd}
              onDateClick={handleDateClick}
            />
          </div>
        </div>
        
        {/* Paper Corner Curls (Visual Only) */}
        <div className="absolute -bottom-1 -left-1 w-8 h-8 bg-black/5 dark:bg-white/5 blur-sm -rotate-45 rounded-full pointer-events-none" />
        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-black/5 dark:bg-white/5 blur-sm rotate-45 rounded-full pointer-events-none" />
      </div>

      {/* Dark Mode Toggle Switch */}
      <div className="absolute -right-16 top-0 pointer-events-auto">
        <ThemeToggle />
      </div>

      {/* Subtle wall shadow */}
      <div className="absolute inset-0 -z-10 bg-black/5 dark:bg-black/20 blur-[100px] rounded-full scale-110 pointer-events-none" />
    </div>
  );
}

