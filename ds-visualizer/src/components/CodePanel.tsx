"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface HighlightedCodeProps {
    line: string;
    lang: string;
}

const HighlightedCode: React.FC<HighlightedCodeProps> = ({ line }) => {
    // Simple regex-based syntax highlighter for C++ and Python
    const tokenize = (text: string) => {
        const parts = text.split(/(\s+|[()\[\]{}.,:;=+\-*\/<>!&|?])/);
        return parts.map((part, i) => {
            if (/^(def|class|if|else|return|while|for|in|import|from|struct|void|int|bool|double|float|char|long|unsigned|template|typename|using|namespace|std|new|delete|nullptr|public|protected|private|vector|deque|push_back|pop_back|push|pop|front|back|nullptr_t)$/.test(part)) {
                return <span key={i} style={{ color: "var(--sh-keyword)" }}>{part}</span>;
            }
            if (/^[a-zA-Z_][a-zA-Z0-9_]*(?=\()/.test(part)) {
                return <span key={i} style={{ color: "var(--sh-function)" }}>{part}</span>;
            }
            if (/^[0-9]+$/.test(part)) {
                return <span key={i} style={{ color: "var(--sh-number)" }}>{part}</span>;
            }
            if (/^#.*$/.test(part) || /^\/\/.*$/.test(part) || part.startsWith("/*")) {
                return <span key={i} style={{ color: "var(--sh-comment)" }}>{part}</span>;
            }
            if (/^".*"$|^'.*'$/.test(part)) {
                return <span key={i} style={{ color: "var(--sh-string)" }}>{part}</span>;
            }
            if (/^(Node|Stack|Queue|List|Tree|TreeNode|BST|std::vector|std::deque|std::stack|std::queue)$/.test(part)) {
                return <span key={i} style={{ color: "var(--sh-class)" }}>{part}</span>;
            }
            return <span key={i}>{part}</span>;
        });
    };

    return <pre className="inline-block whitespace-pre font-bold">{tokenize(line)}</pre>;
};

interface CodePanelProps {
    code: {
        python: string[];
        cpp: string[];
    };
    currentLine: number;
}

export function CodePanel({ code, currentLine }: CodePanelProps) {
    const [lang, setLang] = React.useState<"python" | "cpp">("python");

    return (
        <div className="glass-card flex flex-col h-full overflow-hidden border border-white/5">
            <div className="px-4 py-2 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground font-mono">
                    IMPLEMENTATION
                </span>
                <div className="flex bg-black/40 rounded-lg p-1">
                    {(["python", "cpp"] as const).map((l) => (
                        <button
                            key={l}
                            onClick={() => setLang(l)}
                            className={cn(
                                "px-3 py-1 text-[10px] font-bold rounded-md transition-all uppercase tracking-tighter",
                                lang === l ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:text-white"
                            )}
                        >
                            {l === "python" ? "Python" : "C++"}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex-1 overflow-auto p-4 font-mono-vscode text-sm leading-relaxed custom-scrollbar bg-black/20">
                {code[lang].map((line, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "px-2 rounded transition-all duration-200 relative min-h-[1.5rem]",
                            currentLine === idx
                                ? "font-bold"
                                : "text-foreground/80"
                        )}
                    >
                        <span className="inline-block w-6 shrink-0 opacity-20 select-none text-xs">
                            {idx + 1}
                        </span>
                        <HighlightedCode line={line} lang={lang} />

                        <AnimatePresence>
                            {currentLine === idx && (
                                <motion.div
                                    layoutId="code-highlight"
                                    initial={{ opacity: 0, scaleX: 0.95 }}
                                    animate={{ opacity: 1, scaleX: 1 }}
                                    exit={{ opacity: 0, scaleX: 0.95 }}
                                    className="absolute inset-x-0 inset-y-0 bg-primary/20 rounded-md -z-10 border-l-4 border-primary shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                                    transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
