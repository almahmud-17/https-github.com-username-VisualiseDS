"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { VisualizerCanvas } from "@/components/VisualizerCanvas";
import { CodePanel } from "@/components/CodePanel";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { AnimationStep, getBubbleSortSteps } from "@/algorithms/bubbleSort";
import { getSelectionSortSteps } from "@/algorithms/selectionSort";
import { getMergeSortSteps } from "@/algorithms/mergeSort";
import { getQuickSortSteps } from "@/algorithms/quickSort";
import { getInsertionSortSteps } from "@/algorithms/insertionSort";
import { Play, StepForward, RotateCcw, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const INITIAL_ARRAY_SIZE = 20;

const generateRandomArray = (size: number) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 5);
};

type AlgoType = "bubble" | "selection" | "insertion" | "merge" | "quick";

const ALGO_DATA: Record<AlgoType, {
    name: string;
    description: string;
    complexity: string;
    code: { python: string[]; cpp: string[] };
    generator: (arr: number[]) => AnimationStep[];
}> = {
    bubble: {
        name: "Bubble Sort",
        description: "Repeatedly swaps adjacent elements if they are in the wrong order.",
        complexity: "O(n²)",
        generator: getBubbleSortSteps,
        code: {
            python: [
                "def bubble_sort(arr):",
                "  n = len(arr)",
                "  for i in range(n):",
                "    for j in range(0, n-i-1):",
                "      if arr[j] > arr[j+1]:",
                "        arr[j], arr[j+1] = arr[j+1], arr[j]"
            ],
            cpp: [
                "void bubbleSort(int arr[], int n) {",
                "  for (int i = 0; i < n; i++)",
                "    for (int j = 0; j < n-i-1; j++)",
                "      if (arr[j] > arr[j+1])",
                "        swap(arr[j], arr[j+1]);",
                "}"
            ]
        }
    },
    selection: {
        name: "Selection Sort",
        description: "Repeatedly finds the minimum element and moves it to the beginning.",
        complexity: "O(n²)",
        generator: getSelectionSortSteps,
        code: {
            python: [
                "def selection_sort(arr):",
                "  for i in range(len(arr)):",
                "    min_idx = i",
                "    for j in range(i+1, len(arr)):",
                "      if arr[j] < arr[min_idx]:",
                "        min_idx = j",
                "    arr[i], arr[min_idx] = arr[min_idx], arr[i]"
            ],
            cpp: [
                "void selectionSort(int arr[], int n) {",
                "  for (int i = 0; i < n-1; i++) {",
                "    int idx = i;",
                "    for (int j = i+1; j < n; j++)",
                "      if (arr[j] < arr[idx]) idx = j;",
                "    swap(arr[i], arr[idx]);",
                "  }",
                "}"
            ]
        }
    },
    insertion: {
        name: "Insertion Sort",
        description: "Builds the sorted array one item at a time by repeatedly picking the next element and inserting it into its correct position.",
        complexity: "O(n²)",
        generator: getInsertionSortSteps,
        code: {
            python: [
                "def insertion_sort(arr):",
                "  for i in range(1, len(arr)):",
                "    key = arr[i]",
                "    j = i-1",
                "    while j >= 0 and key < arr[j]:",
                "      arr[j+1] = arr[j]",
                "      j -= 1",
                "    arr[j+1] = key"
            ],
            cpp: [
                "void insertionSort(int arr[], int n) {",
                "  for (int i = 1; i < n; i++) {",
                "    int key = arr[i];",
                "    int j = i-1;",
                "    while (j >= 0 && arr[j] > key) {",
                "      arr[j+1] = arr[j];",
                "      j = j-1;",
                "    }",
                "    arr[j+1] = key;",
                "  }",
                "}"
            ]
        }
    },
    merge: {
        name: "Merge Sort",
        description: "Divides the array into halves, sorts them, and merges them back.",
        complexity: "O(n log n)",
        generator: getMergeSortSteps,
        code: {
            python: [
                "def merge_sort(arr):",
                "  if len(arr) > 1:",
                "    mid = len(arr)//2",
                "    L, R = arr[:mid], arr[mid:]",
                "    merge_sort(L); merge_sort(R)",
                "    i = j = k = 0",
                "    while i<len(L) and j<len(R):",
                "      if L[i] < R[j]: arr[k]=L[i]; i+=1",
                "      else: arr[k]=R[j]; j+=1",
                "      k+=1"
            ],
            cpp: [
                "void merge(int arr[], int l, int m, int r) {",
                "  // Merge implementation...",
                "}",
                "void mergeSort(int arr[], int l, int r) {",
                "  if (l < r) {",
                "    int m = l+(r-l)/2;",
                "    mergeSort(arr, l, m);",
                "    mergeSort(arr, m+1, r);",
                "    merge(arr, l, m, r);",
                "  }",
                "}"
            ]
        }
    },
    quick: {
        name: "Quick Sort",
        description: "Picks a pivot and partitions the array around it.",
        complexity: "O(n log n)",
        generator: getQuickSortSteps,
        code: {
            python: [
                "def partition(arr, low, high):",
                "  pivot = arr[high]; i = low-1",
                "  for j in range(low, high):",
                "    if arr[j] < pivot:",
                "      i += 1; arr[i], arr[j] = arr[j], arr[i]",
                "  arr[i+1], arr[high] = arr[high], arr[i+1]",
                "  return i+1"
            ],
            cpp: [
                "int partition(int arr[], int low, int high) {",
                "  int pivot = arr[high]; int i = low-1;",
                "  for (int j = low; j < high; j++)",
                "    if (arr[j] < pivot) swap(arr[++i], arr[j]);",
                "  swap(arr[i+1], arr[high]);",
                "  return i+1;",
                "}"
            ]
        }
    }
};

