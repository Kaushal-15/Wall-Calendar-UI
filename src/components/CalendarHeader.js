import React from "react";
import { format } from "date-fns";
import { Button } from "./ui/button";

// Inline SVG chevron icons to avoid lucide-react version conflict
function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  );
}

export function CalendarHeader({ currentMonth, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-between mb-8 px-2">
      <h2 className="text-3xl font-bold text-foreground tracking-tight select-none">
        {format(currentMonth, "MMMM yyyy")}
      </h2>
      <div className="flex space-x-3">
        <Button
          variant="outline"
          size="icon"
          onClick={onPrev}
          className="rounded-full h-10 w-10 flex items-center justify-center border-border/50 hover:border-primary/50 hover:bg-muted transition-all text-muted-foreground hover:text-foreground"
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onNext}
          className="rounded-full h-10 w-10 flex items-center justify-center border-border/50 hover:border-primary/50 hover:bg-muted transition-all text-muted-foreground hover:text-foreground"
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
}
