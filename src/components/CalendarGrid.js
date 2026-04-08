import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
} from "date-fns";
import { DayCell } from "./DayCell";
import { motion, AnimatePresence } from "framer-motion";

// Sunday to Saturday to match the reference image exactly
const DAYS_OF_WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function CalendarGrid({ currentMonth, selectedStart, selectedEnd, onDateClick }) {
  // Generate days for the grid starting on Sunday
  const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start, end });

  return (
    <div className="w-full select-none transition-colors duration-500">
      {/* Grid Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-2xl font-black text-foreground dark:text-white font-inter tracking-tight">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
          <span className="text-foreground/30 dark:text-white/30 text-[10px] font-black font-montserrat tracking-[0.2em] uppercase">
            Active Grid
          </span>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 mb-6">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="text-center text-[11px] font-black text-foreground/40 dark:text-white/30 uppercase tracking-[0.15em] font-montserrat"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Physical Grid */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentMonth.toISOString()}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="grid grid-cols-7 gap-y-1"
        >
          {days.map((day) => (
            <DayCell
              key={day.toISOString()}
              day={day}
              selectedStart={selectedStart}
              selectedEnd={selectedEnd}
              onClick={onDateClick}
              isCurrentMonth={isSameMonth(day, currentMonth)}
              isToday={isToday(day)}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}


