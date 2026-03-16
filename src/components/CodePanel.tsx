"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface HighlightedTextProps {
    line: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ line }) => {
    const tokenize = (text: string) => {
        const parts = text.split(/(\s+|[()\[\]{}.,:;=+\-*/<>!&|?])/);
        return parts.map((part, i) => {
            if (/^(Step|If|Else|While|For|Return|Repeat|Until|Stop|Start|Function|End|Then)$/i.test(part)) {
                return <span key={i} className="text-[#3b82f6] [.light_&]:text-[#007AFF] font-bold">{part}</span>;
            }
            if (/^[0-9]+$/.test(part)) {
                return <span key={i} className="text-[#10b981] [.light_&]:text-[#34C759]">{part}</span>;
            }
            if (/^".*"$|^'.*'$/.test(part)) {
                return <span key={i} className="text-[#8b5cf6] [.light_&]:text-[#8B5CF6]">{part}</span>;
            }
            return <span key={i} className="text-gray-100 [.light_&]:text-slate-800">{part}</span>;
        });
    };

    return <pre className="inline-block whitespace-pre font-medium">{tokenize(line)}</pre>;
};

interface CodePanelProps {
    code?: {
        python: string[];
        cpp: string[];
    };
    algorithm?: string[];
    currentLine: number;
}

export const CodePanel = React.memo(function CodePanel({ code, algorithm, currentLine }: CodePanelProps) {
    // If they still pass code for whatever reason, fallback or ignore it since we want algorithms everywhere.
    // However we'll assume the parent component has been updated to pass `algorithm`
    const content = algorithm || code?.python || [];

    return (
        <div className="glass-card flex flex-col h-full overflow-hidden border border-[#3b82f6]/20 [.light_&]:border-black/5 bg-black/60 [.light_&]:bg-white/40 backdrop-blur-3xl shadow-[0_0_50px_rgba(59,130,246,0.1)] [.light_&]:shadow-xl rounded-3xl relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3b82f6]/20 blur-[100px] -z-10 rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#10b981]/10 blur-[100px] -z-10 rounded-full pointer-events-none" />

            <div className="px-6 py-4 border-b border-white/5 [.light_&]:border-black/5 bg-white/5 [.light_&]:bg-white/40 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#3b82f6]"></span>
                    </div>
                    <span className="text-xs font-bold tracking-[0.2em] text-[#3b82f6] font-mono relative">
                        ALGORITHM
                    </span>
                </div>
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)] border border-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)] border border-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)] border border-green-500" />
                </div>
            </div>
            <div className="flex-1 overflow-auto p-6 font-mono text-[15px] leading-8 custom-scrollbar relative z-10">
                {content.map((line, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "px-4 py-1.5 rounded-xl transition-all duration-300 relative min-h-[2.5rem] flex items-start group mb-1",
                            currentLine === idx
                                ? "bg-white/10 [.light_&]:bg-[#007AFF]/10 border-l-[3px] border-[#3b82f6] [.light_&]:border-[#007AFF] translate-x-1 shadow-[0_4px_20px_rgba(0,0,0,0.3)] [.light_&]:shadow-[0_4px_10px_rgba(0,122,255,0.1)]"
                                : "hover:bg-white/5 [.light_&]:hover:bg-black/5 border-l-[3px] border-transparent"
                        )}
                    >
                        <span className={cn(
                            "inline-block w-10 shrink-0 select-none text-xs mt-1.5 font-bold font-mono tracking-widest",
                            currentLine === idx ? "text-[#3b82f6] [.light_&]:text-[#007AFF] opacity-100" : "text-white/20 [.light_&]:text-slate-400 group-hover:text-white/40 [.light_&]:group-hover:text-slate-500"
                        )}>
                            {(idx + 1).toString().padStart(2, '0')}
                        </span>
                        <div className="flex-1 pt-0.5">
                            <HighlightedText line={line} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});
