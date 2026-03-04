"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { InputPanel } from "@/components/InputPanel";
import { CodePanel } from "@/components/CodePanel";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { Trash2, Eye, RotateCcw, Play, FastForward, Settings } from "lucide-react";

type StackMode = "basic" | "polish";
type NotationType = "infix" | "postfix" | "prefix";

const STACK_CODE = {
    python: [
        "class Stack:",
        "  def __init__(self): self.items = []",
        "  def push(self, item): self.items.append(item)",
        "  def pop(self): return self.items.pop() if self.items else None",
        "  def peek(self): return self.items[-1] if self.items else None"
    ],
    cpp: [
        "stack<int> s;",
        "s.push(val);",
        "s.pop();",
        "int top = s.top();"
    ]
};

const POLISH_CODE = {
    python: [
        "def evaluate_postfix(expr):",
        "  stack = []",
        "  for char in expr.split():",
        "    if char.isdigit(): stack.append(int(char))",
        "    else:",
        "      b, a = stack.pop(), stack.pop()",
        "      if char == '+': stack.append(a + b)",
        "  return stack.pop()"
    ],
    cpp: [
        "int eval(string s) {",
        "  stack<int> st;",
        "  // ... evaluation logic",
        "  return st.top();",
        "}"
    ]
};

