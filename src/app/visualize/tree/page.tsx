"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { InputPanel } from "@/components/InputPanel";
import { CodePanel } from "@/components/CodePanel";
import { LogicBreakdown } from "@/components/LogicBreakdown";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { useTheme } from "@/components/Providers";
import { cn } from "@/lib/utils";
import { Play, Search, Trash2 } from "lucide-react";

interface TreeNode {
   id: string;
   val: number;
   left: TreeNode | null;
   right: TreeNode | null;
   x: number;
   y: number;
}

const TREE_ALGORITHM = [
   "Class Node:",
   " Initialize val as given value",
   " Set left and right pointers to Null",
   " ",
   " Function insert(root, val):",
   " If root is Null:",
   "  Return entirely new Node(val)",
   " If val < root.val:",
   "  root.left = insert(root.left, val)",
   " Else:",
   "  root.right = insert(root.right, val)",
   " Return root"
];

export default function TreePage() {
   const [root, setRoot] = useState<TreeNode | null>(null);
   const [currentLine, setCurrentLine] = useState(-1);
   const [highlightedId, setHighlightedId] = useState<string | null>(null);
   const [speed, setSpeed] = useState(50);
   const [classification, setClassification] = useState<string[]>([]);
   const { theme } = useTheme();
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
                  backgroundColor: highlightedId === node.id
                     ? "rgba(99, 102, 241, 0.6)"
                     : theme === 'dark' ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.9)",
                  borderColor: highlightedId === node.id
                     ? "rgba(99, 102, 241, 1)"
                     : theme === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
               }}
               style={{
                  position: "absolute",
                  left: `calc(50% + ${node.x}px)`,
                  top: `${node.y}px`,
                  transform: "translateX(-50%)"
               }}
               className={cn(
                  "w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center font-black text-xs md:text-sm shadow-xl z-20 backdrop-blur-md transition-shadow",
                  highlightedId === node.id ? "shadow-[0_0_20px_rgba(99,102,241,0.5)]" : "shadow-lg",
                  theme === 'dark' ? "text-white" : "text-slate-900"
               )}
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
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
               <div className="flex flex-col gap-2">
                  <h1 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight">
                     BST <span className="text-primary italic">Visualizer</span>
                  </h1>
                  <p className="text-muted-foreground text-lg font-semibold tracking-wide border-l-4 border-primary/30 pl-4 py-1">
                     Binary Search Tree with real-time classification & traversals.
                  </p>
               </div>

               <div className="flex flex-col items-center md:items-end gap-4">
                  <div className="flex flex-wrap gap-2">
                     {classification.map((cls, i) => (
                        <span key={i} className="px-4 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-[10px] font-black text-primary uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                           {cls}
                        </span>
                     ))}
                  </div>
                  <div className="flex gap-6 px-4 py-2 bg-black/20 [.light_&]:bg-black/5 border border-white/10 [.light_&]:border-black/5 rounded-2xl backdrop-blur-sm">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                        <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Normal</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                        <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Active</span>
                     </div>
                     <div className="flex items-center gap-2 border-l border-white/5 [.light_&]:border-black/5 pl-4">
                        <div className="w-4 h-1 bg-primary/40 rounded-full"></div>
                        <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Edges</span>
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
                     <span className="text-sm font-black uppercase text-muted-foreground tracking-widest">Traversals</span>
                     <div className="grid grid-cols-3 gap-2">
                        {(["in", "pre", "post"] as const).map(t => (
                           <PremiumButton className="h-14 px-8 text-base font-black py-2 text-sm font-bold uppercase tracking-widest" key={t} onClick={() => handleTraversal(t)} variant="secondary">
                              {t}order
                           </PremiumButton>
                        ))}
                     </div>
                  </div>


               </div>

               <div className="lg:col-span-8 glass-card min-h-[400px] md:min-h-[550px] p-4 flex flex-col items-center relative overflow-hidden bg-black/20 [.light_&]:bg-black/5">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[15rem] font-black text-white/[0.03] [.light_&]:text-black/[0.03] select-none pointer-events-none uppercase">
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

            {/* New Section for Logic and Code */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 h-auto lg:h-[550px] mb-12">
               <div className="h-[500px] lg:h-full">
                  <LogicBreakdown steps={[
                     { title: 'Insert', text: 'Start at root. If value is less than current node, go left. Else, go right. Insert as leaf.' },
                     { title: 'Search', text: 'Traverse left or right comparing with target, similar to a binary search.' },
                     { title: 'Traversal', text: 'Visit nodes recursively in Inorder (Left-Root-Right), Preorder, or Postorder.' }
                  ]} complexity={'O(log n) avg'} />
               </div>
               <div className="h-[500px] lg:h-full">
                  <CodePanel algorithm={TREE_ALGORITHM} currentLine={currentLine} />
               </div>
            </div>
         </div>
      </main>
   );
}
