"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { ControlPanel } from "@/components/ControlPanel";
import { VisualizerCanvas } from "@/components/VisualizerCanvas";
import { CodePanel } from "@/components/CodePanel";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { getBubbleSortSteps, AnimationStep } from "@/algorithms/bubbleSort";
import { Play, StepForward, RotateCcw } from "lucide-react";

const INITIAL_ARRAY_SIZE = 15;

const generateRandomArray = (size: number) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 5);
};

const SORT_CODE = {
    python: [
        "def bubble_sort(arr):",
        "  n = len(arr)",
        "  for i in range(n):",
        "    for j in range(0, n-i-1):",
        "      if arr[j] > arr[j+1]:",
        "        arr[j], arr[j+1] = arr[j+1], arr[j]",
        "  return arr"
    ],
    cpp: [
        "void bubbleSort(int arr[], int n) {",
        "  for (int i = 0; i < n; i++) {",
        "    for (int j = 0; j < n - i - 1; j++) {",
        "      if (arr[j] > arr[j + 1]) {",
        "        swap(arr[j], arr[j + 1]);",
        "      }",
        "    }",
        "  }",
        "}"
    ]
};

export default function BubbleSortPage() {
    const [array, setArray] = useState<number[]>([]);
    const [steps, setSteps] = useState<AnimationStep[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(50);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        handleReset();
    }, []);

    useEffect(() => {
        if (isPlaying && currentStep < steps.length - 1) {
            const delay = (101 - speed) * 5;
            timerRef.current = setTimeout(() => {
                setCurrentLineHighlight();
                setCurrentStep((prev) => prev + 1);
            }, delay);
        } else if (currentStep >= steps.length - 1) {
            setIsPlaying(false);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isPlaying, currentStep, steps.length, speed]);

    const handleReset = () => {
        const newArray = generateRandomArray(INITIAL_ARRAY_SIZE);
        setArray(newArray);
        const newSteps = getBubbleSortSteps(newArray);
        setSteps(newSteps);
        setCurrentStep(0);
        setIsPlaying(false);
    };

    const handleStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const setCurrentLineHighlight = () => {
        // Logic to map animation step to code line if needed
        // For now keeping it simple as sorting doesn't use currentLine as strictly as DS
    };

    const currentAnimation = steps[currentStep] || {
        array: array,
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [],
    };

    return (
        <main className="min-h-screen pt-24 pb-12 flex flex-col items-center">
            <Navbar />

            <div className="container max-w-7xl flex-1 flex flex-col gap-8 px-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">
                        Bubble Sort Visualizer
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Visualize the sorting process with real-time state changes and multi-language code support.
                    </p>
                </div>

                <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
                        <div className="glass-card p-6 flex flex-col gap-6 border border-white/5">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Controls</span>
                                    <span className="text-xs font-mono text-primary px-2 py-0.5 bg-primary/10 rounded">SPEED: {speed}%</span>
                                </div>

                                <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    value={speed}
                                    onChange={(e) => setSpeed(parseInt(e.target.value))}
                                    className="w-full accent-primary bg-white/5 h-1.5 rounded-full appearance-none cursor-pointer"
                                />

                                <div className="grid grid-cols-2 gap-3">
                                    <PremiumButton onClick={() => setIsPlaying(!isPlaying)} className="flex-1">
                                        {isPlaying ? "Pause" : <><Play size={16} fill="currentColor" /> Play</>}
                                    </PremiumButton>
                                    <PremiumButton onClick={handleStep} variant="secondary">
                                        <StepForward size={16} /> Step
                                    </PremiumButton>
                                    <PremiumButton onClick={handleReset} variant="danger" className="col-span-2">
                                        <RotateCcw size={16} /> Randomize
                                    </PremiumButton>
                                </div>
                            </div>
                        </div>

                        <div className="h-[400px]">
                            <CodePanel code={SORT_CODE} currentLine={-1} />
                        </div>
                    </div>

                    <div className="lg:col-span-8 glass-card min-h-[550px] overflow-hidden flex flex-col relative order-1 lg:order-2 p-8">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black text-white/[0.02] select-none pointer-events-none uppercase">
                            SORT
                        </div>

                        <VisualizerCanvas
                            array={currentAnimation.array}
                            comparingIndices={currentAnimation.comparingIndices}
                            swappingIndices={currentAnimation.swappingIndices}
                            sortedIndices={currentAnimation.sortedIndices}
                        />

                        <div className="mt-auto flex justify-center gap-8 py-4 border-t border-white/5 bg-white/[0.02] rounded-xl">
                            {[
                                { label: "O(n²)", desc: "Worst Case" },
                                { label: "O(n)", desc: "Best Case" },
                                { label: "O(1)", desc: "Space" }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <span className="text-xl font-bold text-foreground">{stat.label}</span>
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{stat.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