export default function StackPage() {
    const [mode, setMode] = useState<StackMode>("basic");
    const [notationType, setNotationType] = useState<NotationType>("postfix");
    const [stack, setStack] = useState<number[]>([]);
    const [expression, setExpression] = useState("3 4 + 2 * 7 -");
    const [steps, setSteps] = useState<{ stack: number[], token: string, action: string }[]>([]);
    const [currentStep, setCurrentStep] = useState(-1);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);

    // Polish Logic
    const generateSteps = (expr: string, type: NotationType) => {
        let tokens = expr.split(/\s+/).filter(t => t);
        if (type === "prefix") tokens = tokens.reverse();

        const s: number[] = [];
        const newSteps: { stack: number[], token: string, action: string }[] = [];

        tokens.forEach(token => {
            if (!isNaN(parseInt(token))) {
                s.push(parseInt(token));
                newSteps.push({ stack: [...s], token, action: `Push ${token}` });
            } else {
                const b = s.pop()!;
                const a = s.pop()!;
                let res = 0;
                if (type === "prefix") { // a is original first, b is original second in prefix reversal
                    switch (token) {
                        case '+': res = b + a; break;
                        case '-': res = b - a; break;
                        case '*': res = b * a; break;
                        case '/': res = Math.floor(b / a); break;
                    }
                } else {
                    switch (token) {
                        case '+': res = a + b; break;
                        case '-': res = a - b; break;
                        case '*': res = a * b; break;
                        case '/': res = Math.floor(a / b); break;
                    }
                }
                s.push(res);
                newSteps.push({ stack: [...s], token, action: `${type === "prefix" ? b : a} ${token} ${type === "prefix" ? a : b} = ${res}` });
            }
        });
        setSteps(newSteps);
        setCurrentStep(-1);
    };

    useEffect(() => {
        if (mode === "polish") {
            const timer = setTimeout(() => generateSteps(expression, notationType), 0);
            return () => clearTimeout(timer);
        }
    }, [expression, notationType, mode]);

    useEffect(() => {
        if (!isAutoPlaying) return;

        if (currentStep < steps.length - 1) {
            const timer = setTimeout(() => setCurrentStep(p => p + 1), 1000);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => setIsAutoPlaying(false), 0);
            return () => clearTimeout(timer);
        }
    }, [isAutoPlaying, currentStep, steps.length]);

    return (
        <main className="min-h-screen pt-24 pb-12 flex flex-col items-center">
            <Navbar />
            <div className="container max-w-7xl flex-1 flex flex-col gap-8 px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-black text-foreground uppercase tracking-tighter">
                            Stack <span className="text-primary font-bold">Visualizer</span>
                        </h1>
                        <p className="text-muted-foreground text-lg font-medium">
                            {mode === "basic" ? "LIFO (Last-In, First-Out) operations." : "Evaluate expressions using Stack-based logic."}
                        </p>
                    </div>

                    <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl">
                        {(["basic", "polish"] as const).map((m) => (
                            <button
                                key={m}
                                onClick={() => { setMode(m); setStack([]); setCurrentStep(-1); }}
                                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === m ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {m === "basic" ? "Standard" : "Polish Notation"}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
                        {mode === "basic" ? (
                            <>
                                <InputPanel onAdd={(val) => setStack(p => [...p, val])} onRemove={() => setStack(p => p.slice(0, -1))} label="Push Value" />
                                <div className="grid grid-cols-2 gap-3 px-1">
                                    <PremiumButton onClick={() => setStack(p => [...p, Math.floor(Math.random() * 99) + 1])} variant="gradient" className="col-span-2 h-12 text-[10px] font-black uppercase tracking-widest">
                                        <RotateCcw size={14} className="mr-2" /> Push Random Value
                                    </PremiumButton>
                                    <PremiumButton onClick={() => { }} variant="secondary"><Eye size={16} /> Peek</PremiumButton>
                                    <PremiumButton onClick={() => setStack([])} variant="danger"><RotateCcw size={16} /> Clear</PremiumButton>
                                </div>
                            </>
                        ) : (
                            <div className="glass-card p-6 flex flex-col gap-4">
                                <div className="flex bg-white/5 rounded-lg p-1">
                                    {(["postfix", "prefix"] as const).map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setNotationType(t)}
                                            className={`flex-1 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${notationType === t ? "bg-white/10 text-primary" : "text-white/30"}`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    value={expression}
                                    onChange={(e) => setExpression(e.target.value)}
                                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 font-mono text-sm focus:outline-none focus:border-primary transition-colors"
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <PremiumButton onClick={() => setIsAutoPlaying(!isAutoPlaying)} variant="secondary" className="!text-[10px]">
                                        {isAutoPlaying ? "Pause" : <><Play size={10} className="mr-1" /> Auto</>}
                                    </PremiumButton>
                                    <PremiumButton onClick={() => setCurrentStep(p => Math.min(p + 1, steps.length - 1))} variant="primary" className="!text-[10px]" disabled={currentStep >= steps.length - 1}>
                                        <FastForward size={10} className="mr-1" /> Next
                                    </PremiumButton>
                                </div>
                            </div>
                        )}
                        <div className="h-[400px]">
                            <CodePanel code={mode === "basic" ? STACK_CODE : POLISH_CODE} currentLine={-1} />
                        </div>
                    </div>

                    <div className="lg:col-span-8 glass-card min-h-[550px] flex flex-col items-center justify-end p-8 order-1 lg:order-2 relative overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter uppercase">
                            STACK
                        </div>

                        {mode === "polish" && currentStep >= 0 && (
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="absolute top-12 text-3xl font-black text-primary uppercase italic tracking-tighter">
                                {steps[currentStep].action}
                            </motion.div>
                        )}

                        <div className="w-full max-w-xs flex flex-col-reverse gap-3 p-6 border-x-4 border-b-4 border-white/10 rounded-b-3xl bg-white/[0.02] relative shadow-2xl">
                            <AnimatePresence mode="popLayout">
                                {(mode === "basic" ? stack : (currentStep >= 0 ? steps[currentStep].stack : [])).map((val, idx, arr) => (
                                    <motion.div
                                        key={`${idx}-${val}`}
                                        layout
                                        initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        className="w-full h-14 bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground flex items-center justify-center rounded-xl font-black shadow-xl border border-white/10 text-xl"
                                    >
                                        {val}
                                        {idx === arr.length - 1 && (
                                            <div className="absolute -left-20 flex items-center gap-2 text-[10px] font-black text-primary animate-pulse">
                                                TOP <div className="w-8 h-[2px] bg-primary" />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div className="h-12" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
