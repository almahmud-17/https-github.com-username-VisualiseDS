"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { CodePanel } from "@/components/CodePanel";
import { LogicBreakdown } from "@/components/LogicBreakdown";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { getLinearSearchSteps, getBinarySearchSteps, SearchStep } from "@/algorithms/search";
import { Play, Pause, RotateCcw, Search, ChevronRight, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchType = "linear" | "binary";

const SEARCH_DATA: Record<SearchType, {
   name: string,
   description: string,
   complexity: string,
   algorithm: string[]
}> = {
   linear: {
      name: "Linear Search",
      description: "Checks every element one by one until the target is found.",
      complexity: "O(n)",
      algorithm: [
         "Function linear_search(arr, target):",
         " For each index i from 0 to length of arr - 1:",
         " If arr[i] equals target:",
         "  Return i",
         " Return -1 (not found)"
      ]
   },
   binary: {
      name: "Binary Search",
      description: "Divide and conquer on a sorted array. Repeatedly halves the search space.",
      complexity: "O(log n)",
      algorithm: [
         "Function binary_search(arr, target):",
         " Initialize low as 0",
         " Initialize high as length of arr - 1",
         " ",
         " While low <= high:",
         " mid = (low + high) // 2",
         " If arr[mid] equals target:",
         "  Return mid",
         " If arr[mid] < target:",
         "  low = mid + 1",
         " Else:",
         "  high = mid - 1",
         " ",
         " Return -1 (not found)"
      ]
   }
};

const INITIAL_ARRAY_SIZE = 15;

export default function SearchPage() {
   const [type, setType] = useState<SearchType>("linear");
   const [array, setArray] = useState<number[]>([]);
   const [target, setTarget] = useState<number>(0);
   const [steps, setSteps] = useState<SearchStep[]>([]);
   const [currentStep, setCurrentStep] = useState(0);
   const [isPlaying, setIsPlaying] = useState(false);
   const [speed, setSpeed] = useState(50);
   const timerRef = useRef<NodeJS.Timeout | null>(null);

   const generateArray = () => {
      const newArr = Array.from({ length: INITIAL_ARRAY_SIZE }, () => Math.floor(Math.random() * 90) + 10);
      if (type === "binary") newArr.sort((a, b) => a - b);
      setArray(newArr);
      const randomTarget = newArr[Math.floor(Math.random() * newArr.length)];
      setTarget(randomTarget);
      setSteps([]);
      setCurrentStep(0);
      setIsPlaying(false);
   };

   useEffect(() => {
      generateArray();
   }, [type]);

   useEffect(() => {
      if (isPlaying && currentStep < steps.length - 1) {
         const delay = (101 - speed) * 10;
         timerRef.current = setTimeout(() => setCurrentStep(p => p + 1), delay);
      } else if (currentStep >= steps.length - 1 && steps.length > 0) {
         setIsPlaying(false);
      }
      return () => { if (timerRef.current) clearTimeout(timerRef.current); };
   }, [isPlaying, currentStep, steps, speed]);

   const handleSearch = () => {
      const newSteps = type === "linear"
         ? getLinearSearchSteps(array, target)
         : getBinarySearchSteps(array, target);
      setSteps(newSteps);
      setCurrentStep(0);
      setIsPlaying(true);
   };

   const handlePlayPause = () => {
      if (steps.length === 0) {
         handleSearch();
      } else {
         setIsPlaying(!isPlaying);
      }
   };

   const handleStep = () => {
      if (steps.length === 0) {
         const newSteps = type === "linear"
            ? getLinearSearchSteps(array, target)
            : getBinarySearchSteps(array, target);
         setSteps(newSteps);
         setCurrentStep(0);
      } else {
         setCurrentStep(p => Math.min(p + 1, steps.length - 1));
      }
      setIsPlaying(false);
   };

   const currentData = steps[currentStep] || { currentIndex: -1, found: false, message: "Ready to search..." };

   return (
      <main className="min-h-screen pt-24 pb-12 flex flex-col items-center">
         <Navbar />

         <div className="container max-w-7xl flex-1 flex flex-col gap-8 px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
               <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                     <h1 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight">
                        Searching <span className="text-primary italic">Algorithms</span>
                     </h1>
                     <div className="bg-primary/10 border border-primary/30 text-primary px-3 py-1 rounded-full text-[10px] font-black font-mono tracking-widest shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                        {SEARCH_DATA[type].complexity}
                     </div>
                  </div>
                  <p className="text-muted-foreground text-lg font-semibold tracking-wide border-l-4 border-primary/30 pl-4 py-1">
                     {SEARCH_DATA[type].description}
                  </p>
               </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 flex-1">
               <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
                  <div className="glass-card p-8 flex flex-col gap-8 border border-white/5 [.light_&]:border-black/5 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />

                     <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                           <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] px-1 flex items-center gap-2">
                              <Activity size={10} className="text-primary" /> Selection Mode
                           </label>
                           <div className="liquid-selector gap-1 rounded-full">
                              {(["linear", "binary"] as const).map(t => (
                                 <button
                                    key={t}
                                    onClick={() => setType(t)}
                                    className={cn(
                                       "flex-1 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300",
                                       type === t ? "liquid-selector-item-active" : "text-white/40 [.light_&]:text-black/40 hover:text-white [.light_&]:hover:text-black"
                                    )}
                                 >
                                    {t}
                                 </button>
                              ))}
                           </div>
                        </div>

                        <div className="flex flex-col gap-4">
                           <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] px-1 flex items-center gap-2">
                              <Search size={10} className="text-primary" /> Target Element
                           </label>
                           <input
                              type="number"
                              value={target}
                              onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
                              className="w-full bg-white/5 [.light_&]:bg-black/5 border border-white/10 [.light_&]:border-black/10 rounded-[1.5rem] px-4 py-4 font-mono text-2xl font-black focus:outline-none focus:border-primary/50 transition-all text-center text-foreground placeholder-white/20"
                              placeholder="00"
                           />
                        </div>

                        <div className="flex flex-col gap-4">
                           <div className="flex items-center justify-between px-1">
                              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-2">
                                 <Activity size={10} className="text-primary" /> Search Tempo
                              </label>
                              <span className="text-[10px] font-mono text-primary font-black">{speed}%</span>
                           </div>
                           <div className="relative group px-1">
                              <input
                                 type="range" min="1" max="100" value={speed}
                                 onChange={(e) => setSpeed(parseInt(e.target.value))}
                                 className="w-full h-1.5 bg-white/5 [.light_&]:bg-black/10 rounded-lg appearance-none cursor-pointer accent-primary transition-all duration-300 group-hover:h-2"
                              />
                           </div>

                           <div className="grid grid-cols-2 gap-3 mt-4">
                              <PremiumButton className="h-14 px-8 text-base font-black uppercase tracking-widest" variant="gradient" onClick={handlePlayPause}>
                                 {isPlaying ? <><Pause size={16} /> Pause</> : <><Play size={16} fill="currentColor" /> {steps.length > 0 && currentStep < steps.length - 1 ? "Resume" : "Search"}</>}
                              </PremiumButton>
                              <PremiumButton className="h-14 px-8 text-base font-black uppercase tracking-widest" variant="primary" onClick={handleStep} disabled={steps.length > 0 && currentStep >= steps.length - 1}>
                                 <ChevronRight size={16} /> Step
                              </PremiumButton>
                              <PremiumButton className="h-14 px-8 text-xs font-black uppercase tracking-widest col-span-2" variant="secondary" onClick={generateArray}>
                                 <RotateCcw size={14} className="mr-2" /> New Random Dataset
                              </PremiumButton>
                           </div>
                        </div>

                        {/* Search Progress/Status */}
                        <div className="mt-2 p-5 rounded-[2rem] bg-white/5 [.light_&]:bg-black/5 border border-white/5 [.light_&]:border-black/5 space-y-4 backdrop-blur-sm">
                           <h3 className="text-[10px] font-black tracking-[0.3em] text-primary uppercase flex items-center gap-2">
                              <Activity size={10} /> Status
                           </h3>
                           <div className="flex flex-col gap-3">
                              <p className="text-sm font-semibold text-foreground leading-relaxed">
                                 {currentData.message}
                              </p>
                              <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-t border-white/5 pt-3">
                                 <span className="opacity-50 font-mono tracking-tighter capitalize italic">Algorithm Complexity:</span>
                                 <span className="text-primary">{SEARCH_DATA[type].complexity}</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="lg:col-span-8 glass-card min-h-[550px] p-8 order-1 lg:order-2 relative overflow-hidden flex flex-col items-center justify-center bg-black/20 [.light_&]:bg-black/5">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black text-white/[0.03] select-none pointer-events-none uppercase">
                     SEARCH
                  </div>

                  {/* Status Message */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full text-center px-12 z-20">
                     <div
                        key={currentData.message}
                        className="text-xl font-black text-primary uppercase italic tracking-tighter transition-all duration-500"
                     >
                        {currentData.message}
                     </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-4xl relative z-10 px-8">
                     {array.map((val, idx) => {
                        const isCurrent = idx === currentData.currentIndex;
                        const isFound = steps[currentStep]?.found && idx === steps[currentStep]?.foundIndex;
                        const isLow = idx === (steps[currentStep]?.low ?? -1);
                        const isHigh = idx === (steps[currentStep]?.high ?? -1);
                        const isMid = idx === (steps[currentStep]?.mid ?? -1);
                        const isExcluded = type === "binary" && steps[currentStep] && (idx < steps[currentStep].low! || idx > steps[currentStep].high!);

                        return (
                           <div
                              key={idx}
                              className={cn(
                                 "w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-xl font-bold relative",
                                 "transition-all duration-500 ease-out",
                                 isFound ? "bg-emerald-500/20 border-emerald-400 text-emerald-400 [.light_&]:liquid-node-success scale-110 shadow-[0_0_30px_rgba(16,185,129,0.4)]" :
                                    isCurrent ? "bg-primary/20 border-primary text-primary [.light_&]:liquid-node-active scale-110 shadow-[0_0_30px_rgba(99,102,241,0.4)]" :
                                       isMid ? "bg-blue-500/20 border-blue-500 text-blue-400 [.light_&]:liquid-node-secondary" :
                                          isExcluded ? "opacity-20 translate-y-4 grayscale" :
                                             "bg-white/5 border-white/10 text-white/40 [.light_&]:bg-black/5 [.light_&]:border-black/10 [.light_&]:text-black/40"
                              )}
                           >
                              {val}
                              {isCurrent && (
                                 <div className="absolute -top-12 flex flex-col items-center">
                                    <Search size={16} className="text-primary animate-bounce" />
                                 </div>
                              )}
                              {type === "binary" && (
                                 <>
                                    {isLow && <div className="absolute -bottom-6 text-xs font-black text-blue-400 uppercase tracking-widest">LOW</div>}
                                    {isHigh && <div className="absolute -bottom-10 text-xs font-black text-rose-400 uppercase tracking-widest">HIGH</div>}
                                 </>
                              )}
                           </div>
                        );
                     })}
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-8 left-12 flex flex-col gap-3 opacity-30">
                     <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-1">Visual Legend</h3>
                     <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                           <div className="w-3 h-3 rounded bg-primary" />
                           <span className="text-sm font-bold uppercase">Scanning</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="w-3 h-3 rounded bg-emerald-500" />
                           <span className="text-sm font-bold uppercase">Target Found</span>
                        </div>
                        {type === "binary" && (
                           <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded bg-white/5 opacity-50 grayscale translate-y-1" />
                              <span className="text-sm font-bold uppercase">Excluded Range</span>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>

            {/* New Section for Logic and Code */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 h-auto lg:h-[550px] mb-12">
               <div className="h-[500px] lg:h-full">
                  <LogicBreakdown steps={type === 'binary' ? [
                     { title: 'Initialize Bounds', text: 'Set low=0 and high=N-1 to cover the entire sorted array.' },
                     { title: 'Calculate Midpoint', text: 'Find middle index: mid = (low + high) / 2.' },
                     { title: 'Divide Search Space', text: 'If target < array[mid], set high = mid - 1. If target > array[mid], set low = mid + 1.' }
                  ] : [
                     { title: 'Start at Beginning', text: 'Initialize index to 0.' },
                     { title: 'Sequential Check', text: 'Compare array[index] with target.' },
                     { title: 'Advance', text: 'If no match, increment index and repeat until end of array.' }
                  ]} complexity={type === 'binary' ? 'O(log n)' : 'O(n)'} />
               </div>
               <div className="h-[500px] lg:h-full">
                  <CodePanel algorithm={SEARCH_DATA[type].algorithm} currentLine={-1} />
               </div>
            </div>
         </div>
      </main>
   );
}
