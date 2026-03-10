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
    title: "Binary Tree",
    description: "Hierarchical structure with recursive properties. Explore traversals and BST logic.",
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

        <div className="flex flex-col items-center gap-1.5 px-6 py-2 bg-primary/5 [.light_&]:bg-[#007AFF]/5 border border-primary/20 [.light_&]:border-[#007AFF]/20 rounded-2xl animate-fade-in backdrop-blur-sm group hover:border-primary/40 [.light_&]:hover:border-[#007AFF]/40 transition-all cursor-default scale-110 mb-2">
          <div className="flex items-center gap-2">
            <Cpu size={14} className="text-primary group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-primary">A almahmud_17 project</span>
          </div>
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

      {/* Visualizer Grid */}
      <div id="visualizers" className="container max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visualizers.map((viz, idx) => (
            <Link
              key={idx}
              href={viz.href}
              className="group glass-card p-8 flex flex-col gap-6 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
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

      {/* Attribution */}
      <footer className="mt-20 pb-10 flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent mb-4" />
        <p className="text-xs font-mono tracking-[0.2em] ">
          A almahmud_17 project
        </p>
        <p className="text-[10px] font-bold text-primary/ tracking-widest">
          powered by torchR
        </p>
      </footer>
    </main>
  );
}
