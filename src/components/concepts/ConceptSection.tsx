"use client";

import { memo } from "react";
import { ChevronRight } from "lucide-react";
import type { CourseSection } from "@/concepts/types";
import { getTopicDetail } from "@/concepts/topics";

interface ConceptSectionProps {
  section: CourseSection;
  index: number;
  onSelectTopic: (conceptKey: string) => void;
}

export const ConceptSection = memo(function ConceptSection({
  section,
  index,
  onSelectTopic,
}: ConceptSectionProps) {
  return (
    <article
      id={section.id}
      className="concept-section glass-card p-6 sm:p-8 flex flex-col gap-5 scroll-mt-28"
      style={{ contentVisibility: "auto", containIntrinsicSize: "0 420px" }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-1 h-14 rounded-full shrink-0"
          style={{ backgroundColor: section.color }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              {section.title}
            </h2>
            <span className="text-4xl font-black text-foreground/[0.04] select-none">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            {section.definition}
          </p>
        </div>
      </div>

      <ul className="grid gap-1.5">
        {section.concepts.map((concept) => {
          const detail = getTopicDetail(concept);
          const hasViz = !!detail.visualizeHref;
          return (
            <li key={concept}>
              <button
                type="button"
                onClick={() => onSelectTopic(concept)}
                className="concept-topic-btn w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl group"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0 transition-transform group-hover:scale-125"
                  style={{ backgroundColor: section.color }}
                />
                <span className="flex-1 text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
                  {concept}
                </span>
                {hasViz && (
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary/60 hidden sm:inline">
                    Visualize
                  </span>
                )}
                <ChevronRight
                  size={14}
                  className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </article>
  );
});
