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
    const [newValue, setNewValue] = useState("");

    const handleAddAtPosition = (pos: "begin" | "end" | "random") => {
        const val = newValue === "" ? Math.floor(Math.random() * 99) + 1 : parseInt(newValue);
        let index = 0;
        if (pos === "end") index = nodes.length;
        if (pos === "random") index = Math.floor(Math.random() * (nodes.length + 1));

        const newNodeId = Math.random().toString(36).substr(2, 9);
        const newNode: Node = { id: newNodeId, val, next: null };

        if (nodes.length === 0) {
            if (type === "circular") newNode.next = newNodeId;
            setNodes([newNode]);
            setNewValue("");
            return;
        }

        const newNodes = [...nodes];
        if (index === 0) {
            newNode.next = nodes[0].id;
            if (type === "doubly") newNodes[0].prev = newNodeId;
            if (type === "circular") newNodes[newNodes.length - 1].next = newNodeId;
            setNodes([newNode, ...newNodes]);
        } else if (index >= nodes.length) {
            newNodes[newNodes.length - 1].next = newNodeId;
            if (type === "doubly") newNode.prev = newNodes[newNodes.length - 1].id;
            if (type === "circular") newNode.next = newNodes[0].id;
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
        setNewValue("");
    };

    const handleRemoveAtPosition = (pos: "begin" | "end" | "random") => {
        if (nodes.length === 0) return;
        let targetIdx = 0;
        if (pos === "end") targetIdx = nodes.length - 1;
        if (pos === "random") targetIdx = Math.floor(Math.random() * nodes.length);

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
        }, 500);
    };

    return (
        <main className="min-h-screen pt-20 pb-12 flex flex-col items-center">
            <Navbar />
            <div className="container max-w-7xl flex-1 flex flex-col gap-6 px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">
                            Linked <span className="text-primary">List</span>
                        </h1>
                        <p className="text-muted-foreground text-sm font-medium">
                            Visualize dynamic operations across different structures.
                        </p>
                    </div>

                    <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl overflow-x-auto">
                        {(["singly", "doubly", "circular"] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => { setType(t); setNodes([]); }}
                                className={`px-4 md:px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${type === t ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        <div className="glass-card p-4 flex flex-col gap-4">
                            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest text-center">Controls</span>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={newValue}
                                    onChange={(e) => setNewValue(e.target.value)}
                                    placeholder="Value..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-xs focus:outline-none focus:border-primary/50 transition-colors"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col gap-2">
                                    <span className="text-[8px] font-bold text-muted-foreground text-center">INSERT</span>
                                    <PremiumButton onClick={() => handleAddAtPosition("begin")} className="py-2 text-[9px] font-black uppercase tracking-tighter">At Birth</PremiumButton>
                                    <PremiumButton onClick={() => handleAddAtPosition("end")} className="py-2 text-[9px] font-black uppercase tracking-tighter">At Death</PremiumButton>
                                    <PremiumButton variant="gradient" onClick={() => handleAddAtPosition("random")} className="py-2 text-[9px] font-black uppercase tracking-tighter">Random</PremiumButton>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-[8px] font-bold text-muted-foreground text-center">DELETE</span>
                                    <PremiumButton variant="secondary" onClick={() => handleRemoveAtPosition("begin")} className="py-2 text-[9px] font-black uppercase tracking-tighter">From Head</PremiumButton>
                                    <PremiumButton variant="secondary" onClick={() => handleRemoveAtPosition("end")} className="py-2 text-[9px] font-black uppercase tracking-tighter">From Tail</PremiumButton>
                                    <PremiumButton variant="secondary" onClick={() => handleRemoveAtPosition("random")} className="py-2 text-[9px] font-black uppercase tracking-tighter">Randomly</PremiumButton>
                                </div>
                            </div>

                            <PremiumButton variant="secondary" onClick={() => setNodes([])} className="h-10 text-[9px] font-black uppercase tracking-widest mt-2">
                                <RotateCcw size={12} className="mr-2" /> Clear All
                            </PremiumButton>
                        </div>

                        <div className="hidden lg:block h-[300px]">
                            <CodePanel code={LL_CODES[type]} currentLine={currentLine} />
                        </div>
                    </div>

                    <div className="lg:col-span-8 glass-card min-h-[400px] md:min-h-[550px] p-6 lg:p-12 flex flex-col items-center justify-center relative overflow-hidden bg-slate-950/40">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[15rem] font-black text-white/[0.01] select-none pointer-events-none tracking-tighter uppercase">
                            {type}
                        </div>

                        <div className="w-full flex-1 flex flex-wrap items-center justify-center gap-y-16 gap-x-6 md:gap-x-12 relative overflow-auto custom-scrollbar p-10">
                            <AnimatePresence mode="popLayout">
                                {nodes.map((node, idx) => (
                                    <div key={node.id} className="flex items-center gap-3 md:gap-4 relative">
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                            animate={{
                                                opacity: 1, scale: 1, y: 0,
                                                borderColor: highlightedId === node.id ? "rgba(99, 102, 241, 1)" : "rgba(255, 255, 255, 0.1)",
                                                backgroundColor: highlightedId === node.id ? "rgba(99, 102, 241, 0.2)" : "rgba(30, 41, 59, 0.6)"
                                            }}
                                            exit={{ opacity: 0, scale: 0, y: 50 }}
                                            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl border-2 flex flex-col relative shadow-2xl backdrop-blur-md"
                                        >
                                            <div className="flex-1 flex items-center justify-center font-black text-lg md:text-xl text-foreground">
                                                {node.val}
                                            </div>
                                            {idx === 0 && <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-primary uppercase tracking-[0.2em]">HEAD</div>}
                                            {idx === nodes.length - 1 && <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-accent uppercase tracking-[0.2em]">TAIL</div>}
                                        </motion.div>

                                        {idx < nodes.length - 1 && (
                                            <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} className="flex items-center">
                                                {type === "doubly" ? <ArrowLeftRight className="text-white/20" size={20} /> : <ArrowRight className="text-white/20" size={18} />}
                                            </motion.div>
                                        )}

                                        {type === "circular" && idx === nodes.length - 1 && nodes.length > 1 && (
                                            <div className="absolute top-1/2 left-full -translate-y-1/2 ml-4">
                                                <RotateCcw className="text-primary/30" size={20} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </AnimatePresence>

                            {nodes.length === 0 && (
                                <div className="text-muted-foreground/20 font-mono italic animate-pulse tracking-[0.3em] text-[10px] uppercase text-center">
                                    // EMPTY_LIST_AWAITING_INPUT
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
