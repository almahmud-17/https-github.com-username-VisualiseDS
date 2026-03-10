"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface VisualizerCanvasProps {
    array: number[];
    comparingIndices: number[];
    swappingIndices: number[];
    sortedIndices: number[];
}

export function VisualizerCanvas({
    array,
    comparingIndices,
    swappingIndices,
    sortedIndices,
}: VisualizerCanvasProps) {
    const maxVal = Math.max(...array, 1);

    return (
        <div className="w-full h-full min-h-[400px] flex items-end justify-center gap-2 p-8 relative overflow-hidden bg-white/[0.03] [.light_&]:bg-black/[0.02] rounded-3xl">
            <div className="absolute inset-0 opacity-[0.05] [.light_&]:opacity-[0.02] text-white [.light_&]:text-black pointer-events-none bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-[size:32px_32px]" />

            <AnimatePresence mode="popLayout">
                {array.map((val, idx) => {
                    const isComparing = comparingIndices.includes(idx);
                    const isSwapping = swappingIndices.includes(idx);
                    const isSorted = sortedIndices.includes(idx);

                    let color = "bg-indigo-500/40 [.light_&]:bg-[#007AFF]/60 text-white border-white/10 shadow-lg";
                    if (isComparing) color = "bg-amber-400 text-black border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.5)] scale-110 z-10";
                    if (isSwapping) color = "bg-red-500 text-white border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.5)] z-10 scale-105";
                    if (isSorted) color = "bg-emerald-500 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]";

                    return (
                        <motion.div
                            key={`${idx}-${val}`}
                            layout
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                                height: `${(val / maxVal) * 80}%`,
                                opacity: 1,
                                transition: { type: "spring", stiffness: 300, damping: 30 }
                            }}
                            exit={{ height: 0, opacity: 0 }}
                            className={cn(
                                "flex-1 max-w-[40px] rounded-t-lg flex flex-col items-center justify-end pb-2 font-mono text-[10px] font-bold border-x border-t transition-colors",
                                color
                            )}
                        >
                            <span className="mb-2 opacity-50">{val}</span>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
