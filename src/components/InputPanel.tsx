"use client";

import { useState } from "react";
import { Plus, Minus, Search, RotateCcw } from "lucide-react";
import { PremiumButton } from "./ui/PremiumButton";

interface InputPanelProps {
    onAdd: (val: number, index?: number) => void;
    onRemove: (val?: number, index?: number) => void;
    onSearch?: (val: number) => void;
    onClear?: () => void;
    label?: string;
    showIndex?: boolean;
}

export function InputPanel({
    onAdd,
    onRemove,
    onSearch,
    onClear,
    label = "Value",
    showIndex = false
}: InputPanelProps) {
    const [val, setVal] = useState("");
    const [idx, setIdx] = useState("");

    const handleAdd = () => {
        const v = parseInt(val);
        if (!isNaN(v)) {
            onAdd(v, idx !== "" ? parseInt(idx) : undefined);
            setVal("");
            setIdx("");
        }
    };

    const handleRemove = () => {
        const v = parseInt(val);
        onRemove(!isNaN(v) ? v : undefined, idx !== "" ? parseInt(idx) : undefined);
        setVal("");
        setIdx("");
    };

    const handleSearch = () => {
        const v = parseInt(val);
        if (!isNaN(v) && onSearch) {
            onSearch(v);
            setVal("");
        }
    };

    return (
        <div className="glass-card p-6 flex flex-col gap-6 border border-white/5 [.light_&]:border-black/5 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-4">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] px-1 flex items-center gap-2">
                        <Plus size={10} className="text-primary" /> {label}
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={val}
                            onChange={(e) => setVal(e.target.value)}
                            placeholder="e.g. 42"
                            className="flex-1 bg-black/40 border border-white/10 [.light_&]:bg-black/5 [.light_&]:border-black/10 [.light_&]:shadow-inner rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/30"
                            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                        />
                        {showIndex && (
                            <input
                                type="number"
                                value={idx}
                                onChange={(e) => setIdx(e.target.value)}
                                placeholder="Idx"
                                className="w-20 bg-black/40 border border-white/10 [.light_&]:bg-black/5 [.light_&]:border-black/10 [.light_&]:shadow-inner rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/30"
                            />
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <PremiumButton onClick={handleAdd} className="w-full text-[10px] uppercase font-black tracking-widest h-12 shadow-lg shadow-primary/20">
                        <Plus size={14} className="mr-1" /> Add
                    </PremiumButton>
                    <PremiumButton onClick={handleRemove} variant="secondary" className="w-full text-[10px] uppercase font-black tracking-widest h-12">
                        <Minus size={14} className="mr-1" /> Remove
                    </PremiumButton>
                    {onSearch && (
                        <PremiumButton onClick={handleSearch} variant="secondary" className="w-full text-[10px] uppercase font-black tracking-widest h-12">
                            <Search size={14} className="mr-1" /> Search
                        </PremiumButton>
                    )}
                    {onClear && (
                        <PremiumButton onClick={onClear} variant="danger" className="w-full text-[10px] uppercase font-black tracking-widest h-12 shadow-lg shadow-red-500/10">
                            <RotateCcw size={14} className="mr-1" /> Clear
                        </PremiumButton>
                    )}
                </div>
            </div>
        </div>
    );
}
