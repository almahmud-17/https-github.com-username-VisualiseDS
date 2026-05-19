"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { BookOpen, Search, GraduationCap } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { LEARNING_PATH } from "@/concepts/curriculum";
import { getTopicDetail } from "@/concepts/topics";
import type { TopicDetail } from "@/concepts/types";
import { BookShelf } from "@/components/concepts/BookShelf";
import { ConceptSidebar } from "@/components/concepts/ConceptSidebar";
import { ConceptSection } from "@/components/concepts/ConceptSection";
import { ConceptModal } from "@/components/concepts/ConceptModal";
import { BrandFooter } from "@/components/brand/BrandFooter";

export default function ConceptsPage() {
  const [selectedTopic, setSelectedTopic] = useState<TopicDetail | null>(null);
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState(LEARNING_PATH[0].id);

  const filteredPath = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return LEARNING_PATH;
    return LEARNING_PATH.map((section) => ({
      ...section,
      concepts: section.concepts.filter(
        (c) =>
          c.toLowerCase().includes(q) ||
          getTopicDetail(c).title.toLowerCase().includes(q)
      ),
    })).filter((s) => s.concepts.length > 0);
  }, [search]);

  const handleSelectTopic = useCallback((conceptKey: string) => {
    setSelectedTopic(getTopicDetail(conceptKey));
  }, []);

  const scrollToSection = useCallback((id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const sections = LEARNING_PATH.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [filteredPath]);

  return (
    <main className="min-h-screen pt-20 pb-16 concepts-page">
      <Navbar />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero */}
        <header className="text-center py-12 sm:py-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-primary/20 bg-primary/5">
            <GraduationCap size={16} className="text-primary" />
            <span className="text-[10px] font-black tracking-[0.35em] uppercase text-primary">
              Classic Curriculum
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-foreground tracking-tight mb-4">
            Data Structures &{" "}
            <span className="text-primary italic">Algorithms</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed font-medium">
            Concepts distilled from CLRS, Knuth, Sedgewick, Horowitz & Sahni — then
            brought to life in our visualizers. Learn the theory, see the animation.
          </p>
          <BookShelf />

          <div className="relative max-w-md mx-auto mt-8">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search topics…"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/20 border border-white/10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 [.light_&]:bg-white/60 [.light_&]:border-black/10"
            />
          </div>
        </header>

        {/* log2base2-style: sidebar + content */}
        <div className="flex gap-10 items-start">
          <ConceptSidebar activeId={activeSection} onNavigate={scrollToSection} />

          <div className="flex-1 min-w-0 space-y-6">
            {filteredPath.length === 0 ? (
              <p className="text-center text-muted-foreground py-20">
                No topics match &ldquo;{search}&rdquo;
              </p>
            ) : (
              filteredPath.map((section, idx) => (
                <ConceptSection
                  key={section.id}
                  section={section}
                  index={idx}
                  onSelectTopic={handleSelectTopic}
                />
              ))
            )}
          </div>
        </div>

        <p className="mt-16 text-xs text-muted-foreground flex items-center justify-center gap-2 text-center px-4">
          <BookOpen size={12} />
          References: Cormen et al. · Knuth · Sedgewick · Horowitz & Sahni · AHU · Weiss · Skiena · Goodrich
        </p>
        <BrandFooter />
      </div>

      <AnimatePresence>
        {selectedTopic && (
          <ConceptModal
            topic={selectedTopic}
            onClose={() => setSelectedTopic(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
