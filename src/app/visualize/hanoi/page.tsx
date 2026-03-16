"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { LogicBreakdown } from "@/components/LogicBreakdown";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { getHanoiSteps, HanoiStep } from "@/algorithms/hanoi";
import {
      Play,
      Pause,
      ChevronRight,
      RotateCcw,
      Activity,
      Settings,
      Layers,
      Terminal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const MAX_DISKS = 6;
const MIN_DISKS = 3;


export default function HanoiPage() {
      const [numDisks, setNumDisks] = useState(4);
      const [steps, setSteps] = useState<HanoiStep[]>([]);
      const [currentStep, setCurrentStep] = useState(0);
      const [isPlaying, setIsPlaying] = useState(false);
      const [speed, setSpeed] = useState(50);
      const timerRef = useRef<NodeJS.Timeout | null>(null);

      useEffect(() => {
            handleReset();
      }, [numDisks]);

      useEffect(() => {
            if (isPlaying && currentStep < steps.length - 1) {
                  const delay = (101 - speed) * 10;
                  timerRef.current = setTimeout(() => {
                        setCurrentStep((prev) => prev + 1);
                  }, delay);
            } else if (currentStep >= steps.length - 1) {
                  setIsPlaying(false);
            }
            return () => { if (timerRef.current) clearTimeout(timerRef.current); };
      }, [isPlaying, currentStep, steps.length, speed]);

      const handleReset = () => {
            const newSteps = getHanoiSteps(numDisks);
            setSteps(newSteps);
            setCurrentStep(0);
            setIsPlaying(false);
      };

      const currentData = steps[currentStep] || { pegs: [[], [], []] };

      return (
            <main className="min-h-screen pt-24 pb-12 flex flex-col items-center">
                  <Navbar />

                  <div className="container max-w-7xl flex-1 flex flex-col gap-8 px-6 text-center md:text-left">
                        <div className="flex flex-col gap-2">
                              <div className="flex flex-col md:flex-row md:items-center gap-3">
                                    <h1 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight">
                                          Tower of <span className="text-pink-500 italic">Hanoi</span>
                                    </h1>
                                    <div className="bg-pink-500/10 border border-pink-500/30 text-pink-400 [.light_&]:text-[#007AFF] [.light_&]:bg-[#007AFF]/10 [.light_&]:border-[#007AFF]/30 px-3 py-1 rounded-full text-[10px] font-black font-mono tracking-widest shadow-[0_0_20px_rgba(236,72,153,0.1)] w-fit mx-auto md:mx-0">
                                          O(2ⁿ - 1)
                                    </div>
                              </div>
                              <p className="text-muted-foreground text-lg font-semibold tracking-wide border-l-4 border-pink-500/30 [.light_&]:border-[#007AFF]/30 pl-4 py-1 max-w-2xl mx-auto md:mx-0">
                                    A classic mathematical puzzle where you move all disks from Peg A to Peg C,
                                    never placing a larger disk on top of a smaller one.
                              </p>
                        </div>

                        <div className="grid lg:grid-cols-12 gap-8 flex-1">
                              {/* Controls Panel */}
                              <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
                                    <div className="glass-card p-8 flex flex-col gap-8 border border-white/5 [.light_&]:border-black/5 relative overflow-hidden">
                                          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full" />

                                          <div className="flex flex-col gap-6">
                                                <div className="flex flex-col gap-4">
                                                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] px-1 flex items-center gap-2">
                                                            <Layers size={10} className="text-pink-500" /> Tower Height
                                                      </label>
                                                      <div className="liquid-selector gap-1 rounded-full">
                                                            {[3, 4, 5, 6].map((n) => (
                                                                  <button
                                                                        key={n}
                                                                        className={cn(
                                                                              "flex-1 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300",
                                                                              numDisks === n ? "liquid-selector-item-active" : "text-white/40 [.light_&]:text-black/40 hover:text-white [.light_&]:hover:text-black"
                                                                        )}
                                                                        onClick={() => setNumDisks(n)}
                                                                  >
                                                                        {n}
                                                                  </button>
                                                            ))}
                                                      </div>
                                                </div>

                                                <div className="flex flex-col gap-4">
                                                      <div className="flex items-center justify-between px-1">
                                                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-2">
                                                                  <Settings size={10} className="text-pink-500" /> Animation Speed
                                                            </label>
                                                            <span className="text-[10px] font-mono text-pink-400 font-black">{speed}%</span>
                                                      </div>
                                                      <div className="relative group px-1">
                                                            <input
                                                                  type="range" min="1" max="100" value={speed}
                                                                  onChange={(e) => setSpeed(parseInt(e.target.value))}
                                                                  className="w-full h-1.5 bg-white/5 [.light_&]:bg-black/10 rounded-lg appearance-none cursor-pointer accent-pink-500 transition-all duration-300 group-hover:h-2"
                                                            />
                                                      </div>

                                                      <div className="grid grid-cols-2 gap-3 mt-2">
                                                            <PremiumButton className="h-14 px-8 text-base font-black uppercase tracking-widest"
                                                                  variant="gradient"
                                                                  onClick={() => setIsPlaying(!isPlaying)}
                                                            >
                                                                  {isPlaying ? <><Pause size={16} /> Pause</> : <><Play size={16} fill="currentColor" /> {currentStep > 0 ? "Resume" : "Start"}</>}
                                                            </PremiumButton>
                                                            <PremiumButton className="h-14 px-8 text-base font-black uppercase tracking-widest"
                                                                  variant="primary"
                                                                  onClick={() => {
                                                                        setIsPlaying(false);
                                                                        setCurrentStep(p => Math.min(p + 1, steps.length - 1));
                                                                  }}
                                                                  disabled={currentStep >= steps.length - 1}
                                                            >
                                                                  <ChevronRight size={16} /> Step
                                                            </PremiumButton>
                                                            <PremiumButton className="h-14 px-8 text-xs font-black uppercase tracking-widest col-span-2" variant="secondary" onClick={handleReset}>
                                                                  <RotateCcw size={14} className="mr-2" /> Reset State
                                                            </PremiumButton>
                                                      </div>
                                                </div>

                                                {/* Move Logic Panel */}
                                                <div className="mt-2 p-5 rounded-[2rem] bg-white/5 [.light_&]:bg-black/5 border border-white/5 [.light_&]:border-black/5 space-y-4 backdrop-blur-sm">
                                                      <h3 className="text-[10px] font-black tracking-[0.3em] text-pink-500 uppercase flex items-center gap-2">
                                                            <Activity size={10} /> Operation
                                                      </h3>
                                                      {currentData.move ? (
                                                            <div className="flex flex-col gap-3">
                                                                  <p className="text-sm font-semibold text-foreground leading-relaxed">
                                                                        {currentData.move.description}
                                                                  </p>
                                                                  <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-t border-white/5 pt-3">
                                                                        <span className="opacity-50 font-mono tracking-tighter">PROGRESS:</span>
                                                                        <span className="text-pink-500">{currentStep} / {steps.length - 1}</span>
                                                                  </div>
                                                            </div>
                                                      ) : (
                                                            <p className="text-sm font-medium text-muted-foreground italic normal-case">Ready to solve...</p>
                                                      )}
                                                </div>
                                          </div>
                                          {/* Complexity Insight */}
                                          <div className="glass-card p-6 border border-white/5 [.light_&]:border-black/5 bg-gradient-to-br from-pink-500/5 to-transparent">
                                                <h3 className="text-xs font-black uppercase tracking-widest text-pink-400 [.light_&]:text-[#007AFF] mb-2 flex items-center gap-2">
                                                      <Activity size={14} /> Recursive Pattern
                                                </h3>
                                                <p className="text-xs text-muted-foreground font-medium leading-relaxed normal-case">
                                                      The moves required total O(2ⁿ - 1). For {numDisks} disks, it takes {Math.pow(2, numDisks) - 1} moves to complete the sequence.
                                                </p>
                                          </div>
                                    </div>
                              </div>

                              {/* Visualization Area */}
                              <div className="lg:col-span-8 glass-card border border-white/5 [.light_&]:border-black/5 flex flex-col min-h-[600px] relative order-1 lg:order-2 overflow-hidden bg-black/20 [.light_&]:bg-black/5">
                                    {/* Background Decor */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black text-white/[0.03] [.light_&]:text-black/[0.03] select-none pointer-events-none uppercase">
                                          HANOI
                                    </div>

                                    {/* Legend and Step Counter — TOP of canvas, no conflict with peg labels */}
                                    <div className="absolute top-6 left-8 right-8 flex items-center justify-between z-20">
                                          <div className="flex gap-6 px-4 py-2 bg-white/5 [.light_&]:bg-black/5 border border-white/10 [.light_&]:border-black/10 rounded-2xl backdrop-blur-sm">
                                                <div className="flex items-center gap-2">
                                                      <div className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div>
                                                      <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Active</span>
                                                </div>
                                                <div className="flex items-center gap-2 border-l border-white/10 [.light_&]:border-black/10 pl-4">
                                                      <div className="w-2 h-2 rounded-full bg-white/20 [.light_&]:bg-black/20"></div>
                                                      <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Idle</span>
                                                </div>
                                          </div>

                                          <div className="flex items-center gap-3 bg-pink-500/10 border border-pink-500/20 px-4 py-2 rounded-2xl font-mono text-[10px] font-black text-pink-400 tracking-widest uppercase">
                                                <Activity size={12} className="text-pink-500" />
                                                Step {currentStep} / {steps.length - 1}
                                          </div>
                                    </div>

                                    <div className="flex-1 flex items-end justify-around pb-20 px-12 relative z-10">
                                          {currentData.pegs.map((peg, pegIdx) => (
                                                <div key={pegIdx} className="relative flex flex-col items-center w-full max-w-[180px]">
                                                      {/* The Peg/Pole */}
                                                      <div className="absolute bottom-0 w-3 h-72 bg-gradient-to-t from-pink-500/20 to-pink-500/5 [.light_&]:from-slate-500/40 [.light_&]:to-slate-500/5 border-x border-white/10 [.light_&]:border-black/10 rounded-t-full -z-10" />
                                                      <div className="absolute bottom-0 w-32 h-2 bg-white/10 [.light_&]:bg-black/10 rounded-full -z-10 translate-y-2 blur-[2px]" />

                                                      {/* Peg Label — positioned below base, won't conflict with legend anymore */}
                                                      <div className="absolute -bottom-12 font-black text-lg text-white/20 [.light_&]:text-black/40 font-mono tracking-widest capitalize">
                                                            Peg {String.fromCharCode(65 + pegIdx)}
                                                      </div>

                                                      {/* Disks */}
                                                      <div className="flex flex-col-reverse items-center justify-end w-full space-y-[-4px]">
                                                            <AnimatePresence mode="popLayout">
                                                                  {peg.map((diskId, diskIdx) => {
                                                                        const width = 40 + (diskId * (130 / numDisks));
                                                                        return (
                                                                              <motion.div
                                                                                    key={`disk-${diskId}`}
                                                                                    layoutId={`disk-${diskId}`}
                                                                                    initial={{ y: -300, opacity: 0 }}
                                                                                    animate={{ y: 0, opacity: 1 }}
                                                                                    exit={{ y: -300, opacity: 0 }}
                                                                                    transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.8 }}
                                                                                    style={{ width: `${width}px` }}
                                                                                    className={cn(
                                                                                          "h-8 rounded-full shadow-lg border border-white/10 [.light_&]:border-black/10 flex items-center justify-center relative group",
                                                                                          diskId === currentData.move?.diskId ? "brightness-125 z-20" : "z-10"
                                                                                    )}
                                                                              >
                                                                                    {/* Glossy Overlay */}
                                                                                    <div className="absolute inset-x-2 top-1 h-3 bg-white/20 blur-[1px] rounded-full pointer-events-none" />

                                                                                    <div className={cn(
                                                                                          "absolute inset-0 rounded-full transition-all duration-500",
                                                                                          diskId === 1 ? "bg-gradient-to-r from-pink-500 to-rose-500" :
                                                                                                diskId === 2 ? "bg-gradient-to-r from-purple-500 to-indigo-500" :
                                                                                                      diskId === 3 ? "bg-gradient-to-r from-blue-500 to-cyan-500" :
                                                                                                            diskId === 4 ? "bg-gradient-to-r from-emerald-500 to-teal-500" :
                                                                                                                  diskId === 5 ? "bg-gradient-to-r from-amber-500 to-orange-500" :
                                                                                                                        "bg-gradient-to-r from-red-500 to-pink-500"
                                                                                    )} />

                                                                                    <span className="relative z-10 text-sm font-black text-white/80 [.light_&]:!text-white font-mono">{diskId}</span>
                                                                              </motion.div>
                                                                        );
                                                                  })}
                                                            </AnimatePresence>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </div>

                        {/* Logic Section */}
                        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 h-auto lg:h-[550px] mb-12">
                              <div className="h-[500px] lg:h-full">
                                    <LogicBreakdown steps={[
                                          { title: 'Move stack top', text: 'Relocate the stack above the largest disk to the auxiliary peg using recursion.' },
                                          { title: 'Transfer base', text: 'Directly move the largest disk from the start peg to the target peg.' },
                                          { title: 'Complete tower', text: 'Shift the stack back from the auxiliary peg over the base on the target peg.' }
                                    ]} complexity={'O(2^n)'} />
                              </div>
                              <div className="h-[500px] lg:h-full flex flex-col gap-6">
                                    <div className="flex items-center gap-3">
                                          <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 [.light_&]:text-[#007AFF]">
                                                <Terminal size={20} />
                                          </div>
                                          <h2 className="text-xl font-bold text-foreground tracking-tight uppercase">Algorithm Source</h2>
                                    </div>
                                    <div className="flex-1 relative group overflow-hidden rounded-[2.5rem] border border-white/5 [.light_&]:border-black/5 shadow-2xl bg-black/40 [.light_&]:bg-black/5 p-2">
                                          <img
                                                src="/toh.png"
                                                alt="Tower of Hanoi Implementation"
                                                className="w-full h-full object-contain rounded-[2rem]"
                                          />
                                          <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 [.light_&]:border-black/10 pointer-events-none" />
                                    </div>
                              </div>
                        </div>
                  </div>
            </main>
      );
}
