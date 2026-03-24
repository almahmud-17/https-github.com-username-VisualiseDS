"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import {
    BookOpen, Lightbulb, Info, Clock,
    Layers, GitBranch, List,
    ArrowDownNarrowWide, Split, Target, Zap,
    Maximize, Layout, Activity, Search, Hash,
    Code, Database, X, ChevronRight, Brain
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TopicDetail {
    title: string;
    definition: string;
    mnemonic?: string;
    complexity?: string;
    keyOperations?: string[];
    useCases?: string[];
    prosCons?: { pros: string[]; cons: string[] };
}

const TOPIC_DETAILS: Record<string, TopicDetail> = {
    "Elementary Data Objects concepts": {
        title: "Elementary Data Objects",
        definition: "The most basic units of data (integers, characters, booleans) used as building blocks for complex structures.",
        mnemonic: "The Brick: Just as you need bricks to build a house, you need data objects to build a structure.",
        keyOperations: ["Declaration", "Assignment", "Arithmetic", "Comparison"],
        useCases: ["Loop counters", "Flag variables", "Basic mathematical calculations"],
        prosCons: {
            pros: ["Extremely fast", "Minimal memory usage"],
            cons: ["Limited data representation on their own"]
        }
    },
    "Necessity of Structured Data": {
        title: "Necessity of Structured Data",
        definition: "The requirement to organize data strategically to ensure efficient access, modification, and searching. Without structure, data becomes unmanageable as it scales.",
        mnemonic: "The Organized Library: A messy library makes finding books impossible; structured data is the Dewey Decimal System.",
        useCases: ["Database management systems", "Search engine indexing", "Large-scale software architecture"],
        prosCons: {
            pros: ["Optimized search/retrieval", "Better memory management"],
            cons: ["Implementation overhead", "Potential complexity in maintenance"]
        }
    },
    "Types of Data Structures": {
        title: "Types of Data Structures",
        definition: "Classification of data into Primitive (built-in like int, char) and Non-primitive (user-defined like arrays, linked lists, files).",
        mnemonic: "The Menu: Primitive is the base ingredient; Non-primitive is the complete dish.",
        keyOperations: ["Creation", "Traversing", "Searching", "Updating"],
        useCases: ["Managing system memory", "Object-oriented programming", "Data transmission"]
    },
    "Linear vs Nonlinear Data Structures": {
        title: "Linear vs Nonlinear DS",
        definition: "Linear structures sequence elements in a straight line (Arrays, Stacks, Queues); Nonlinear structures show hierarchical or networked relationships (Trees, Graphs).",
        mnemonic: "Line vs Tree: A line is a sequence; a tree is a family structure.",
        keyOperations: ["Linear access", "Hierarchical traversal", "Level-order processing"],
        useCases: ["Linear: Storing lists, Undo/Redo", "Nonlinear: Organizational charts, Social networks"]
    },
    "Representation in Memory": {
        title: "Linear Array Memory",
        definition: "Elements are stored in contiguous (neighboring) memory addresses. This allows for constant-time access to any element using its index.",
        mnemonic: "The Hotel Hallway: Room 101 is right next to Room 102.",
        complexity: "Access: O(1), Search: O(n)",
        keyOperations: ["Indexing", "Base address calculation", "Offset addition"]
    },
    "Traversing LA": {
        title: "Array Traversal",
        definition: "Processing every element in a linear array exactly once, usually via a loop.",
        mnemonic: "The Roll Call: Checking every student on the list from top to bottom.",
        complexity: "O(n)",
        useCases: ["Searching for an item", "Displaying all elements", "Applying a function to all values"]
    },
    "Multidimensional Arrays": {
        title: "Multidimensional Arrays",
        definition: "Data organized in rows and columns (2D) or even higher dimensions (3D). Useful for representing matrices, grids, or multi-attribute data.",
        mnemonic: "The Excel Sheet: Go to Row X, Column Y to find the value.",
        keyOperations: ["Row-major storage", "Column-major storage", "Coordinate mapping"],
        useCases: ["Image processing (2D)", "Spreadsheets", "Physics simulations (3D space)"]
    },
    "Stack Representation": {
        title: "Stack (LIFO)",
        definition: "A linear data structure following the Last-In-First-Out (LIFO) principle. Items are added and removed from the same end called 'Top'.",
        mnemonic: "LIFO: Last-In-First-Out, like a stack of cafeteria trays.",
        complexity: "Push/Pop: O(1)",
        keyOperations: ["Push", "Pop", "Peek", "isEmpty"],
        useCases: ["Function call stacks", "Undo mechanisms", "Expression evaluation (Postfix)"],
        prosCons: {
            pros: ["Fast O(1) operations", "Simple implementation"],
            cons: ["Limited access (only top)", "Fixed size if implemented using arrays"]
        }
    },
    "Polish & Reverse Polish Notation": {
        title: "Polish Notation",
        definition: "Notation systems for mathematical expressions that eliminate the need for parentheses. Infix: (A+B), Prefix: (+AB), Postfix: (AB+).",
        mnemonic: "Operator Prefix/Postfix: The computer reads math like a story from start to finish.",
        useCases: ["Compiler parsing", "HP Calculators", "Simplified arithmetic logic units"],
        keyOperations: ["Infix to Postfix conversion", "Postfix evaluation"]
    },
    "Recursion Applications": {
        title: "Recursion",
        definition: "A technique where a function calls itself as a subroutine to solve smaller instances of the same problem. Requires a base case to terminate.",
        mnemonic: "The Mirror Room: Seeing yourself seeing yourself...",
        keyOperations: ["Base Case check", "Recursive call", "Stack winding/unwinding"],
        useCases: ["Tree traversals", "Quicksort/Mergesort", "Dynamic Programming"],
        prosCons: {
            pros: ["Clean code", "Fits natural problem structure"],
            cons: ["Excessive memory (stack space)", "Slower than iterative solutions"]
        }
    },
    "Circular Linked Lists": {
        title: "Circular Linked List",
        definition: "A linked list variation where the last node stores a reference to the first node instead of null, creating a continuous loop.",
        mnemonic: "The Roundabout: Driving in a circle; there's no dead end.",
        complexity: "Access: O(n), Insertion: O(1) at head",
        keyOperations: ["Loop traversal", "Circular insertion"],
        useCases: ["Scheduling tasks in an OS", "Multiplayer gaming rounds", "Music playlists on repeat"]
    },
    "Linear & Binary Search": {
        title: "Searching Algorithms",
        definition: "Techniques for finding a specific value in a dataset. Linear search scans everything; Binary search divides the range repeatedly.",
        mnemonic: "Lookup vs Divide: Linear is checking every page; Binary is splitting the book in half.",
        complexity: "Linear: O(n), Binary: O(log n)",
        keyOperations: ["Midpoint calculation (Binary)", "Recursive split"],
        useCases: ["Linear: Unsorted lists", "Binary: Large sorted datasets"],
        prosCons: {
            pros: ["Binary is ultra-fast for sorted data"],
            cons: ["Binary requires pre-sorted data"]
        }
    },
    "Bubble / Quick / Merge Sort": {
        title: "Sorting Algorithms",
        definition: "Algorithms to arrange data in a specific order (ascending or descending). Bubble is simple but slow; Quick and Merge are fast and efficient.",
        mnemonic: "Sink, Partition, Divide: Different ways to reach the the same sorted goal.",
        complexity: "Bubble: O(n²), Quick/Merge: O(n log n)",
        keyOperations: ["Pivot selection (Quick)", "Divide-and-Conquer (Merge)", "Swapping (Bubble)"],
        useCases: ["Data organization", "Binary Search preparation", "Optimizing other algorithms"]
    },
    "AVL & Red-Black": {
        title: "Balanced Trees",
        definition: "Self-balancing binary search trees (BST). AVL trees are more strictly balanced than Red-Black trees, providing faster lookups but slower insertions.",
        mnemonic: "The Perfect Scale: Keeping the tree balanced so it doesn't lean too much to one side.",
        complexity: "Search/Insert: O(log n)",
        keyOperations: ["Rotation (Left/Right)", "Color flipping (RB)", "Balancing factor check"],
        useCases: ["Database indexing", "Memory management", "Associative arrays"]
    },
    "Heaps & Heap Sort": {
        title: "Heaps",
        definition: "A complete binary tree-based structure. Min-Heaps keep the smallest element at the root, while Max-Heaps keep the largest.",
        mnemonic: "The King of the Hill: The most important (max/min) is always at the top.",
        complexity: "Heapify/Sort: O(n log n)",
        keyOperations: ["Insert", "Delete Root", "Heapify", "Peek"],
        useCases: ["Priority Queues", "Graph algorithms (Dijkstra)", "Memory allocation"]
    },
    "Hash Function architecture": {
        title: "Hashing & Hash Tables",
        definition: "Mapping large keys into a smaller, fixed range of indices using a mathematical function for constant-time data access.",
        mnemonic: "The Pigeonhole: Assigning every mail piece to a specific numbered box.",
        complexity: "O(1) Average Case",
        keyOperations: ["Hash calculation", "Collision resolution", "Lookup"],
        useCases: ["Caches", "Unique IDs", "Password verification"]
    },
    "Towers of Hanoi": {
        title: "Tower of Hanoi",
        definition: "A mathematical puzzle where three pegs and n disks of different sizes are used. The objective is to move the entire stack to another peg, obeying specific rules.",
        mnemonic: "Divide and Conquer: To move the big disk, you must first move all smaller ones out of the way.",
        complexity: "O(2ⁿ)",
        keyOperations: ["Move disk", "Recursive sub-solve"],
        useCases: ["Understanding recursion", "Algorithm design patterns"],
        prosCons: {
            pros: ["Clear demonstration of recursion"],
            cons: ["Exponential time complexity"]
        }
    }
};

