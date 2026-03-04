"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { InputPanel } from "@/components/InputPanel";
import { CodePanel } from "@/components/CodePanel";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { Play, Search, Trash2 } from "lucide-react";

interface TreeNode {
    id: string;
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    x: number;
    y: number;
}

const TREE_CODE = {
    python: [
        "class Node:",
        "  def __init__(self, val):",
        "    self.val = val",
        "    self.left = None",
        "    self.right = None",
        "",
        "def insert(root, val):",
        "  if not root: return Node(val)",
        "  if val < root.val:",
        "    root.left = insert(root.left, val)",
        "  else:",
        "    root.right = insert(root.right, val)",
        "  return root"
    ],
    cpp: [
        "struct Node {",
        "  int val;",
        "  Node *left, *right;",
        "  Node(int v) : val(v), left(nullptr), right(nullptr) {}",
        "};",
        "",
        "Node* insert(Node* root, int val) {",
        "  if (!root) return new Node(val);",
        "  if (val < root->val)",
        "    root->left = insert(root->left, val);",
        "  else",
        "    root->right = insert(root->right, val);",
        "  return root;",
        "}"
    ]
};

export default function TreePage() {
    const [root, setRoot] = useState<TreeNode | null>(null);
    const [currentLine, setCurrentLine] = useState(-1);
    const [highlightedId, setHighlightedId] = useState<string | null>(null);
    const [speed, setSpeed] = useState(50);
    const [classification, setClassification] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const checkClassification = (curr: TreeNode | null) => {
        if (!curr) return [];
        const classes = ["Binary Search Tree"];

        const isFull = (node: TreeNode | null): boolean => {
            if (!node) return true;
            if (!node.left && !node.right) return true;
            if (node.left && node.right) return isFull(node.left) && isFull(node.right);
            return false;
        };

        const getHeight = (node: TreeNode | null): number => {
            if (!node) return 0;
            return 1 + Math.max(getHeight(node.left), getHeight(node.right));
        };

        const isBalanced = (node: TreeNode | null): boolean => {
            if (!node) return true;
            const lh = getHeight(node.left);
            const rh = getHeight(node.right);
            return Math.abs(lh - rh) <= 1 && isBalanced(node.left) && isBalanced(node.right);
        };

        if (isFull(curr)) classes.push("Full Binary Tree");
        if (isBalanced(curr)) classes.push("Balanced Tree");

        return classes;
    };

    const calculatePositions = (node: TreeNode | null, x: number, y: number, offset: number): TreeNode | null => {
        if (!node) return null;
        return {
            ...node,
            x,
            y,
            left: calculatePositions(node.left, x - offset, y + 80, offset / 2),
            right: calculatePositions(node.right, x + offset, y + 80, offset / 2),
        };
    };

    const handleAdd = (val: number) => {
        const newNodeData = {
            id: Math.random().toString(36).substr(2, 9),
            val,
            left: null,
            right: null,
        };

        const insertNode = (curr: TreeNode | null): TreeNode => {
            if (!curr) {
                return { ...newNodeData, x: 0, y: 0 };
            }
            if (val < curr.val) {
                return { ...curr, left: insertNode(curr.left || null) };
            } else {
                return { ...curr, right: insertNode(curr.right || null) };
            }
        };

        const newTree = insertNode(root);
        const positionedTree = calculatePositions(newTree, 0, 40, 160);
        setRoot(positionedTree);
        setClassification(checkClassification(positionedTree));

        setHighlightedId(newNodeData.id);
        setTimeout(() => setHighlightedId(null), 1000);
    };

    const handleTraversal = async (type: "in" | "pre" | "post") => {
        const path: string[] = [];
        const traverse = (node: TreeNode | null) => {
            if (!node) return;
            if (type === "pre") path.push(node.id);
            traverse(node.left);
            if (type === "in") path.push(node.id);
            traverse(node.right);
            if (type === "post") path.push(node.id);
        };

        traverse(root);
        for (const id of path) {
            setHighlightedId(id);
            await new Promise(r => setTimeout(r, (101 - speed) * 10));
        }
        setHighlightedId(null);
    };

    const renderConnections = (node: TreeNode | null): React.ReactNode => {
        if (!node) return null;
        return (
            <>
                {node.left && (
                    <line
                        x1={node.x}
                        y1={node.y + 24}
                        x2={node.left.x}
                        y2={node.left.y + 24}
                        stroke="#6366f1"
                        strokeWidth="3"
                        strokeOpacity="0.8"
                        className="transition-all duration-500"
                    />
                )}
                {node.right && (
                    <line
                        x1={node.x}
                        y1={node.y + 24}
                        x2={node.right.x}
                        y2={node.right.y + 24}
                        stroke="#6366f1"
                        strokeWidth="3"
                        strokeOpacity="0.8"
                        className="transition-all duration-500"
                    />
                )}
                {renderConnections(node.left)}
                {renderConnections(node.right)}
            </>
        );
    };

    const renderNodes = (node: TreeNode | null) => {
        if (!node) return null;
        return (
            <div key={node.id}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{
                        scale: 1,
                        backgroundColor: highlightedId === node.id ? "rgba(99, 102, 241, 0.6)" : "rgba(30, 41, 59, 0.8)",
                        borderColor: highlightedId === node.id ? "rgba(99, 102, 241, 1)" : "rgba(255, 255, 255, 0.1)"
                    }}
                    style={{
                        position: "absolute",
                        left: `calc(50% + ${node.x}px)`,
                        top: `${node.y}px`,
                        transform: "translateX(-50%)"
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center font-bold text-xs md:text-sm shadow-xl z-20 backdrop-blur-md"
                >
                    {node.val}
                </motion.div>
                {renderNodes(node.left)}
                {renderNodes(node.right)}
            </div>
        );
    };

    return (
        <main className="min-h-screen pt-20 pb-12 flex flex-col items-center">
            <Navbar />

            <div className="container max-w-7xl flex-1 flex flex-col gap-6 px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">
                            BST <span className="text-primary">Visualizer</span>
                        </h1>
                        <p className="text-muted-foreground text-sm font-medium">
                            Binary Search Tree with real-time classification & traversals.
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <div className="flex flex-wrap gap-2">
                            {classification.map((cls, i) => (
                                <span key={i} className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">
                                    {cls}
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-slate-800 border-2 border-white/10"></div>
                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Normal</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-indigo-500/60 border-2 border-indigo-500"></div>
                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Active/Checking</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-1 bg-indigo-500 rounded-full"></div>
                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Connection</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        <InputPanel
                            onAdd={handleAdd}
                            onRemove={() => { }}
                            onClear={() => { setRoot(null); setClassification([]); }}
                            label="Value"
                        />

                        <div className="glass-card p-4 flex flex-col gap-4">
                            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Traversals</span>
                            <div className="grid grid-cols-3 gap-2">
                                {(["in", "pre", "post"] as const).map(t => (
                                    <PremiumButton key={t} onClick={() => handleTraversal(t)} variant="secondary" className="py-2 text-[10px] font-bold uppercase tracking-widest">
                                        {t}order
                                    </PremiumButton>
                                ))}
                            </div>
                        </div>

                        <div className="hidden lg:block h-[300px]">
                            <CodePanel code={TREE_CODE} currentLine={currentLine} />
                        </div>
                    </div>

                    <div className="lg:col-span-8 glass-card min-h-[400px] md:min-h-[550px] p-4 flex flex-col items-center relative overflow-hidden bg-slate-950/40">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[15rem] font-black text-white/[0.01] select-none pointer-events-none">
                            TREE
                        </div>

                        <div className="w-full h-full relative overflow-auto custom-scrollbar">
                            <div className="min-w-[600px] min-h-[500px] relative">
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ overflow: 'visible' }}>
                                    <g style={{ transform: "translateX(50%)" }}>
                                        {renderConnections(root)}
                                    </g>
                                </svg>
                                {renderNodes(root)}
                                {!root && (
                                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 italic font-mono text-xs uppercase tracking-[0.3em]">
                                        // AWAITING_INPUT
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