export default function SortingPage() {
    const [algo, setAlgo] = useState<AlgoType>("bubble");
    const [array, setArray] = useState<number[]>([]);
    const [steps, setSteps] = useState<AnimationStep[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(50);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        handleReset();
    }, [algo]);

    useEffect(() => {
        if (isPlaying && currentStep < steps.length - 1) {
            const delay = (101 - speed) * 5;
            timerRef.current = setTimeout(() => {
                setCurrentStep((prev) => prev + 1);
            }, delay);
        } else if (currentStep >= steps.length - 1) {
            setIsPlaying(false);
        }
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [isPlaying, currentStep, steps.length, speed]);

    const handleReset = () => {
        const newArray = generateRandomArray(INITIAL_ARRAY_SIZE);
        setArray(newArray);
        const newSteps = ALGO_DATA[algo].generator(newArray);
        setSteps(newSteps);
        setCurrentStep(0);
        setIsPlaying(false);
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
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground">
                            {ALGO_DATA[algo].name}
                        </h1>
                        <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold font-mono">
                            {ALGO_DATA[algo].complexity}
                        </div>
                    </div>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        {ALGO_DATA[algo].description}
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-6 flex-1">
                    <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
                        <div className="glass-card p-6 flex flex-col gap-6 border border-white/5">
                            <div className="flex flex-col gap-4">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Select Algorithm</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {(Object.keys(ALGO_DATA) as AlgoType[]).map((key) => (
                                        <PremiumButton
                                            key={key}
                                            onClick={() => setAlgo(key)}
                                            variant={algo === key ? "primary" : "ghost"}
                                            className="text-xs h-10"
                                        >
                                            {ALGO_DATA[key].name}
                                        </PremiumButton>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Speed</span>
                                    <span className="text-[10px] font-mono text-primary">{speed}%</span>
                                </div>
                                <input
                                    type="range" min="1" max="100" value={speed}
                                    onChange={(e) => setSpeed(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="grid grid-cols-2 gap-3 mt-2">
                                    <PremiumButton variant="gradient" onClick={() => setIsPlaying(!isPlaying)}>
                                        {isPlaying ? "Pause" : <><Play size={16} fill="currentColor" /> Play</>}
                                    </PremiumButton>
                                    <PremiumButton variant="secondary" onClick={() => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))}>
                                        <StepForward size={16} /> Step
                                    </PremiumButton>
                                    <PremiumButton variant="danger" className="col-span-2" onClick={handleReset}>
                                        <RotateCcw size={16} /> Randomize
                                    </PremiumButton>
                                </div>
                            </div>
                        </div>

                        <div className="h-[400px]">
                            <CodePanel code={ALGO_DATA[algo].code} currentLine={-1} />
                        </div>
                    </div>

                    <div className="lg:col-span-8 glass-card flex flex-col min-h-[550px] relative order-1 lg:order-2 overflow-hidden p-8">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black text-white/[0.02] select-none pointer-events-none uppercase">
                            SORT
                        </div>
                        <VisualizerCanvas
                            array={currentAnimation.array}
                            comparingIndices={currentAnimation.comparingIndices}
                            swappingIndices={currentAnimation.swappingIndices}
                            sortedIndices={currentAnimation.sortedIndices}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
