"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { InputPanel } from "@/components/InputPanel";
import { CodePanel } from "@/components/CodePanel";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { ArrowRight, ArrowLeftRight, RotateCcw, Box } from "lucide-react";

interface Node {
    id: string;
    val: number;
    next: string | null;
    prev?: string | null;
}

type LLType = "singly" | "doubly" | "circular";

const LL_CODES: Record<LLType, { python: string[], cpp: string[] }> = {
    singly: {
        python: [
            "class Node:",
            "  def __init__(self, val):",
            "    self.val = val",
            "    self.next = None",
            "",
            "def insert_at_head(head, val):",
            "  new_node = Node(val)",
            "  new_node.next = head",
            "  return new_node"
        ],
        cpp: [
            "struct Node {",
            "  int val; Node* next;",
            "  Node(int v) : val(v), next(nullptr) {}",
            "};",
            "",
            "Node* insertAtHead(Node* head, int val) {",
            "  Node* newNode = new Node(val);",
            "  newNode->next = head;",
            "  return newNode;",
            "}"
        ]
    },
    doubly: {
        python: [
            "class Node:",
            "  def __init__(self, val):",
            "    self.val = val",
            "    self.next = self.prev = None",
            "",
            "def insert_at_head(head, val):",
            "  new_node = Node(val)",
            "  if head:",
            "    new_node.next = head",
            "    head.prev = new_node",
            "  return new_node"
        ],
        cpp: [
            "struct Node {",
            "  int val; Node *next, *prev;",
            "  Node(int v) : val(v), next(nullptr), prev(nullptr) {}",
            "};",
            "",
            "Node* insertAtHead(Node* head, int val) {",
            "  Node* newNode = new Node(val);",
            "  if (head) { newNode->next = head; head->prev = newNode; }",
            "  return newNode;",
            "}"
        ]
    },
    circular: {
        python: [
            "class Node:",
            "  def __init__(self, val):",
            "    self.val = val",
            "    self.next = None",
            "",
            "def insert_at_end(last, val):",
            "  new_node = Node(val)",
            "  if not last: new_node.next = new_node; return new_node",
            "  new_node.next = last.next",
            "  last.next = new_node",
            "  return new_node"
        ],
        cpp: [
            "struct Node {",
            "  int val; Node* next;",
            "  Node(int v) : val(v), next(nullptr) {}",
            "};",
            "",
            "Node* insertAtEnd(Node* last, int val) {",
            "  if (!last) { Node* t = new Node(val); t->next = t; return t; }",
            "  Node* temp = new Node(val);",
            "  temp->next = last->next; last->next = temp;",
            "  return temp;",
            "}"
        ]
    }
};

