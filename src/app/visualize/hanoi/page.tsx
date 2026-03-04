"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { getHanoiSteps, HanoiStep } from "@/algorithms/hanoi";
import {
    Play,
    RotateCcw,
    ChevronRight,
    ArrowRight,
    Info,
    Cpu,
    Activity,
    Settings,
    Layers,
    FileCode,
    Terminal,
    Code
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

            <div className="container max-w-7xl flex-1 flex flex-col gap-8 px-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl font-black tracking-tight text-foreground">
                            Tower of Hanoi
                        </h1>
                        <div className="bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full text-xs font-bold font-mono">
                            O(2ⁿ - 1)
                        </div>
                    </div>
                    <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                        A classic mathematical puzzle where you move all disks from Peg A to Peg C,
                        never placing a larger disk on top of a smaller one.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 flex-1">
                    {/* Controls Panel */}
                    <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
                        <div className="glass-card p-8 flex flex-col gap-8 border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-3xl rounded-full" />

                            <div className="flex flex-col gap-5">
                                <div className="flex items-center justify-between px-1">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Layers size={12} className="text-pink-400" /> Disk Count
                                    </label>
                                    <span className="text-lg font-black text-pink-400 font-mono">{numDisks}</span>
                                </div>
                                <div className="flex gap-2">
                                    {[3, 4, 5, 6].map((n) => (
                                        <PremiumButton
                                            key={n}
                                            variant={numDisks === n ? "primary" : "ghost"}
                                            onClick={() => setNumDisks(n)}
                                            className="flex-1 h-12 text-sm font-bold"
                                        >
                                            {n}
                                        </PremiumButton>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-5">
                                <div className="flex items-center justify-between px-1">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Settings size={12} className="text-pink-400" /> Animation Speed
                                    </label>
                                    <span className="text-[10px] font-mono text-pink-400 font-bold">{speed}%</span>
                                </div>
                                <input
                                    type="range" min="1" max="100" value={speed}
                                    onChange={(e) => setSpeed(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-pink-500"
                                />
                                <div className="grid grid-cols-1 gap-3 mt-2">
                                    <PremiumButton
                                        variant="gradient"
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className="h-14 text-base font-black uppercase tracking-widest shadow-xl shadow-pink-500/20"
                                    >
                                        {isPlaying ? "Pause Engine" : <><Play size={20} fill="currentColor" /> Solve Puzzle</>}
                                    </PremiumButton>
                                    <PremiumButton variant="secondary" className="h-14 font-black text-sm uppercase tracking-widest" onClick={handleReset}>
                                        <RotateCcw size={18} /> Reset State
                                    </PremiumButton>
                                </div>
                            </div>

                            {/* Move Logic Panel */}
                            <div className="mt-4 p-5 rounded-2xl bg-black/40 border border-white/5 space-y-4">
                                <h3 className="text-[10px] font-black tracking-[0.2em] text-pink-400/80 uppercase">Last Operation</h3>
                                {currentData.move ? (
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm font-bold text-foreground">
                                            {currentData.move.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                                            <span className="px-2 py-0.5 bg-white/5 rounded-md border border-white/5">Step {currentStep} of {steps.length - 1}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm font-medium text-muted-foreground italic">Ready to solve...</p>
                                )}
                            </div>
                        </div>

                        {/* Complexity Insight */}
                        <div className="glass-card p-6 border border-white/5 bg-gradient-to-br from-pink-500/5 to-transparent">
                            <h3 className="text-xs font-black uppercase tracking-widest text-pink-400 mb-2 flex items-center gap-2">
                                <Activity size={14} /> Recursive Pattern
                            </h3>
                            <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                                The number of moves required is 2ⁿ - 1. For {numDisks} disks, it takes {Math.pow(2, numDisks) - 1} moves to complete the sequence.
                            </p>
                        </div>
                    </div>

                    {/* Visualization Area */}
                    <div className="lg:col-span-8 glass-card border border-white/5 flex flex-col min-h-[600px] relative order-1 lg:order-2 overflow-hidden bg-black/20">
                        {/* Background Decor */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black text-white/[0.01] select-none pointer-events-none uppercase">
                            HANOI
                        </div>

                        <div className="flex-1 flex items-end justify-around pb-20 px-12 relative z-10">
                            {currentData.pegs.map((peg, pegIdx) => (
                                <div key={pegIdx} className="relative flex flex-col items-center w-full max-w-[180px]">
                                    {/* The Peg/Pole */}
                                    <div className="absolute bottom-0 w-3 h-72 bg-gradient-to-t from-pink-500/20 to-pink-500/5 border-x border-white/10 rounded-t-full -z-10" />
                                    <div className="absolute bottom-0 w-32 h-2 bg-white/10 rounded-full -z-10 translate-y-2 blur-[2px]" />

                                    {/* Peg Label */}
                                    <div className="absolute -bottom-12 font-black text-2xl text-white/10 font-mono tracking-widest capitalize">
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
                                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                                        style={{ width: `${width}px` }}
                                                        className={cn(
                                                            "h-8 rounded-xl shadow-lg border border-white/10 flex items-center justify-center relative group",
                                                            diskId === currentData.move?.diskId ? "brightness-125 z-20" : "z-10"
                                                        )}
                                                    >
                                                        {/* Glossy Overlay */}
                                                        <div className="absolute inset-x-2 top-1 h-3 bg-white/20 blur-[1px] rounded-full pointer-events-none" />

                                                        <div className={cn(
                                                            "absolute inset-0 rounded-xl transition-colors duration-300",
                                                            diskId === 1 ? "bg-gradient-to-r from-pink-500 to-rose-500" :
                                                                diskId === 2 ? "bg-gradient-to-r from-purple-500 to-indigo-500" :
                                                                    diskId === 3 ? "bg-gradient-to-r from-blue-500 to-cyan-500" :
                                                                        diskId === 4 ? "bg-gradient-to-r from-emerald-500 to-teal-500" :
                                                                            diskId === 5 ? "bg-gradient-to-r from-amber-500 to-orange-500" :
                                                                                "bg-gradient-to-r from-red-500 to-pink-500"
                                                        )} />

                                                        <span className="relative z-10 text-[10px] font-black text-white/80 font-mono">{diskId}</span>
                                                    </motion.div>
                                                );
                                            })}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Legend */}
                        <div className="absolute bottom-6 left-6 flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-pink-500" />
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Move</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-white/10" />
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Smallest Disk: 1</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Implementation Section */}
                <div className="grid lg:grid-cols-12 gap-8 mt-12 mb-12">
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 shadow-lg shadow-pink-500/5">
                                    <FileCode size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black tracking-tight text-foreground">Algorithm Source</h2>
                                    <p className="text-muted-foreground text-sm font-medium">Recursive implementation as seen in reference snippet</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative group overflow-hidden rounded-3xl border border-white/5 shadow-2xl bg-black/40 p-1">
                            {/* The actual photo provided by the user */}
                            <img
                                src="/toh.png"
                                alt="Tower of Hanoi Implementation"
                                className="w-full h-auto rounded-2xl"
                            />

                            {/* Decorative shadow gloss to make it fit the premium theme */}
                            <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="glass-card p-8 border border-white/5 bg-gradient-to-br from-pink-500/5 to-transparent h-full relative overflow-hidden">
                            {/* Decoration */}
                            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-pink-500/10 blur-[50px] rounded-full" />

                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-pink-400 mb-6 flex items-center gap-2">
                                <Terminal size={14} /> Logic Breakdown
                            </h3>

                            <div className="space-y-6 relative z-10">
                                <div className="flex gap-4 group">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-pink-500/10 text-pink-400 text-sm font-black flex items-center justify-center border border-pink-500/10 transition-transform group-hover:scale-110">1</div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-black text-foreground">Move n-1 Disks</p>
                                        <p className="text-xs text-muted-foreground leading-relaxed font-medium">Move the stack above the largest disk from start to auxiliary peg using the destination as temporary storage.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 group">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-pink-500/10 text-pink-400 text-sm font-black flex items-center justify-center border border-pink-500/10 transition-transform group-hover:scale-110">2</div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-black text-foreground">The Base Move</p>
                                        <p className="text-xs text-muted-foreground leading-relaxed font-medium">Transfer the largest remaining disk directly from the starting peg to its final destination.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 group">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-pink-500/10 text-pink-400 text-sm font-black flex items-center justify-center border border-pink-500/10 transition-transform group-hover:scale-110">3</div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-black text-foreground">Completion</p>
                                        <p className="text-xs text-muted-foreground leading-relaxed font-medium">Finally, move the n-1 disks from the auxiliary peg back onto the destination peg atop the largest disk.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/5">
                                <div className="flex items-center gap-3 text-pink-400/60 transition-colors hover:text-pink-400 cursor-help">
                                    <Info size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-inherit">Time Complexity: O(2ⁿ)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
