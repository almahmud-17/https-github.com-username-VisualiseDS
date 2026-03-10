"use client";

import { motion } from "framer-motion";
import { Code, Cpu, Terminal, Binary, Brackets, Database, Network, Share2, Layers, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";

const elements = [
    { Icon: Code, size: 24, top: "10%", left: "5%", duration: 20 },
    { Icon: Terminal, size: 20, top: "25%", left: "85%", duration: 25 },
    { Icon: Binary, size: 32, top: "60%", left: "12%", duration: 22 },
    { Icon: Brackets, size: 18, top: "80%", left: "75%", duration: 18 },
    { Icon: Cpu, size: 28, top: "40%", left: "90%", duration: 30 },
    { Icon: Database, size: 22, top: "15%", left: "70%", duration: 28 },
    { Icon: Network, size: 26, top: "85%", left: "15%", duration: 35 },
    { Icon: Share2, size: 20, top: "45%", left: "10%", duration: 24 },
    { Icon: Layers, size: 24, top: "70%", left: "80%", duration: 26 },
    { Icon: Zap, size: 18, top: "50%", left: "50%", duration: 20 },
];

export function BackgroundElements() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-[#060912] [.light_&]:bg-[#F8F9FF]">
            {/* Base Ambient Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.08)_0%,transparent_60%)] [.light_&]:bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.12)_0%,transparent_70%)]" />

            {/* Apple Sequoia Style Liquid Blobs */}
            {/* Blob 1: Top Left - Indigo/Blue */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/20 blur-[130px] rounded-full"
            />

            {/* Blob 2: Bottom Right - Purple/Pink */}
            <motion.div
                animate={{
                    scale: [1.1, 1, 1.1],
                    x: [0, -40, 0],
                    y: [0, -60, 0],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[-15%] right-[-10%] w-[70%] h-[70%] bg-purple-600/15 blur-[160px] rounded-full"
            />

            {/* Blob 3: Center Left - Emerald/Cyan */}
            <motion.div
                animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.3, 1],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[30%] left-[-5%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full"
            />

            {/* Grain Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [.light_&]:bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

            {/* Subtle Coding Elements */}
            {elements.map((item, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0.05, 0.2, 0.05],
                        y: [0, -80, 0],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: item.duration * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    style={{
                        position: "absolute",
                        top: item.top,
                        left: item.left,
                    }}
                    className="text-white/20 [.light_&]:text-indigo-600/10"
                >
                    <item.Icon size={item.size} />
                </motion.div>
            ))}
        </div>
    );
}
