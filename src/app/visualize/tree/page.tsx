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
                setCurrentLine(7);
                return { ...newNodeData, x: 0, y: 0 };
            }
            setHighlightedId(curr.id);
            if (val < curr.val) {
                setCurrentLine(9);
                return { ...curr, left: insertNode(curr.left || null) };
            } else {
                setCurrentLine(11);
                return { ...curr, right: insertNode(curr.right || null) };
            }
        };

        setCurrentLine(6);
        const newTree = insertNode(root);
        setRoot(calculatePositions(newTree, 0, 40, 160));
        setTimeout(() => {
            setHighlightedId(null);
            setCurrentLine(-1);
        }, 1000);
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

    const renderNodes = (node: TreeNode | null) => {
        if (!node) return null;
        return (
            <div key={node.id} className="relative">
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            backgroundColor: highlightedId === node.id ? "rgba(99, 102, 241, 0.4)" : "rgba(30, 41, 59, 0.6)",
                            borderColor: highlightedId === node.id ? "rgba(99, 102, 241, 1)" : "rgba(255, 255, 255, 0.1)"
                        }}
                        style={{
                            position: "absolute",
                            left: `calc(50% + ${node.x}px)`,
                            top: `${node.y}px`,
                            transform: "translateX(-50%)"
                        }}
                        className="w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm shadow-xl z-20 backdrop-blur-sm"
                    >
                        {node.val}
                    </motion.div>
                </AnimatePresence>

                {node.left && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                        <line
                            x1={`calc(50% + ${node.x}px)`}
                            y1={`${node.y + 40}px`}
                            x2={`calc(50% + ${node.left.x}px)`}
                            y2={`${node.left.y}px`}
                            stroke="white"
                            strokeOpacity="0.1"
                            strokeWidth="2"
                        />
                    </svg>
                )}
                {node.right && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                        <line
                            x1={`calc(50% + ${node.x}px)`}
                            y1={`${node.y + 40}px`}
                            x2={`calc(50% + ${node.right.x}px)`}
                            y2={`${node.right.y}px`}
                            stroke="white"
                            strokeOpacity="0.1"
                            strokeWidth="2"
                        />
                    </svg>
                )}
                {renderNodes(node.left)}
                {renderNodes(node.right)}
            </div>
        );
    };

    return (
        <main className="min-h-screen pt-24 pb-12 flex flex-col items-center">
            <Navbar />

            <div className="container max-w-7xl flex-1 flex flex-col gap-8 px-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">
                        BST Visualizer
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Binary Search Tree operations with C++ and Python implementation.
                    </p>
                </div>

                <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
                        <InputPanel
                            onAdd={handleAdd}
                            onRemove={() => { }}
                            onClear={() => setRoot(null)}
                            label="Node Value"
                        />

                        <div className="grid grid-cols-1 gap-3">
                            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                                <PremiumButton onClick={() => handleTraversal("in")} variant="secondary" className="whitespace-nowrap px-4 py-2 text-xs">
                                    Inorder
                                </PremiumButton>
                                <PremiumButton onClick={() => handleTraversal("pre")} variant="secondary" className="whitespace-nowrap px-4 py-2 text-xs">
                                    Preorder
                                </PremiumButton>
                                <PremiumButton onClick={() => handleTraversal("post")} variant="secondary" className="whitespace-nowrap px-4 py-2 text-xs">
                                    Postorder
                                </PremiumButton>
                            </div>
                        </div>

                        <div className="h-[400px]">
                            <CodePanel code={TREE_CODE} currentLine={currentLine} />
                        </div>
                    </div>

                    <div className="lg:col-span-8 glass-card min-h-[550px] p-8 order-1 lg:order-2 relative overflow-hidden flex flex-col items-center">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black text-white/[0.02] select-none pointer-events-none">
                            TREE
                        </div>

                        <div className="w-full h-full relative">
                            {renderNodes(root)}
                            {!root && (
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 italic font-mono">
                                    {`// EMPTY_TREE`}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
