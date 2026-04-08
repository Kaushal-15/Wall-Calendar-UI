import React from "react";
import { isSameDay } from "date-fns";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

export function DayCell({ day, selectedStart, selectedEnd, onClick, isCurrentMonth, isToday }) {
  const isStart = selectedStart && isSameDay(day, selectedStart);
  const isEnd = selectedEnd && isSameDay(day, selectedEnd);
  const isWeekend = day.getDay() === 0 || day.getDay() === 6;
  
  // Dummy logic for tasks to fulfill the UI request ("has tasks -> small dot below number")
  // In a real app, this would check against a tasks array
  const hasTasks = isCurrentMonth && (day.getDate() % 7 === 0 || day.getDate() === 15);
  
  const isSelectionRange =
    selectedStart &&
    selectedEnd &&
    day >= selectedStart &&
    day <= selectedEnd;

  const isBetween = isSelectionRange && !isStart && !isEnd;

  return (
    <div className="relative aspect-square flex items-center justify-center">
      {/* Background Range Highlight */}
      {isSelectionRange && (
        <motion.div 
          layoutId="range-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn(
            "absolute inset-y-2 bg-primary/15 dark:bg-primary/25 pointer-events-none z-0",
            isStart && !isEnd && "left-1/2 right-0 rounded-l-none",
            isEnd && !isStart && "left-0 right-1/2 rounded-r-none",
            isBetween && "left-0 right-0",
            isStart && isEnd && "hidden"
          )}
        />
      )}

      <button
        onClick={() => onClick(day)}
        className={cn(
          "relative w-10 h-10 flex items-center justify-center text-sm font-bold transition-all duration-300 outline-none select-none rounded-full z-10 font-inter group flex-col",
          !isCurrentMonth ? "text-foreground/30 dark:text-white/30 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer" : "cursor-pointer text-foreground hover:bg-black/5 dark:hover:bg-white/5",
          isToday && !isStart && !isEnd && "text-primary font-black",
          isWeekend && isCurrentMonth && !isStart && !isEnd && "text-foreground/60 dark:text-white/60 bg-black/[0.02] dark:bg-white/[0.02]"
        )}
      >
        {/* Selection Circle Marker */}
        {(isStart || isEnd) && (
          <motion.div 
            layoutId="selection-circle"
            className="absolute inset-0 bg-primary rounded-full shadow-[0_4px_12px_rgba(28,158,224,0.4)] z-[-1]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        )}

        {/* Today Indicator */}
        {isToday && !isStart && !isEnd && (
          <motion.div 
            className="absolute inset-0 border-2 border-primary/30 rounded-full z-[-1]"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        <span className={cn(
          "transition-colors duration-300 relative z-10 leading-none",
          (isStart || isEnd) ? "text-white" : "group-hover:text-primary",
          hasTasks ? "-mt-2" : ""
        )}>
          {day.getDate()}
        </span>

        {/* Start/End Underline Indicator - more distinct */}
        {(isStart || isEnd) && (
          <motion.div 
            layoutId={`underline-${day.toISOString()}`}
            className="absolute -bottom-0.5 left-1/4 right-1/4 h-[3px] bg-green-500 rounded-full z-20 shadow-[0_1px_4px_rgba(34,197,94,0.4)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
          />
        )}

        {/* Task Indicator Dot */}
        {hasTasks && (
          <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-primary/60 dark:bg-primary/80 shadow-sm" />
        )}



        {/* Hover Glow / Paint Effect */}
        {isCurrentMonth && !isStart && !isEnd && (
          <motion.div 
            className="absolute inset-1 rounded-full opacity-0 group-hover:opacity-100 bg-primary/10 pointer-events-none z-0"
            initial={false}
            whileHover={{ scale: 1.1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
        )}
      </button>
    </div>
  );
}