const COURSE_SECTIONS = [
    {
        title: "Introduction",
        icon: <Layout className="text-indigo-400" />,
        definition: "Foundational concepts of structured data.",
        concepts: [
            "Elementary Data Objects concepts",
            "Necessity of Structured Data",
            "Types of Data Structures",
            "Linear vs Nonlinear Data Structures",
            "Data representation ideas"
        ]
    },
    {
        title: "Linear Array (LA)",
        icon: <Maximize className="text-blue-400" />,
        definition: "Contiguous memory structures for data storage.",
        concepts: [
            "Representation in Memory",
            "Traversing LA",
            "Insertion & Deletion in LA",
            "Multidimensional Arrays",
            "Algebra of Matrices",
            "Sparse Matrices representation"
        ]
    },
    {
        title: "Stack & Expressions",
        icon: <Layers className="text-orange-400" />,
        definition: "LIFO structure used in logic and parsing.",
        concepts: [
            "Stack Representation",
            "PUSH and POP Operations",
            "Polish & Reverse Polish Notation",
            "Evaluation of Postfix Expressions",
            "Transforming Infix to Postfix",
            "Recursion Applications"
        ]
    },
    {
        title: "Queue & Recursion",
        icon: <Clock className="text-emerald-400" />,
        definition: "FIFO structures and self-referential logic.",
        concepts: [
            "Insertion & Deletion logic",
            "Priority Queues",
            "Factorial Function recursion",
            "Fibonacci Sequence",
            "Ackermann Function",
            "Towers of Hanoi"
        ]
    },
    {
        title: "Linked Lists",
        icon: <List className="text-cyan-400" />,
        definition: "Pointer-based dynamic memory structures.",
        concepts: [
            "Memory Representation",
            "Traversing & Searching",
            "Insertion & Deletion",
            "Circular Linked Lists",
            "Header Linked Lists",
            "Two-Way (Doubly) Lists"
        ]
    },
    {
        title: "Complexity Analysis",
        icon: <Activity className="text-red-400" />,
        definition: "Measuring the efficiency of algorithms.",
        concepts: [
            "Algorithm & Flowcharting",
            "Asymptotic Notations",
            "Best Case Analysis",
            "Worst Case Analysis",
            "Average Case Analysis",
            "Complexity of Specific Algorithms"
        ]
    },
    {
        title: "Sorting & Searching",
        icon: <ArrowDownNarrowWide className="text-pink-400" />,
        definition: "Efficient data organization and retrieval.",
        concepts: [
            "Linear & Binary Search",
            "Insertion / Selection Sort",
            "Bubble / Quick / Merge Sort",
            "Hash Function architecture",
            "Collision Resolution strategies"
        ]
    },
    {
        title: "Advanced Trees",
        icon: <GitBranch className="text-purple-400" />,
        definition: "Hierarchical and balanced structures.",
        concepts: [
            "Tree Terminology",
            "Binary Tree Memory representation",
            "Binary Tree Traversals",
            "Balanced BST (AVL & Red-Black)",
            "Heaps & Heap Sort",
            "B Trees & General Tree logic"
        ]
    }
];

