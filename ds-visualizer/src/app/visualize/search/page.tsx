"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { CodePanel } from "@/components/CodePanel";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { getLinearSearchSteps, getBinarySearchSteps, SearchStep } from "@/algorithms/search";
import { Play, RotateCcw, Search, ChevronRight, Activity, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type SearchType = "linear" | "binary";

const SEARCH_DATA: Record<SearchType, {
    name: string,
    description: string,
    complexity: string,
    code: { python: string[], cpp: string[] }
}> = {
    linear: {
        name: "Linear Search",
        description: "Checks every element one by one until the target is found.",
        complexity: "O(n)",
        code: {
            python: [
                "def linear_search(arr, target):",
                "  for i in range(len(arr)):",
                "    if arr[i] == target:",
                "      return i",
                "  return -1"
            ],
            cpp: [
                "int linearSearch(int arr[], int n, int target) {",
                "  for (int i = 0; i < n; i++)",
                "    if (arr[i] == target) return i;",
                "  return -1;",
                "}"
            ]
        }
    },
    binary: {
        name: "Binary Search",
        description: "Divide and conquer on a sorted array. Repeatedly halves the search space.",
        complexity: "O(log n)",
        code: {
            python: [
                "def binary_search(arr, target):",
                "  low, high = 0, len(arr)-1",
                "  while low <= high:",
                "    mid = (low + high) // 2",
                "    if arr[mid] == target: return mid",
                "    elif arr[mid] < target: low = mid + 1",
                "    else: high = mid - 1",
                "  return -1"
            ],
            cpp: [
                "int binarySearch(int arr[], int n, int target) {",
                "  int low = 0, high = n-1;",
                "  while (low <= high) {",
                "    int mid = low + (high-low)/2;",
                "    if (arr[mid] == target) return mid;",
                "    if (arr[mid] < target) low = mid + 1;",
                "    else high = mid - 1;",
                "  }",
                "  return -1;",
                "}"
            ]
        }
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

    const currentData = steps[currentStep] || { currentIndex: -1, found: false, message: "Ready to search..." };

    return (
        <main className="min-h-screen pt-24 pb-12 flex flex-col items-center">
            <Navbar />

            <div className="container max-w-7xl flex-1 flex flex-col gap-8 px-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl font-black tracking-tight text-foreground uppercase">
                            Searching <span className="text-primary">Algorithms</span>
                        </h1>
                        <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold font-mono">
                            {SEARCH_DATA[type].complexity}
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 flex-1">
                    <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
                        <div className="glass-card p-8 flex flex-col gap-8 border border-white/5">
                            <div className="flex flex-col gap-4">
                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Select Type</label>
                                <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-2xl">
                                    {(["linear", "binary"] as const).map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setType(t)}
                                            className={cn(
                                                "py-2 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                                type === t ? "bg-primary text-white shadow-xl" : "text-white/40 hover:text-white"
                                            )}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Target Value</label>
                                <input
                                    type="number"
                                    value={target}
                                    onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary transition-all text-center"
                                />
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between px-1">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Speed</label>
                                    <span className="text-[10px] font-mono text-primary font-bold">{speed}%</span>
                                </div>
                                <input
                                    type="range" min="1" max="100" value={speed}
                                    onChange={(e) => setSpeed(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="grid grid-cols-1 gap-3 mt-4">
                                    <PremiumButton variant="gradient" onClick={handleSearch} className="h-14 text-base font-black uppercase tracking-widest shadow-xl">
                                        <Play size={20} fill="currentColor" className="mr-2" /> Start Search
                                    </PremiumButton>
                                    <PremiumButton variant="secondary" onClick={generateArray} className="h-14 font-black text-sm uppercase tracking-widest">
                                        <RotateCcw size={18} className="mr-2" /> New Random Array
                                    </PremiumButton>
                                </div>
                            </div>
                        </div>

                        <div className="h-[400px]">
                            <CodePanel code={SEARCH_DATA[type].code} currentLine={-1} />
                        </div>
                    </div>

                    <div className="lg:col-span-8 glass-card min-h-[550px] p-8 order-1 lg:order-2 relative overflow-hidden flex flex-col items-center justify-center bg-black/20">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black text-white/[0.01] select-none pointer-events-none uppercase">
                            SEARCH
                        </div>

                        {/* Status Message */}
                        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full text-center px-12 z-20">
                            <motion.div
                                key={currentData.message}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xl font-black text-primary uppercase italic tracking-tighter"
                            >
                                {currentData.message}
                            </motion.div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-4xl relative z-10 px-8">
                            <AnimatePresence mode="popLayout">
                                {array.map((val, idx) => {
                                    const isCurrent = idx === currentData.currentIndex;
                                    const isFound = steps[currentStep]?.found && idx === steps[currentStep]?.foundIndex;
                                    const isLow = idx === (steps[currentStep]?.low ?? -1);
                                    const isHigh = idx === (steps[currentStep]?.high ?? -1);
                                    const isMid = idx === (steps[currentStep]?.mid ?? -1);

                                    return (
                                        <motion.div
                                            key={`${idx}-${val}`}
                                            layout
                                            className={cn(
                                                "w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-xl font-bold transition-all duration-300 relative",
                                                isFound ? "bg-emerald-500 border-emerald-400 text-white scale-110 shadow-[0_0_30px_rgba(16,185,129,0.4)]" :
                                                    isCurrent ? "bg-primary border-primary text-white scale-110 shadow-[0_0_30px_rgba(99,102,241,0.4)]" :
                                                        isMid ? "bg-blue-500/20 border-blue-500 text-blue-400" :
                                                            (type === "binary" && steps[currentStep] && (idx < steps[currentStep].low! || idx > steps[currentStep].high!))
                                                                ? "opacity-20 translate-y-4 grayscale" :
                                                                "bg-white/5 border-white/10 text-white/40"
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
                                                    {isLow && <div className="absolute -bottom-6 text-[8px] font-black text-blue-400 uppercase tracking-widest">LOW</div>}
                                                    {isHigh && <div className="absolute -bottom-10 text-[8px] font-black text-rose-400 uppercase tracking-widest">HIGH</div>}
                                                </>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>

                        {/* Legend */}
                        <div className="absolute bottom-8 left-12 flex flex-col gap-3 opacity-30">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-1">Visual Legend</h3>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded bg-primary" />
                                    <span className="text-[9px] font-bold uppercase">Scanning</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded bg-emerald-500" />
                                    <span className="text-[9px] font-bold uppercase">Target Found</span>
                                </div>
                                {type === "binary" && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded bg-white/5 opacity-50 grayscale translate-y-1" />
                                        <span className="text-[9px] font-bold uppercase">Excluded Range</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
