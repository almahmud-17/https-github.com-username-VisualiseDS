"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { InputPanel } from "@/components/InputPanel";
import { CodePanel } from "@/components/CodePanel";
import { LogicBreakdown } from "@/components/LogicBreakdown";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowLeftRight, RotateCcw, Box } from "lucide-react";

interface Node {
   id: string;
   val: number;
   next: string | null;
   prev?: string | null;
}

type LLType = "singly" | "doubly" | "circular";

const LL_ALGORITHMS: Record<LLType, string[]> = {
   singly: [
      "Class Node:",
      " Initialize val as given value",
      " Set next pointer to Null",
      " ",
      " Function insert_at_head(head, val):",
      " new_node = Node(val)",
      " new_node.next = head",
      " Return new_node as new head"
   ],
   doubly: [
      "Class Node:",
      " Initialize val as given value",
      " Set next and prev pointers to Null",
      " ",
      " Function insert_at_head(head, val):",
      " new_node = Node(val)",
      " If head is not Null:",
      "  new_node.next = head",
      "  head.prev = new_node",
      " Return new_node as new head"
   ],
   circular: [
      "Class Node:",
      " Initialize val as given value",
      " Set next pointer to Null",
      " ",
      " Function insert_at_end(last, val):",
      " new_node = Node(val)",
      " If last is Null:",
      "  new_node.next = new_node",
      "  Return new_node",
      " new_node.next = last.next",
      " last.next = new_node",
      " Return new_node as new last"
   ]
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
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
               <div className="flex flex-col gap-2">
                  <h1 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight">
                     Linked <span className="text-primary italic">List</span>
                  </h1>
                  <p className="text-muted-foreground text-lg font-semibold tracking-wide border-l-4 border-primary/30 pl-4 py-1">
                     Visualize dynamic operations across different structures.
                  </p>
               </div>

               <div className="liquid-selector gap-1 rounded-full">
                  {(["singly", "doubly", "circular"] as const).map((t) => (
                     <button
                        key={t}
                        onClick={() => { setType(t); setNodes([]); }}
                        className={cn(
                           "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap",
                           type === t ? "liquid-selector-item-active" : "text-muted-foreground [.light_&]:text-black/40 hover:text-foreground hover:bg-white/5"
                        )}
                     >
                        {t}
                     </button>
                  ))}
               </div>
               <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-sm text-muted-foreground uppercase font-mono tracking-widest bg-white/5 [.light_&]:bg-black/5 border border-white/10 px-2 py-1 rounded-md">
                     <span className="text-white/40">ADDR:</span> 0x1A2B
                  </span>
                  <span className="text-sm text-primary uppercase font-mono tracking-widest bg-primary/10 border border-primary/20 px-2 py-1 rounded-md">
                     <span className="text-primary/50">NEXT:</span> 0x3C4D
                  </span>
                  {type === "doubly" && (
                     <span className="text-sm text-cyan-500 [.light_&]:text-purple-600 uppercase font-mono tracking-widest bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 rounded-md">
                        <span className="text-cyan-500 [.light_&]:text-purple-600/50">PREV:</span> 0x5E6F
                     </span>
                  )}
                  <span className="text-sm text-accent uppercase font-mono tracking-widest bg-accent/10 border border-accent/20 px-2 py-1 rounded-md">
                     NULL
                  </span>
               </div>
            </div>

            <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-6">
               <div className="lg:col-span-4 flex flex-col gap-4">
                  <div className="glass-card p-4 flex flex-col gap-4">
                     <span className="text-sm font-black uppercase text-muted-foreground tracking-widest text-center">Controls</span>
                     <div className="flex gap-2">
                        <input
                           type="number"
                           value={newValue}
                           onChange={(e) => setNewValue(e.target.value)}
                           placeholder="Value..."
                           className="flex-1 bg-white/5 [.light_&]:bg-black/5 border border-white/10 rounded-xl px-4 text-xs focus:outline-none focus:border-primary/50 transition-colors"
                        />
                     </div>

                     <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-2">
                           <span className="text-xs font-bold text-muted-foreground text-center">INSERT</span>
                           <PremiumButton className="h-14 px-8 text-base font-black py-2 text-sm uppercase tracking-tighter" onClick={() => handleAddAtPosition("begin")}>At Birth</PremiumButton>
                           <PremiumButton className="h-14 px-8 text-base font-black py-2 text-sm uppercase tracking-tighter" onClick={() => handleAddAtPosition("end")}>At Death</PremiumButton>
                           <PremiumButton className="h-14 px-8 text-base font-black py-2 text-sm uppercase tracking-tighter" variant="gradient" onClick={() => handleAddAtPosition("random")}>Random</PremiumButton>
                        </div>
                        <div className="flex flex-col gap-2">
                           <span className="text-xs font-bold text-muted-foreground text-center">DELETE</span>
                           <PremiumButton className="h-14 px-8 text-base font-black py-2 text-sm uppercase tracking-tighter" variant="secondary" onClick={() => handleRemoveAtPosition("begin")}>From Head</PremiumButton>
                           <PremiumButton className="h-14 px-8 text-base font-black py-2 text-sm uppercase tracking-tighter" variant="secondary" onClick={() => handleRemoveAtPosition("end")}>From Tail</PremiumButton>
                           <PremiumButton className="h-14 px-8 text-base font-black py-2 text-sm uppercase tracking-tighter" variant="secondary" onClick={() => handleRemoveAtPosition("random")}>Randomly</PremiumButton>
                        </div>
                     </div>

                     <PremiumButton className="h-14 px-8 text-base font-black text-sm uppercase tracking-widest mt-2" variant="secondary" onClick={() => setNodes([])}>
                        <RotateCcw size={12} className="mr-2" /> Clear All
                     </PremiumButton>
                  </div>


               </div>

               <div className="lg:col-span-8 glass-card min-h-[400px] md:min-h-[550px] p-6 lg:p-12 flex flex-col items-center justify-center relative overflow-hidden bg-slate-950/40 [.light_&]:!bg-black/5">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[15rem] font-black text-white/[0.03] [.light_&]:!text-black/[0.02] select-none pointer-events-none tracking-tighter uppercase">
                     {type}
                  </div>

                  <div className="w-full flex-1 flex flex-wrap items-center justify-center gap-y-16 gap-x-6 md:gap-x-12 relative overflow-auto custom-scrollbar p-10 pt-16">
                     <AnimatePresence mode="popLayout">
                        {nodes.map((node, idx) => (
                           <div key={node.id} className="flex items-center gap-3 md:gap-4 relative">
                              <motion.div
                                 layout
                                 initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                 animate={{ opacity: 1, scale: 1, y: 0 }}
                                 exit={{ opacity: 0, scale: 0, y: 50 }}
                                 className={cn("rounded-xl transition-colors duration-300 flex flex-row items-stretch border-2 relative shadow-2xl backdrop-blur-md overflow-hidden min-w-[6rem] md:min-w-[8rem] h-16 md:h-20", highlightedId === node.id ? "border-primary bg-primary/20 [.light_&]:liquid-node-active" : "border-white/10 bg-slate-800/60 [.light_&]:liquid-node")}
                              >
                                 {/* Previous Pointer Section */}
                                 {type === "doubly" && (
                                    <div className="w-10 md:w-14 border-r border-white/10 flex flex-col items-center justify-center p-1 bg-white/5 [.light_&]:bg-black/5">
                                       <span className="text-[6px] md:text-xs opacity-50 font-mono tracking-widest">PREV</span>
                                       <span className="text-[7px] md:text-sm font-mono text-cyan-500 [.light_&]:text-purple-600 mt-1">
                                          {node.prev ? `0x${node.prev.substring(0, 4)}` : 'NULL'}
                                       </span>
                                    </div>
                                 )}

                                 {/* Value Section */}
                                 <div className="flex-1 flex flex-col items-center justify-center p-2 relative">
                                    <span className="text-[6px] md:text-xs opacity-40 uppercase absolute top-1 font-mono tracking-widest">VAL</span>
                                    <div className="font-black text-lg md:text-2xl text-foreground [.light_&]:!text-black">
                                       {node.val}
                                    </div>
                                 </div>

                                 {/* Next Pointer Section */}
                                 <div className="w-10 md:w-14 border-l border-white/10 flex flex-col items-center justify-center p-1 bg-primary/10">
                                    <span className="text-[6px] md:text-xs opacity-50 text-primary font-mono tracking-widest">NEXT</span>
                                    <span className="text-[7px] md:text-sm font-mono text-primary mt-1">
                                       {node.next ? `0x${node.next.substring(0, 4)}` : 'NULL'}
                                    </span>
                                 </div>

                                 {/* Annotations */}
                                 {idx === 0 && <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-black text-primary uppercase tracking-[0.2em]">HEAD</div>}
                                 {idx === nodes.length - 1 && <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-black text-accent uppercase tracking-[0.2em]">TAIL</div>}
                              </motion.div>

                              {/* Node Address Below */}
                              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm md:text-sm font-mono text-muted-foreground opacity-70">
                                 0x{node.id.substring(0, 4)}
                              </div>

                              {/* Arrows */}
                              {idx < nodes.length - 1 && (
                                 <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} className="flex items-center my-auto">
                                    {type === "doubly" ? <ArrowLeftRight className="text-white/30 [.light_&]:text-[#94A3B8]" size={24} /> : <ArrowRight className="text-white/30 [.light_&]:text-[#94A3B8]" size={22} />}
                                 </motion.div>
                              )}

                              {/* Circular Pointer */}
                              {type === "circular" && idx === nodes.length - 1 && nodes.length > 1 && (
                                 <div className="absolute top-1/2 left-full -translate-y-1/2 ml-4">
                                    <RotateCcw className="text-primary/40 animate-spin-slow" size={24} />
                                 </div>
                              )}
                           </div>
                        ))}
                     </AnimatePresence>

                     {nodes.length === 0 && (
                        <div className="text-muted-foreground/20 font-mono italic animate-pulse tracking-[0.3em] text-sm uppercase text-center">
         // EMPTY_LIST_AWAITING_INPUT
                        </div>
                     )}
                  </div>
               </div>
            </div>

            {/* New Section for Logic and Code */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 h-auto lg:h-[550px] mb-12">
               <div className="h-[500px] lg:h-full">
                  <LogicBreakdown steps={[
                     { title: 'Node Creation', text: 'Allocate memory for a new node and assign its value.' },
                     { title: 'Insertion', text: 'Update the new node\'s pointers to point to neighbors, then update neighbors.' },
                     { title: 'Deletion', text: 'Update neighbors\' pointers to bypass the target node, then deallocate its memory.' }
                  ]} complexity={'O(1) head, O(n) search'} />
               </div>
               <div className="h-[500px] lg:h-full">
                  <CodePanel algorithm={LL_ALGORITHMS[type]} currentLine={currentLine} />
               </div>
            </div>
         </div>
      </main>
   );
}
