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
        <div className="glass-card p-6 flex flex-col gap-4 border border-white/5">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
                        {label}
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={val}
                            onChange={(e) => setVal(e.target.value)}
                            placeholder="e.g. 42"
                            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                        />
                        {showIndex && (
                            <input
                                type="number"
                                value={idx}
                                onChange={(e) => setIdx(e.target.value)}
                                placeholder="Idx"
                                className="w-20 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <PremiumButton onClick={handleAdd} className="w-full">
                        <Plus size={16} /> Add
                    </PremiumButton>
                    <PremiumButton onClick={handleRemove} variant="secondary">
                        <Minus size={16} /> Remove
                    </PremiumButton>
                    {onSearch && (
                        <PremiumButton onClick={handleSearch} variant="secondary">
                            <Search size={16} /> Search
                        </PremiumButton>
                    )}
                    {onClear && (
                        <PremiumButton onClick={onClear} variant="danger">
                            <RotateCcw size={16} /> Clear
                        </PremiumButton>
                    )}
                </div>
            </div>
        </div>
    );
}
