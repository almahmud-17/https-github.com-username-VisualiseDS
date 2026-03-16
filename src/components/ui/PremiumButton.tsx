"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "ghost" | "gradient";
    loading?: boolean;
    children?: React.ReactNode;
}

export const PremiumButton = forwardRef<HTMLButtonElement, PremiumButtonProps>(
    ({ className, variant = "primary", loading, children, ...props }, ref) => {
        const variants = {
            primary: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.2)] [.light_&]:liquid-button",
            secondary: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)] [.light_&]:liquid-button",
            danger: "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.2)] [.light_&]:liquid-button",
            ghost: "bg-transparent text-foreground/70 hover:text-foreground hover:bg-white/5 [.light_&]:hover:bg-black/5 [.light_&]:text-slate-600",
            gradient: "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:shadow-[0_0_40px_rgba(236,72,153,0.5)] [.light_&]:liquid-button",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "relative overflow-hidden px-6 py-2.5 rounded-full font-bold flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed",
                    "border border-white/10 group-hover:border-white/20",
                    "transition-transform duration-200 ease-out hover:scale-105 hover:-translate-y-0.5 active:scale-95",
                    variants[variant],
                    className
                )}
                {...props}
            >
                {/* Persistent Glow */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />

                {/* Text/Content */}
                <span className="relative z-10 flex items-center gap-2">
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                        children
                    )}
                </span>
            </button>
        );
    }
);

PremiumButton.displayName = "PremiumButton";
