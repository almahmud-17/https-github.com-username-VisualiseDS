"use client";

import React, { useEffect, useState } from "react";
import { Code, Terminal, Binary, Cpu, Network } from "lucide-react";

const elements = [
    { Icon: Code, size: 24, top: "10%", left: "5%", delay: "0s", dur: "40s" },
    { Icon: Terminal, size: 20, top: "25%", left: "85%", delay: "5s", dur: "50s" },
    { Icon: Binary, size: 32, top: "60%", left: "12%", delay: "2s", dur: "44s" },
    { Icon: Cpu, size: 28, top: "40%", left: "90%", delay: "8s", dur: "60s" },
    { Icon: Network, size: 26, top: "85%", left: "15%", delay: "4s", dur: "70s" },
];

// Inline noise SVG as data URI to avoid external network request
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`;

export function BackgroundElements() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-[#060912] [.light_&]:bg-[#F8F9FF]">
            {/* Base Ambient Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.08)_0%,transparent_60%)] [.light_&]:bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.12)_0%,transparent_70%)]" />

            {/* Blob 1: Top Left - pure CSS animation */}
            <div
                className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/20 blur-[80px] rounded-full will-change-transform"
                style={{ animation: "blobFloat1 20s ease-in-out infinite" }}
            />

            {/* Blob 2: Bottom Right */}
            <div
                className="absolute bottom-[-15%] right-[-10%] w-[70%] h-[70%] bg-purple-600/15 blur-[80px] rounded-full will-change-transform"
                style={{ animation: "blobFloat2 25s ease-in-out infinite" }}
            />

            {/* Blob 3: Center Left */}
            <div
                className="absolute top-[30%] left-[-5%] w-[40%] h-[40%] bg-emerald-500/10 blur-[80px] rounded-full will-change-transform"
                style={{ animation: "blobPulse 18s ease-in-out infinite" }}
            />

            {/* Inline Noise Texture */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{ backgroundImage: NOISE_SVG }}
            />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [.light_&]:bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

            {/* Subtle Coding Elements — CSS animated, reduced from 10 to 5 */}
            {elements.map((item, idx) => (
                <div
                    key={idx}
                    style={{
                        position: "absolute",
                        top: item.top,
                        left: item.left,
                        animation: `iconFloat ${item.dur} ease-in-out ${item.delay} infinite`,
                        willChange: "transform, opacity",
                    }}
                    className="text-white/20 [.light_&]:text-indigo-600/10"
                >
                    <item.Icon size={item.size} />
                </div>
            ))}
        </div>
    );
}
