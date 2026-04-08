import React, { useState } from "react";
import { format, isSameDay } from "date-fns";
import { storage } from "../utils/storage";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function NotesPanel({ dateKey, selectedStart, selectedEnd, currentMonth }) {
  const monthKey = format(currentMonth, "yyyy-MM");
  const storageKey = `deluxe_notes_${monthKey}_${dateKey}`; // new key avoids breaking on legacy simple strings

  // Initialize state synchronously on mount to avoid lag/flashing
  const [data, setData] = useState(() => {
    const stored = storage.get(storageKey);
    if (stored && typeof stored === 'object' && !Array.isArray(stored)) {
      return {
        focus: Array.isArray(stored.focus) ? stored.focus : [],
        habits: Array.isArray(stored.habits) ? stored.habits : [],
        notes: Array.isArray(stored.notes) ? stored.notes : (typeof stored.notes === 'string' && stored.notes ? [{ id: Date.now(), text: stored.notes, completed: false }] : [])
      };
    }
    return { focus: [], habits: [], notes: [] };
  });
  
  const [newFocus, setNewFocus] = useState("");
  const [newHabit, setNewHabit] = useState("");
  const [newNote, setNewNote] = useState("");

  const saveData = (newData) => {
    setData(newData);
    storage.set(storageKey, newData);
  };

  const handleFocusAdd = (e) => {
    if (e.key === "Enter" && newFocus.trim() && data.focus.length < 3) {
      e.preventDefault();
      saveData({
        ...data,
        focus: [...data.focus, { id: Date.now(), text: newFocus.trim(), completed: false }]
      });
      setNewFocus("");
    }
  };

  const handleHabitAdd = (e) => {
    if (e.key === "Enter" && newHabit.trim()) {
      e.preventDefault();
      saveData({
        ...data,
        habits: [...data.habits, { id: Date.now(), text: newHabit.trim(), completed: false }]
      });
      setNewHabit("");
    }
  };

  const handleNoteAdd = (e) => {
    if (e.key === "Enter" && newNote.trim()) {
      e.preventDefault();
      saveData({
        ...data,
        notes: [...data.notes, { id: Date.now(), text: newNote.trim(), completed: false }]
      });
      setNewNote("");
    }
  };

  const toggleFocus = (id) => {
    saveData({
      ...data,
      focus: data.focus.map(f => f.id === id ? { ...f, completed: !f.completed } : f)
    });
  };

  const toggleHabit = (id) => {
    saveData({
      ...data,
      habits: data.habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h)
    });
  };

  const toggleNote = (id) => {
    saveData({
      ...data,
      notes: data.notes.map(n => n.id === id ? { ...n, completed: !n.completed } : n)
    });
  };

  const deleteFocus = (id) => saveData({ ...data, focus: data.focus.filter(f => f.id !== id) });
  const deleteHabit = (id) => saveData({ ...data, habits: data.habits.filter(h => h.id !== id) });
  const deleteNote = (id) => saveData({ ...data, notes: data.notes.filter(n => n.id !== id) });

  const dateLabel = !selectedStart 
    ? "Monthly Focus" 
    : selectedEnd && !isSameDay(selectedStart, selectedEnd)
      ? `${format(selectedStart, "MMM d")} - ${format(selectedEnd, "MMM d")}` 
      : format(selectedStart, "MMMM d");
  
  const focusCompleted = data.focus.filter(f => f.completed).length;
  const focusTotal = data.focus.length;
  const progressPercent = focusTotal === 0 ? 0 : (focusCompleted / focusTotal) * 100;

  return (
    <div className="flex flex-col h-full w-full bg-transparent select-none relative transition-colors duration-500">
      {/* Editorial Printed Header */}
      <div className="flex flex-col space-y-4 mb-4">
        
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-3">
            <h4 className="text-[16px] font-bold text-foreground dark:text-white/90 font-montserrat tracking-tight uppercase">
              {dateLabel}
            </h4>
          </div>
          {selectedStart && (
             <span className="text-[10px] font-bold text-primary dark:text-primary-foreground uppercase tracking-widest bg-primary/10 dark:bg-primary/30 px-2 py-1 rounded shadow-sm">
               Target Date
             </span>
          )}
        </div>
      </div>

      <div className="relative flex-1 group/notes">
        <AnimatePresence mode="wait">
          <motion.div
            key={storageKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full overflow-y-auto scrollbar-hide"
          >
            {/* The Ruled Paper Task List */}
            <div className="w-full h-[500px] md:h-full min-h-[400px] overflow-hidden ruled-paper p-0 font-inter transition-all duration-300">
              
              {/* TOP 3 PRIORITIES */}
              <div className="flex items-center justify-between mt-1" style={{ height: "30px" }}>
                <span className="text-[11px] font-black uppercase tracking-[0.15em] text-primary drop-shadow-sm">Top 3 Priorities</span>
                <div className="w-24 h-1.5 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden shadow-inner hidden sm:block">
                  <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              {data.focus.map((task, i) => (
                <div key={task.id} className="flex items-center group/task" style={{ height: "30px" }}>
                  <button onClick={() => toggleFocus(task.id)} className="w-8 flex justify-center items-center h-full opacity-80 hover:opacity-100">
                    <div className={cn("w-3.5 h-3.5 flex items-center justify-center rounded-[3px] border transition-all", task.completed ? "bg-primary border-primary text-primary-foreground scale-110" : "border-foreground/30 dark:border-white/30")}>
                      {task.completed && <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </div>
                  </button>
                  <span className={cn("flex-1 text-sm md:text-base pr-2 truncate", task.completed ? "text-foreground/40 dark:text-white/30 line-through decoration-primary/30" : "text-foreground dark:text-white font-medium")}>{task.text}</span>
                  <button onClick={() => deleteFocus(task.id)} className="opacity-0 group-hover/task:opacity-100 px-2 text-destructive font-bold text-xs">×</button>
                </div>
              ))}
              
              {data.focus.length < 3 && (
                <div className="flex items-center" style={{ height: "30px" }}>
                  <div className="w-8 flex items-center justify-center text-primary/60 font-bold text-xs tracking-widest">{data.focus.length + 1}.</div>
                  <input type="text" value={newFocus} onChange={e => setNewFocus(e.target.value)} onKeyDown={handleFocusAdd} placeholder="Enter priority..." className="flex-1 bg-transparent border-none outline-none text-sm md:text-base placeholder:text-primary/40 text-primary font-bold truncate" />
                </div>
              )}

              {/* Empty spacing for visual alignment if not full */}
              {Array.from({ length: Math.max(0, 2 - data.focus.length) }).map((_, i) => (
                <div key={`empty-${i}`} style={{ height: "30px" }} />
              ))}

              {/* HABITS */}
              <div className="flex items-center mt-3" style={{ height: "30px" }}>
                <span className="text-[11px] font-black uppercase tracking-[0.15em] text-foreground/40 dark:text-white/40">Habit Tracker</span>
              </div>
              
              {data.habits.map(habit => (
                <div key={habit.id} className="flex items-center group/task" style={{ height: "30px" }}>
                  <button onClick={() => toggleHabit(habit.id)} className="w-8 flex justify-center items-center h-full opacity-60 hover:opacity-100">
                    <div className={cn("w-3 h-3 rounded-full border transition-all", habit.completed ? "bg-green-500 border-green-500 shadow-sm" : "border-foreground/30 dark:border-white/30")} />
                  </button>
                  <span className={cn("flex-1 text-[13px] md:text-sm pr-2 truncate font-medium", habit.completed ? "text-foreground/30 dark:text-white/30 line-through" : "text-foreground/70 dark:text-white/70")}>{habit.text}</span>
                  <button onClick={() => deleteHabit(habit.id)} className="opacity-0 group-hover/task:opacity-100 px-2 text-destructive font-bold text-xs">×</button>
                </div>
              ))}
              
              <div className="flex items-center" style={{ height: "30px" }}>
                <div className="w-8 flex justify-center items-center h-full opacity-40">
                  <span className="text-xl leading-none text-foreground/50">+</span>
                </div>
                <input type="text" value={newHabit} onChange={e => setNewHabit(e.target.value)} onKeyDown={handleHabitAdd} placeholder="Add habit..." className="flex-1 bg-transparent border-none outline-none text-[13px] md:text-sm placeholder:text-foreground/30 text-foreground/60 font-medium truncate" />
              </div>

              {/* NOTES */}
              <div className="flex items-center mt-3" style={{ height: "30px" }}>
                <span className="text-[11px] font-black uppercase tracking-[0.15em] text-foreground/40 dark:text-white/40">Memos & Thoughts</span>
              </div>

              {data.notes.map(note => (
                <div key={note.id} className="flex items-center group/task" style={{ height: "30px" }}>
                  <button onClick={() => toggleNote(note.id)} className="w-8 flex justify-center items-center h-full opacity-60 hover:opacity-100">
                    <div className={cn("w-3 h-3 rounded-full border transition-all", note.completed ? "bg-primary/60 border-primary/60 shadow-sm" : "border-foreground/30 dark:border-white/30")} />
                  </button>
                  <span className={cn("flex-1 text-[13px] md:text-sm pr-2 truncate font-medium", note.completed ? "text-foreground/30 dark:text-white/30 line-through" : "text-foreground/70 dark:text-white/70")}>{note.text}</span>
                  <button onClick={() => deleteNote(note.id)} className="opacity-0 group-hover/task:opacity-100 px-2 text-destructive font-bold text-xs">×</button>
                </div>
              ))}
              
              <div className="flex items-center" style={{ height: "30px" }}>
                <div className="w-8 flex justify-center items-center h-full opacity-40">
                  <span className="text-xl leading-none text-foreground/50">+</span>
                </div>
                <input type="text" value={newNote} onChange={e => setNewNote(e.target.value)} onKeyDown={handleNoteAdd} placeholder="Add thought..." className="flex-1 bg-transparent border-none outline-none text-[13px] md:text-sm placeholder:text-foreground/30 text-foreground/60 font-medium truncate" />
              </div>
              
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}


