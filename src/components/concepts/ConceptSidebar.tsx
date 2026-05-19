"use client";

import { memo } from "react";
import { LEARNING_PATH } from "@/concepts/curriculum";

interface ConceptSidebarProps {
  activeId: string;
  onNavigate: (id: string) => void;
}

export const ConceptSidebar = memo(function ConceptSidebar({
  activeId,
  onNavigate,
}: ConceptSidebarProps) {
  return (
    <nav className="concept-sidebar sticky top-24 hidden lg:block w-56 shrink-0">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4 px-2">
        Learning Path
      </p>
      <ol className="space-y-1">
        {LEARNING_PATH.map((section, i) => (
          <li key={section.id}>
            <button
              type="button"
              onClick={() => onNavigate(section.id)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeId === section.id
                  ? "bg-primary/15 text-primary border border-primary/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              <span className="text-[10px] font-mono opacity-50 mr-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              {section.title}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
});
