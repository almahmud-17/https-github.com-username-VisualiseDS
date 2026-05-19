"use client";

import Link from "next/link";
import {
  ArrowRight,
  Layers,
  GitCommit,
  Network,
  Triangle,
  BarChart3,
  Cpu,
  Code2,
  SquareStack,
  Search
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { BrandFooter } from "@/components/brand/BrandFooter";
import { PremiumButton } from "@/components/ui/PremiumButton";

const visualizers = [
  {
    title: "Stack",
    description: "LIFO structure with Polish Notation (Infix, Prefix, Postfix) evaluation.",
    icon: <Layers className="text-secondary" />,
    href: "/visualize/stack",
    color: "bg-secondary/10 border-secondary/20 hover:border-secondary/50",
  },
  {
    title: "Queue",
    description: "FIFO structure supporting Linear, Circular and Priority Queue types.",
    icon: <SquareStack className="text-accent" />,
    href: "/visualize/queue",
    color: "bg-accent/10 border-accent/20 hover:border-accent/50",
  },
  {
    title: "Linked List",
    description: "Visualize variations: Singly, Doubly, and Circular Linked Lists.",
    icon: <Network className="text-primary" />,
    href: "/visualize/linked-list",
    color: "bg-primary/10 border-primary/20 [.light_&]:border-[#007AFF]/20 hover:border-primary/50",
  },
  {
    title: "Tree Visualizers",
    description: "Binary Tree, BST, AVL, Max Heap & Min Heap — insert, traverse, search, and heap extract.",
    icon: <Triangle className="text-purple-400" size={24} />,
    href: "/visualize/tree",
    color: "bg-purple-500/10 border-purple-500/20 hover:border-purple-500/50"
  },
  {
    title: "Sorting Algorithms",
    description: "Compare Bubble, Selection, Insertion, Merge, and Quick sorting in real-time.",
    icon: <BarChart3 className="text-orange-400" />,
    href: "/visualize/sorting",
    color: "bg-orange-500/10 border-orange-500/20 hover:border-orange-500/50",
  },
  {
    title: "Tower of Hanoi",
    description: "Classical puzzle logic visualizing recursion and movement constraints.",
    icon: <Cpu className="text-pink-400" />,
    href: "/visualize/hanoi",
    color: "bg-pink-500/10 border-pink-500/20 hover:border-pink-500/50",
  },
  {
    title: "Searching Algorithms",
    description: "Explore Linear Search and Binary Search with step-by-step visualizations.",
    icon: <Search className="text-emerald-400" />,
    href: "/visualize/search",
    color: "bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/50",
  }
];

export default function Home() {
  return (
    <main className="min-h-screen pt-20 flex flex-col items-center overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="container max-w-7xl px-6 py-32 flex flex-col items-center text-center gap-8 relative overflow-hidden">
        {/* Stylish the Glass Container */}
        <div className="absolute inset-0 max-w-5xl mx-auto h-[600px] top-1/2 -translate-y-1/2 bg-gradient-to-b from-blue-900/40 via-blue-900/10 to-transparent rounded-[4rem] border border-white/5 [.light_&]:border-black/5 backdrop-blur-3xl -z-20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 [.light_&]:bg-[#007AFF]/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

        <div className="mb-4">
          <BrandLogo variant="hero" asLink={false} className="flex-col sm:flex-row items-center justify-center gap-4" />
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-foreground leading-[0.9] max-w-4xl">
          Visualizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary/80 [.light_&]:from-[#007AFF] [.light_&]:via-[#6E6BFF] [.light_&]:to-[#A855F7] animate-gradient">DSA</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
          Understand computer science fundamentals through immersive visualizations and interactive algorithm exploration!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <PremiumButton
            variant="gradient"
            className="px-8 py-4 text-lg rounded-2xl group shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] transition-all"
            onClick={() => document.getElementById('visualizers')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Visualizers
          </PremiumButton>
          <Link href="/concepts">
            <PremiumButton variant="secondary" className="px-8 py-4 text-lg rounded-2xl group border border-white/10 hover:border-primary/50 transition-all">
              <Code2 size={20} className="text-primary group-hover:scale-110 transition-transform" /> Concepts
            </PremiumButton>
          </Link>
        </div>
      </section>

      <section className="container max-w-7xl px-6 py-4">
        <div className="glass-card smooth-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">
              Absolute Beginner → Algorithmic Thinker
            </p>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Learn theory, then visualize step by step
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl">
              Classic concepts from CLRS, Knuth & Sedgewick — then launch interactive visualizers.
            </p>
          </div>
          <Link
            href="/concepts"
            className="shrink-0 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Explore Concepts →
          </Link>
        </div>
      </section>

      {/* Visualizer Grid */}
      <div id="visualizers" className="container max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visualizers.map((viz, idx) => (
            <Link
              key={idx}
              href={viz.href}
              className="group glass-card smooth-card p-8 flex flex-col gap-6 hover:border-primary/30"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${viz.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                {viz.icon}
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {viz.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {viz.description}
                </p>
              </div>

              <div className="mt-auto pt-4 flex items-center gap-2 text-primary font-semibold text-sm">
                Launch Visualizer <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <BrandFooter />
    </main>
  );
}
