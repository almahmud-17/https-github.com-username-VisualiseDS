import React from 'react';
import { Terminal, Info } from "lucide-react";

export interface LogicStep {
    title: string;
    text: string;
}

export interface LogicBreakdownProps {
    steps: LogicStep[];
    complexity: string;
}

export function LogicBreakdown({ steps, complexity }: LogicBreakdownProps) {
    return (
        <div className="glass-card flex flex-col h-full overflow-hidden border border-[#ec4899]/30 [.light_&]:border-[#007AFF]/20 [.light_&]:border-[#007AFF]/20 bg-[#131127] [.light_&]:bg-white/70 [.light_&]:bg-white/70 [.light_&]:shadow-xl shadow-[0_0_50px_rgba(236,72,153,0.1)] [.light_&]:shadow-xl rounded-[2.5rem] relative">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#ec4899]/10 [.light_&]:bg-[#007AFF]/10 [.light_&]:bg-[#007AFF]/5 blur-[120px] -z-10 rounded-full pointer-events-none" />

            <div className="px-8 py-6 border-b border-white/5 [.light_&]:border-black/5 flex items-center gap-4 z-10 text-[#f671b5] [.light_&]:text-[#007AFF] [.light_&]:text-[#007AFF]">
                <Terminal size={22} className="stroke-[3px]" />
                <span className="text-base font-[900] tracking-[0.25em] uppercase font-sans">
                    LOGIC BREAKDOWN
                </span>
            </div>

            <div className="flex-1 overflow-auto p-8 custom-scrollbar relative z-10">
                <div className="flex flex-col gap-10">
                    {steps.map((step, idx) => (
                        <div key={idx} className="flex gap-6 items-start group">
                            <div className="w-12 h-12 rounded-2xl bg-[#ec4899]/10 [.light_&]:bg-[#007AFF]/10 [.light_&]:bg-[#007AFF]/10 border border-[#ec4899]/20 [.light_&]:border-[#007AFF]/20 [.light_&]:border-[#007AFF]/20 flex items-center justify-center shrink-0 text-[#f671b5] [.light_&]:text-[#007AFF] [.light_&]:text-[#007AFF] font-[900] text-xl shadow-[0_0_20px_rgba(236,72,153,0.1)] [.light_&]:shadow-none group-hover:bg-[#ec4899]/20 [.light_&]:group-hover:bg-[#007AFF]/20 transition-all group-hover:scale-110">
                                {idx + 1}
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-white [.light_&]:text-slate-900 font-[900] tracking-tight text-xl leading-none">{step.title}</h4>
                                <p className="text-slate-400 [.light_&]:text-slate-600 text-[15px] leading-relaxed font-semibold">{step.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-8 py-6 border-t border-white/5 [.light_&]:border-black/5 flex items-center gap-4 text-[#f671b5] [.light_&]:text-[#007AFF] [.light_&]:text-[#007AFF] z-10 bg-[#131127] [.light_&]:bg-white/70 [.light_&]:bg-[#f8f8f8]">
                <Info size={22} className="stroke-[3px]" />
                <span className="text-sm font-[900] uppercase tracking-[0.2em]">Time Complexity: {complexity}</span>
            </div>
        </div>
    );
}
