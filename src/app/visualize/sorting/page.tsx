"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { VisualizerCanvas } from "@/components/VisualizerCanvas";
import { CodePanel } from "@/components/CodePanel";
import { LogicBreakdown } from "@/components/LogicBreakdown";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { AnimationStep, getBubbleSortSteps } from "@/algorithms/bubbleSort";
import { getSelectionSortSteps } from "@/algorithms/selectionSort";
import { getMergeSortSteps } from "@/algorithms/mergeSort";
import { getQuickSortSteps } from "@/algorithms/quickSort";
import { getInsertionSortSteps } from "@/algorithms/insertionSort";
import { Play, Pause, StepForward, RotateCcw, ChevronDown } from "lucide-react";
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
   algorithm: string[];
   generator: (arr: number[]) => AnimationStep[];
}> = {
   bubble: {
      name: "Bubble Sort",
      description: "Repeatedly swaps adjacent elements if they are in the wrong order.",
      complexity: "O(n²)",
      generator: getBubbleSortSteps,
      algorithm: [
         "Function bubble_sort(arr):",
         " n = length of arr",
         " For i from 0 to n-1:",
         " For j from 0 to n-i-2:",
         "  If arr[j] > arr[j+1]:",
         "  Swap arr[j] and arr[j+1]"
      ]
   },
   selection: {
      name: "Selection Sort",
      description: "Repeatedly finds the minimum element and moves it to the beginning.",
      complexity: "O(n²)",
      generator: getSelectionSortSteps,
      algorithm: [
         "Function selection_sort(arr):",
         " n = length of arr",
         " For i from 0 to n-1:",
         " min_idx = i",
         " For j from i+1 to n-1:",
         "  If arr[j] < arr[min_idx]:",
         "  min_idx = j",
         " Swap arr[i] with arr[min_idx]"
      ]
   },
   insertion: {
      name: "Insertion Sort",
      description: "Builds the sorted array one item at a time.",
      complexity: "O(n²)",
      generator: getInsertionSortSteps,
      algorithm: [
         "Function insertion_sort(arr):",
         " n = length of arr",
         " For i from 1 to n-1:",
         " key = arr[i]",
         " j = i - 1",
         " While j >= 0 and arr[j] > key:",
         "  arr[j+1] = arr[j]",
         "  j = j - 1",
         " arr[j+1] = key"
      ]
   },
   merge: {
      name: "Merge Sort",
      description: "Divides the array into halves, sorts them, and merges them back.",
      complexity: "O(n log n)",
      generator: getMergeSortSteps,
      algorithm: [
         "Function merge_sort(arr):",
         " If length of arr <= 1:",
         " Return arr",
         " mid = length of arr // 2",
         " left = merge_sort(arr from 0 to mid-1)",
         " right = merge_sort(arr from mid to end)",
         " Return merge(left, right)"
      ]
   },
   quick: {
      name: "Quick Sort",
      description: "Picks a pivot and partitions the array around it.",
      complexity: "O(n log n)",
      generator: getQuickSortSteps,
      algorithm: [
         "Function quick_sort(arr, low, high):",
         " If low < high:",
         " pivot_idx = partition(arr, low, high)",
         " quick_sort(arr, low, pivot_idx - 1)",
         " quick_sort(arr, pivot_idx + 1, high)",
         " ",
         "Function partition(arr, low, high):",
         " pivot = arr[high]",
         " i = low - 1",
         " For j from low to high - 1:",
         " If arr[j] < pivot:",
         "  i = i + 1",
         "  Swap arr[i] and arr[j]",
         " Swap arr[i+1] and arr[high]",
         " Return i + 1"
      ]
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
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
               <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                     <h1 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight">
                        {ALGO_DATA[algo].name.split(' ')[0]} <span className="text-primary italic">{ALGO_DATA[algo].name.split(' ')[1]}</span>
                     </h1>
                     <div className="bg-primary/10 border border-primary/30 text-primary px-3 py-1 rounded-full text-[10px] font-black font-mono tracking-widest shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                        {ALGO_DATA[algo].complexity}
                     </div>
                  </div>
                  <p className="text-muted-foreground text-lg font-semibold tracking-wide border-l-4 border-primary/30 pl-4 py-1">
                     {ALGO_DATA[algo].description}
                  </p>
               </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 flex-1">
               <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
                  <div className="glass-card p-6 flex flex-col gap-6 border border-white/5">
                     <div className="flex flex-col gap-4">
                        <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest px-1">Select Algorithm</label>
                        <div className="grid grid-cols-2 gap-2">
                           {(Object.keys(ALGO_DATA) as AlgoType[]).map((key) => (
                              <PremiumButton className="h-12 px-4 text-[10px] font-black uppercase tracking-widest rounded-full"
                                 key={key}
                                 onClick={() => setAlgo(key)}
                                 variant={algo === key ? "primary" : "ghost"}
                              >
                                 {ALGO_DATA[key].name}
                              </PremiumButton>
                           ))}
                        </div>
                     </div>

                     <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                           <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] px-1">Simulation Speed</span>
                           <span className="text-[10px] font-mono text-primary font-black">{speed}%</span>
                        </div>
                        <div className="relative group px-1">
                           <input
                              type="range" min="1" max="100" value={speed}
                              onChange={(e) => setSpeed(parseInt(e.target.value))}
                              className="w-full h-1.5 bg-white/5 [.light_&]:bg-black/10 rounded-lg appearance-none cursor-pointer accent-primary transition-all duration-300 group-hover:h-2"
                           />
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                           <PremiumButton className="h-14 px-8 text-base font-black rounded-full" variant="gradient" onClick={() => setIsPlaying(!isPlaying)}>
                              {isPlaying ? <><Pause size={16} /> Pause</> : <div className="flex items-center gap-2"><Play size={16} fill="currentColor" /> Play</div>}
                           </PremiumButton>
                           <PremiumButton className="h-14 px-8 text-base font-black rounded-full" variant="secondary" onClick={() => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))}>
                              <StepForward size={16} /> Step
                           </PremiumButton>
                           <PremiumButton className="h-14 px-8 text-[10px] font-black uppercase tracking-widest col-span-2 rounded-full" variant="danger" onClick={handleReset}>
                              <RotateCcw size={14} className="mr-2" /> Randomize Dataset
                           </PremiumButton>
                        </div>
                     </div>
                  </div>


               </div>

               <div className="lg:col-span-8 glass-card flex flex-col min-h-[550px] relative order-1 lg:order-2 overflow-hidden p-8">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black text-white/[0.03] [.light_&]:text-black/[0.03] select-none pointer-events-none uppercase">
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

            {/* New Section for Logic and Code */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 h-auto lg:h-[550px] mb-12">
               <div className="h-[500px] lg:h-full">
                  <LogicBreakdown steps={ALGO_DATA[algo].name === 'Bubble Sort' ? [
                     { title: 'Compare Adjacent', text: 'Iterate through the array and compare each pair of adjacent elements.' },
                     { title: 'Swap if Needed', text: 'If the left element is larger than the right, swap them.' },
                     { title: 'Repeat', text: 'Continue passes until no swaps are needed.' }
                  ] : ALGO_DATA[algo].name === 'Selection Sort' ? [
                     { title: 'Find Minimum', text: 'Scan the unsorted portion of the array to find the smallest element.' },
                     { title: 'Swap with Front', text: 'Swap the smallest element with the first element of the unsorted portion.' },
                     { title: 'Advance Boundary', text: 'Move the sorted boundary one element to the right.' }
                  ] : ALGO_DATA[algo].name === 'Merge Sort' ? [
                     { title: 'Divide', text: 'Recursively split the array into two halves until single elements remain.' },
                     { title: 'Conquer', text: 'Sort the individual small arrays.' },
                     { title: 'Merge', text: 'Combine the sorted halves back together in linear time.' }
                  ] : ALGO_DATA[algo].name === 'Insertion Sort' ? [
                     { title: 'Pick Element', text: 'Take the first element from the unsorted portion.' },
                     { title: 'Find Position', text: 'Scan backwards through the sorted portion to find its correct spot.' },
                     { title: 'Insert', text: 'Shift larger elements to the right and insert the picked element.' }
                  ] : [
                     { title: 'Choose Pivot', text: 'Select an element to be the pivot.' },
                     { title: 'Partition', text: 'Rearrange elements so items smaller than the pivot are left.' },
                     { title: 'Recursion', text: 'Recursively apply pivot and partition to left and right sub-arrays.' }
                  ]} complexity={ALGO_DATA[algo].complexity} />
               </div>
               <div className="h-[500px] lg:h-full">
                  <CodePanel algorithm={ALGO_DATA[algo].algorithm} currentLine={-1} />
               </div>
            </div>
         </div>
      </main>
   );
}