export default function LinkedListPage() {
    const [type, setType] = useState<LLType>("singly");
    const [nodes, setNodes] = useState<Node[]>([]);
    const [currentLine, setCurrentLine] = useState(-1);
    const [highlightedId, setHighlightedId] = useState<string | null>(null);
    const [speed, setSpeed] = useState(50);

    const handleAdd = (val: number, index?: number) => {
        const newNodeId = Math.random().toString(36).substr(2, 9);
        const newNode: Node = { id: newNodeId, val, next: null };

        if (nodes.length === 0) {
            if (type === "circular") newNode.next = newNodeId;
            setNodes([newNode]);
            return;
        }

        if (type === "circular") {
            const newNodes = [...nodes];
            if (index === 0 || index === undefined) {
                newNode.next = nodes[0].id;
                newNodes[newNodes.length - 1].next = newNodeId;
                setNodes([newNode, ...newNodes]);
            } else if (index >= nodes.length) {
                newNodes[newNodes.length - 1].next = newNodeId;
                newNode.next = newNodes[0].id;
                setNodes([...newNodes, newNode]);
            } else {
                newNodes[index - 1].next = newNodeId;
                newNode.next = nodes[index].id;
                setNodes([...newNodes.slice(0, index), newNode, ...newNodes.slice(index)]);
            }
            return;
        }

        const newNodes = [...nodes];
        if (index === 0 || index === undefined) {
            newNode.next = nodes[0].id;
            if (type === "doubly") newNodes[0].prev = newNodeId;
            setNodes([newNode, ...newNodes]);
        } else if (index >= nodes.length) {
            newNodes[newNodes.length - 1].next = newNodeId;
            if (type === "doubly") newNode.prev = newNodes[newNodes.length - 1].id;
            setNodes([...newNodes, newNode]);
        } else {
            newNodes[index - 1].next = newNodeId;
            newNode.next = nodes[index].id;
            if (type === "doubly") {
                newNode.prev = newNodes[index - 1].id;
                newNodes[index].prev = newNodeId;
            }
            setNodes([...newNodes.slice(0, index), newNode, ...newNodes.slice(index)]);
        }
    };

    const handleAddRandom = () => {
        const val = Math.floor(Math.random() * 99) + 1;
        const index = nodes.length > 0 ? Math.floor(Math.random() * (nodes.length + 1)) : 0;
        handleAdd(val, index);
    };

    const handleRemove = (val?: number) => {
        if (nodes.length === 0 || val === undefined) return;
        const targetIdx = nodes.findIndex(n => n.val === val);
        if (targetIdx === -1) return;

        setHighlightedId(nodes[targetIdx].id);
        setTimeout(() => {
            if (nodes.length === 1) {
                setNodes([]);
            } else {
                const newNodes = [...nodes];
                if (targetIdx === 0) {
                    if (type === "circular") newNodes[newNodes.length - 1].next = newNodes[1].id;
                    if (type === "doubly") newNodes[1].prev = null;
                    setNodes(newNodes.slice(1));
                } else if (targetIdx === nodes.length - 1) {
                    newNodes[targetIdx - 1].next = type === "circular" ? newNodes[0].id : null;
                    setNodes(newNodes.slice(0, -1));
                } else {
                    newNodes[targetIdx - 1].next = newNodes[targetIdx + 1].id;
                    if (type === "doubly") newNodes[targetIdx + 1].prev = newNodes[targetIdx - 1].id;
                    setNodes(newNodes.filter((_, i) => i !== targetIdx));
                }
            }
            setHighlightedId(null);
        }, 800);
    };

    return (
        <main className="min-h-screen pt-24 pb-12 flex flex-col items-center">
            <Navbar />
            <div className="container max-w-7xl flex-1 flex flex-col gap-8 px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-black text-foreground uppercase tracking-tighter">
                            Linked <span className="text-primary font-bold">List</span>
                        </h1>
                        <p className="text-muted-foreground text-lg font-medium">
                            Visualize dynamic operations across different linked structures.
                        </p>
                    </div>

                    <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl">
                        {(["singly", "doubly", "circular"] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => { setType(t); setNodes([]); }}
                                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${type === t ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
                        <InputPanel onAdd={handleAdd} onRemove={handleRemove} showIndex label="Node Value" />

                        <div className="grid grid-cols-1 gap-3 px-1">
                            <PremiumButton variant="gradient" onClick={handleAddRandom} className="h-12 text-[10px] font-black uppercase tracking-widest">
                                <Box size={14} className="mr-2" /> Insert Random Position
                            </PremiumButton>
                        </div>

                        <div className="h-[400px]">
                            <CodePanel code={LL_CODES[type]} currentLine={currentLine} />
                        </div>
                    </div>

                    <div className="lg:col-span-8 glass-card min-h-[550px] p-12 order-1 lg:order-2 flex flex-wrap items-center justify-center gap-y-24 gap-x-12 relative overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter uppercase font-serif">
                            {type}
                        </div>

                        <AnimatePresence mode="popLayout">
                            {nodes.map((node, idx) => (
                                <div key={node.id} className="flex items-center gap-4 relative">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{
                                            opacity: 1, scale: 1,
                                            borderColor: highlightedId === node.id ? "rgba(99, 102, 241, 1)" : "rgba(255, 255, 255, 0.1)",
                                            backgroundColor: highlightedId === node.id ? "rgba(99, 102, 241, 0.2)" : "rgba(30, 41, 59, 0.5)"
                                        }}
                                        exit={{ opacity: 0, scale: 0, y: 50 }}
                                        className="w-24 h-24 rounded-3xl border-2 flex flex-col relative shadow-2xl group overflow-hidden"
                                    >
                                        {type === "doubly" && <div className="h-5 bg-white/5 border-b border-white/10 flex items-center justify-center text-[7px] font-black opacity-30">PREV</div>}
                                        <div className="flex-1 flex items-center justify-center font-black text-2xl text-foreground">
                                            {node.val}
                                        </div>
                                        <div className="h-6 bg-white/5 border-t border-white/10 flex items-center justify-center text-[8px] font-black opacity-30">NEXT</div>
                                        {idx === 0 && <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-black text-primary uppercase">HEAD</div>}
                                    </motion.div>

                                    {idx < nodes.length - 1 && (
                                        <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 32 }} className="flex items-center">
                                            {type === "doubly" ? <ArrowLeftRight className="text-white/20" size={28} /> : <ArrowRight className="text-white/20" size={24} />}
                                        </motion.div>
                                    )}

                                    {type === "circular" && idx === nodes.length - 1 && nodes.length > 1 && (
                                        <svg className="absolute top-1/2 left-full w-24 h-48 -translate-y-1/2 pointer-events-none opacity-20" viewBox="0 0 100 200">
                                            <path d="M 0 100 Q 150 100 150 -100 Q 150 -300 -400 -300" fill="none" stroke="rgba(99, 102, 241, 0.8)" strokeWidth="4" strokeDasharray="8 8" />
                                        </svg>
                                    )}
                                </div>
                            ))}
                        </AnimatePresence>

                        {nodes.length === 0 && (
                            <div className="text-muted-foreground/30 font-mono italic animate-pulse tracking-widest text-sm uppercase">
                                // INITIALIZE_LIST
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
