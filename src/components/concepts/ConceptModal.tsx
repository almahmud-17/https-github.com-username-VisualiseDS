"use client";

import { memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, BookOpen, Clock, Zap, Info, ExternalLink } from "lucide-react";
import type { TopicDetail } from "@/concepts/types";
import { CLASSIC_BOOKS } from "@/concepts/books";

interface ConceptModalProps {
  topic: TopicDetail;
  onClose: () => void;
}

export const ConceptModal = memo(function ConceptModal({
  topic,
  onClose,
}: ConceptModalProps) {
  const books = topic.sources
    .map((id) => CLASSIC_BOOKS[id])
    .filter(Boolean);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <motion.div
        className="concept-modal relative w-full max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-2xl border border-[var(--border-color)] shadow-2xl"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/10 hover:bg-red-500/20 hover:text-red-400 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <motion.div layout={false} className="p-8 sm:p-10 space-y-8">
          <header className="space-y-3 pr-10">
            {topic.chapter && (
              <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-primary/70">
                {topic.chapter}
              </p>
            )}
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-tight">
              {topic.title}
            </h2>
          </header>

          {books.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {books.map((book) => (
                <span
                  key={book.id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold border"
                  style={{
                    borderColor: `${book.spine}55`,
                    backgroundColor: `${book.spine}18`,
                    color: book.spine,
                  }}
                >
                  <BookOpen size={12} />
                  {book.short}
                  {book.edition && (
                    <span className="opacity-60 font-normal">· {book.edition}</span>
                  )}
                </span>
              ))}
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-muted-foreground flex items-center gap-2">
              <Info size={12} /> Definition
            </h3>
            <p className="font-serif text-lg leading-relaxed text-foreground/90">
              {topic.definition}
            </p>
          </div>

          {topic.classicNote && (
            <blockquote className="classic-quote pl-5 border-l-2 border-amber-600/50 py-1">
              <p className="font-serif text-base italic text-foreground/80 leading-relaxed">
                {topic.classicNote}
              </p>
              <footer className="mt-2 text-[10px] uppercase tracking-widest text-amber-600/80 font-bold">
                — From the textbooks
              </footer>
            </blockquote>
          )}

          <div className="grid sm:grid-cols-2 gap-6">
            {topic.keyOperations && (
              <div>
                <h3 className="text-[10px] font-black tracking-widest uppercase text-emerald-500 mb-3">
                  Key Operations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {topic.keyOperations.map((op) => (
                    <span
                      key={op}
                      className="px-2.5 py-1 text-xs font-bold rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    >
                      {op}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {topic.complexity && (
              <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)]">
                <h3 className="text-[10px] font-black tracking-widest uppercase text-muted-foreground mb-2 flex items-center gap-2">
                  <Clock size={12} /> Complexity
                </h3>
                <p className="font-mono text-lg font-bold text-primary">{topic.complexity}</p>
              </div>
            )}
          </div>

          {topic.useCases && (
            <div>
              <h3 className="text-[10px] font-black tracking-widest uppercase text-primary mb-3 flex items-center gap-2">
                <Zap size={12} /> Applications
              </h3>
              <ul className="space-y-2">
                {topic.useCases.map((uc) => (
                  <li key={uc} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1.5">▸</span>
                    {uc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {topic.prosCons && (
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-emerald-500 mb-2">
                  Advantages
                </h4>
                <ul className="space-y-1">
                  {topic.prosCons.pros.map((p) => (
                    <li key={p} className="text-[11px] text-muted-foreground">
                      + {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/15">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-red-500 mb-2">
                  Limitations
                </h4>
                <ul className="space-y-1">
                  {topic.prosCons.cons.map((c) => (
                    <li key={c} className="text-[11px] text-muted-foreground">
                      − {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {topic.mnemonic && (
            <div className="p-5 rounded-xl bg-primary/5 border border-dashed border-primary/25">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">
                Memory Aid
              </p>
              <p className="font-serif text-lg italic text-foreground/90">
                &ldquo;{topic.mnemonic}&rdquo;
              </p>
            </div>
          )}

          <motion.div layout={false} className="flex flex-col sm:flex-row gap-3 pt-2">
            {topic.visualizeHref && (
              <Link
                href={topic.visualizeHref}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-white font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Visualize <ExternalLink size={14} />
              </Link>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 rounded-xl border border-[var(--border-color)] font-bold text-sm uppercase tracking-wider hover:bg-white/5 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
});
