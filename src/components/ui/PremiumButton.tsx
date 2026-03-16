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
            primary: "bg-primary/15 text-primary border-primary/25 hover:bg-primary/25 hover:border-primary/40 shadow-[0_0_20px_rgba(99,102,241,0.1)] hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] [.light_&]:liquid-button",
            secondary: "bg-emerald-500/15 text-emerald-400 [.light_&]:text-emerald-600 border-emerald-500/25 hover:bg-emerald-500/25 hover:border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] [.light_&]:liquid-button",
            danger: "bg-red-500/15 text-red-400 [.light_&]:text-red-600 border-red-500/25 hover:bg-red-500/25 hover:border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.1)] hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] [.light_&]:liquid-button",
            ghost: "bg-transparent text-foreground/70 border-transparent hover:text-foreground hover:bg-white/5 [.light_&]:hover:bg-black/5 [.light_&]:text-slate-600",
            gradient: "bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 text-white [.light_&]:text-primary border-primary/25 hover:from-primary/30 hover:via-purple-500/30 hover:to-pink-500/30 hover:border-primary/50 shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] [.light_&]:liquid-button",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "relative overflow-hidden px-6 py-2.5 rounded-full font-bold flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed",
                    "border backdrop-blur-md",
                    "transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95",
                    variants[variant],
                    className
                )}
                {...props}
            >
                {/* Liquid side glow - left */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-[120%] bg-gradient-to-r from-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
                {/* Liquid side glow - right */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-[120%] bg-gradient-to-l from-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
                {/* Top highlight for liquid feel */}
                <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

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
