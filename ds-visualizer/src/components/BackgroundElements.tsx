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
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-[#0F172A]">
            {/* Darker deep space background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05)_0%,transparent_50%)]" />

            {/* Ambient Gradients - More Vibrant */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-500/10 blur-[150px] rounded-full" />
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-emerald-500/5 blur-[100px] rounded-full" />

            {/* Grid Pattern with Glow */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

            {/* Floating Coding Elements */}
            {elements.map((item, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0.1, 0.4, 0.1],
                        y: [0, -100, 0],
                        x: [0, idx % 2 === 0 ? 50 : -50, 0],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: item.duration * 1.5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        position: "absolute",
                        top: item.top,
                        left: item.left,
                    }}
                    className="text-primary/10 drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]"
                >
                    <item.Icon size={item.size} />
                </motion.div>
            ))}

            {/* Code Snippet Particles */}
            {["if()", "{...}", "while", "=>", "log", "null"].map((code, i) => (
                <motion.div
                    key={i}
                    animate={{
                        opacity: [0.05, 0.15, 0.05],
                        y: [-20, 20],
                    }}
                    transition={{
                        duration: 10 + i * 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className="absolute font-mono text-[8px] sm:text-xs font-black text-white/5 whitespace-nowrap"
                    style={{
                        top: `${15 + i * 15}%`,
                        left: `${5 + (i * 17) % 90}%`,
                    }}
                >
                    {code}
                </motion.div>
            ))}

            {/* Dynamic Binary Streams */}
            <div className="absolute inset-0 flex justify-around opacity-[0.03] text-[8px] font-mono leading-none overflow-hidden h-full">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: "-100%" }}
                        animate={{ y: "100%" }}
                        transition={{
                            duration: 15 + i * 5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 2
                        }}
                        className="flex flex-col gap-1 py-10"
                    >
                        {[...Array(50)].map((_, j) => (
                            <span key={j} className={j % 7 === 0 ? "text-primary/40 shadow-[0_0_10px_rgba(99,102,241,1)]" : ""}>
                                {Math.round(Math.random())}
                            </span>
                        ))}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