export default function ConceptsPage() {
    const [selectedTopic, setSelectedTopic] = useState<TopicDetail | null>(null);

    return (
        <main className="min-h-screen pt-24 pb-20 bg-[#0F172A] overflow-x-hidden">
            <Navbar />

            <div className="container max-w-7xl px-6 mx-auto">
                <div className="flex flex-col items-center mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 border bg-primary/5 border-primary/20 rounded-2xl backdrop-blur-sm shadow-xl shadow-primary/5"
                    >
                        <BookOpen size={18} className="text-primary" />
                        <span className="text-[11px] font-black tracking-[0.3em] uppercase text-primary">Department Curriculum</span>
                    </motion.div>
                    <h1 className="mb-6 text-6xl font-black md:text-8xl text-foreground tracking-tighter">
                        DSA <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-indigo-400 animate-gradient">SYLLABUS</span>
                    </h1>
                    <p className="max-w-3xl text-xl leading-relaxed text-muted-foreground/80 font-medium">
                        Click on any topic to reveal detailed definitions, mnemonics, and complexity analysis.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                    {COURSE_SECTIONS.map((section, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.05 }}
                            className="p-8 border glass-card border-white/5 hover:border-primary/30 transition-all group relative overflow-hidden flex flex-col gap-6"
                        >
                            <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-primary/5 blur-[100px] group-hover:bg-primary/10 transition-colors pointer-events-none" />

                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-5">
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-500 shadow-xl">
                                        {section.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors">{section.title}</h2>
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Syllabus Module {idx + 1}</p>
                                    </div>
                                </div>
                                <span className="text-7xl font-black text-white/[0.03] select-none leading-none group-hover:text-primary/5 transition-colors">{idx + 1}</span>
                            </div>

                            <div className="flex flex-col gap-6 flex-1">
                                <div className="p-5 rounded-2xl bg-black/40 border border-white/5 group-hover:border-primary/10 transition-all">
                                    <h3 className="text-[10px] font-black tracking-widest uppercase text-primary mb-3 flex items-center gap-2">
                                        <Database size={12} /> Overview
                                    </h3>
                                    <p className="text-base text-muted-foreground leading-relaxed font-medium">
                                        {section.definition}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <h3 className="text-[10px] font-black tracking-widest uppercase text-muted-foreground px-1">Curriculum Topics (Interactive)</h3>
                                    <div className="grid grid-cols-1 gap-2.5">
                                        {section.concepts.map((concept, cIdx) => (
                                            <button
                                                key={cIdx}
                                                onClick={() => {
                                                    const detail = TOPIC_DETAILS[concept] || {
                                                        title: concept,
                                                        definition: "Detailed coverage of " + concept + " according to the master syllabus.",
                                                        mnemonic: "Systematic learning step: " + concept
                                                    };
                                                    setSelectedTopic(detail);
                                                }}
                                                className="flex items-center gap-3 p-3 text-left rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-primary/10 hover:border-primary/30 hover:translate-x-1 group/btn transition-all"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/btn:bg-primary transition-colors" />
                                                <span className="text-sm font-bold text-foreground/70 group-hover/btn:text-foreground transition-colors flex-1">{concept}</span>
                                                <ChevronRight size={14} className="text-muted-foreground/40 group-hover/btn:text-primary group-hover/btn:translate-x-1 transition-all" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary shadow-[0_0_10px_#6366f1]"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Interactive Detail Modal */}
            <AnimatePresence>
                {selectedTopic && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-3xl bg-[#1E293B] border border-white/10 rounded-[2rem] p-10 shadow-2xl overflow-y-auto max-h-[90vh]"
                        >
                            {/* Modal Background Decor */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] pointer-events-none" />

                            <button
                                onClick={() => setSelectedTopic(null)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-all"
                            >
                                <X size={20} />
                            </button>

                            <div className="relative z-10 space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                                        <Brain size={32} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black tracking-[0.4em] uppercase text-primary/60">Module Concept</p>
                                        <h2 className="text-4xl font-black text-foreground tracking-tight">{selectedTopic.title}</h2>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-xs font-black tracking-widest uppercase text-primary mb-3 flex items-center gap-2">
                                                    <Info size={14} /> Description
                                                </h3>
                                                <p className="text-base text-muted-foreground leading-relaxed font-medium">
                                                    {selectedTopic.definition}
                                                </p>
                                            </div>

                                            {selectedTopic.keyOperations && (
                                                <div>
                                                    <h3 className="text-xs font-black tracking-widest uppercase text-emerald-400 mb-3 flex items-center gap-2">
                                                        <Activity size={14} /> Key Operations
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedTopic.keyOperations.map((op, i) => (
                                                            <span key={i} className="px-3 py-1 bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 rounded-lg text-xs font-bold leading-none">
                                                                {op}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {selectedTopic.complexity && (
                                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                                                    <h3 className="text-[10px] font-black tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                                                        <Clock size={12} className="text-red-400" /> Performance
                                                    </h3>
                                                    <span className="font-mono text-lg font-bold text-primary">{selectedTopic.complexity}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-6">
                                            {selectedTopic.useCases && (
                                                <div className="p-5 rounded-2xl bg-black/20 border border-white/5">
                                                    <h3 className="text-xs font-black tracking-widest uppercase text-primary/80 mb-3 flex items-center gap-2">
                                                        <Zap size={14} /> Applications
                                                    </h3>
                                                    <ul className="space-y-2">
                                                        {selectedTopic.useCases.map((uc, i) => (
                                                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground font-medium">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 flex-shrink-0" />
                                                                {uc}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {selectedTopic.prosCons && (
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                                                        <h4 className="text-[9px] font-black uppercase tracking-widest text-emerald-400 mb-2">Pros</h4>
                                                        <ul className="space-y-1">
                                                            {selectedTopic.prosCons.pros.map((p, i) => (
                                                                <li key={i} className="text-[11px] text-muted-foreground leading-tight">• {p}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                                                        <h4 className="text-[9px] font-black uppercase tracking-widest text-red-400 mb-2">Cons</h4>
                                                        <ul className="space-y-1">
                                                            {selectedTopic.prosCons.cons.map((c, i) => (
                                                                <li key={i} className="text-[11px] text-muted-foreground leading-tight">• {c}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {selectedTopic.mnemonic && (
                                        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 border-dashed relative group">
                                            <div className="absolute -top-3 left-6 px-3 py-1 bg-[#1E293B] border border-primary/20 rounded-lg text-[10px] font-black tracking-widest uppercase text-primary">
                                                Memory Hack / Mnemonic
                                            </div>
                                            <p className="text-lg font-bold text-foreground leading-relaxed italic">
                                                "{selectedTopic.mnemonic}"
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => setSelectedTopic(null)}
                                    className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-2 mt-4"
                                >
                                    Understood <ChevronRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <footer className="mt-32 pb-16 flex flex-col items-center gap-3">
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-6" />
                <p className="text-xs font-mono tracking-[0.4em] uppercase text-muted-foreground animate-pulse">
                    An almahmud_17 project
                </p>
                <div className="flex items-center gap-3 text-[10px] font-bold text-primary/60 tracking-widest uppercase">
                    <Code size={12} />
                    <span>Engineered by torchR</span>
                    <Code size={12} />
                </div>
            </footer>
        </main>
    );
}
