"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { InputPanel } from "@/components/InputPanel";
import { CodePanel } from "@/components/CodePanel";
import { LogicBreakdown } from "@/components/LogicBreakdown";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { useTheme } from "@/components/Providers";
import { cn } from "@/lib/utils";

interface TreeNode {
   id: string;
   val: number;
   left: TreeNode | null;
   right: TreeNode | null;
   x: number;
   y: number;
   height?: number;
}

const TREE_TYPES = ['BST', 'AVL', 'MaxHeap', 'MinHeap', 'BT'] as const;
type TreeType = typeof TREE_TYPES[number];

const TREE_ALGORITHMS = {
   BST: [
      "Class Node:",
      " Initialize val as given value, left/right as Null",
      " ",
      " Function insert(root, val):",
      " If root is Null:",
      "  Return Node(val)",
      " If val < root.val:",
      "  root.left = insert(root.left, val)",
      " Else:",
      "  root.right = insert(root.right, val)",
      " Return root"
   ],
   AVL: [
      "Function insert(root, val):",
      "  Perform normal BST insert",
      "  Update height of current root",
      "  Get balance factor (height(left) - height(right))",
      "  If balance > 1 & val < left.val: Right Rotate",
      "  If balance < -1 & val >= right.val: Left Rotate",
      "  If balance > 1 & val >= left.val: Left-Right Rotate",
      "  If balance < -1 & val < right.val: Right-Left Rotate",
      "  Return root"
   ],
   MaxHeap: [
      "Function insert(val):",
      " Add val to the end of array",
      " Bubble Up:",
      "  Let i = last index",
      "  While array[parent(i)] < array[i]:",
      "   Swap array[parent(i)] and array[i]",
      "   i = parent(i)"
   ],
   MinHeap: [
      "Function insert(val):",
      " Add val to the end of array",
      " Bubble Up:",
      "  Let i = last index",
      "  While array[parent(i)] > array[i]:",
      "   Swap array[parent(i)] and array[i]",
      "   i = parent(i)"
   ],
   BT: [
      "Function insert(root, val):",
      " Do Level Order Traversal (Queue)",
      " Find first node missing left or right child",
      " Insert as that child"
   ]
};

const LOGIC_BREAKDOWNS = {
   BST: {
      steps: [
         { title: 'Insert', text: 'Start at root. If value is less than current node, go left. Else, go right. Insert as leaf.' },
         { title: 'Search', text: 'Traverse left or right comparing with target, similar to a binary search.' },
         { title: 'Traversal', text: 'Visit nodes recursively in Inorder, Preorder, or Postorder.' }
      ],
      complexity: 'O(log n) avg'
   },
   AVL: {
      steps: [
         { title: 'Insert', text: 'Perform standard BST insert.' },
         { title: 'Balance Factor', text: 'Update height and calculate balance factor = Height(Left) - Height(Right).' },
         { title: 'Rotate', text: 'Perform L, R, LR, or RL rotations to keep balance factor between -1 and 1.' }
      ],
      complexity: 'O(log n)'
   },
   MaxHeap: {
      steps: [
         { title: 'Insert', text: 'Add the new element to the next available position (end of the complete tree).' },
         { title: 'Bubble Up', text: 'Compare new element with its parent. If greater, swap. Continue adjusting upwards.' },
      ],
      complexity: 'O(log n)'
   },
   MinHeap: {
      steps: [
         { title: 'Insert', text: 'Add the new element to the next available position.' },
         { title: 'Bubble Up', text: 'Compare new element with its parent. If less, swap. Continue adjusting upwards.' },
      ],
      complexity: 'O(log n)'
   },
   BT: {
      steps: [
         { title: 'Insert', text: 'Insert at the first available position in level-order to maintain a complete tree as much as possible.' },
         { title: 'Search', text: 'Requires O(n) traversal since there is no ordering constraint.' },
      ],
      complexity: 'O(n) avg'
   }
};

const getHeight = (node: TreeNode | null) => node ? (node.height || 1) : 0;
const getBalance = (node: TreeNode | null) => node ? getHeight(node.left) - getHeight(node.right) : 0;
const updateHeight = (node: TreeNode) => {
   node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
};

const rightRotate = (y: TreeNode): TreeNode => {
   const x = { ...y.left! };
   const T2 = x.right;
   x.right = { ...y, left: T2 };
   updateHeight(x.right);
   updateHeight(x);
   return x;
};

const leftRotate = (x: TreeNode): TreeNode => {
   const y = { ...x.right! };
   const T2 = y.left;
   y.left = { ...x, right: T2 };
   updateHeight(y.left);
   updateHeight(y);
   return y;
};

export default function TreePage() {
   const [treeType, setTreeType] = useState<TreeType>('BST');
   const [root, setRoot] = useState<TreeNode | null>(null);
   const [arrayState, setArrayState] = useState<{id: string, val: number}[]>([]);
   
   const [currentLine, setCurrentLine] = useState(-1);
   const [highlightedId, setHighlightedId] = useState<string | null>(null);
   const [speed, setSpeed] = useState(50);
   const [classification, setClassification] = useState<string[]>([]);
   const { theme } = useTheme();

   useEffect(() => {
      setRoot(null);
      setArrayState([]);
      setClassification([]);
   }, [treeType]);

   const checkClassification = (curr: TreeNode | null, type: TreeType) => {
      if (!curr) return [];
      const classes = [];
      
      if (type === 'BST') classes.push('Binary Search Tree');
      else if (type === 'AVL') classes.push('AVL Tree');
      else if (type === 'MaxHeap') classes.push('Max Heap');
      else if (type === 'MinHeap') classes.push('Min Heap');
      else classes.push('Binary Tree');

      const isFull = (node: TreeNode | null): boolean => {
         if (!node) return true;
         if (!node.left && !node.right) return true;
         if (node.left && node.right) return isFull(node.left) && isFull(node.right);
         return false;
      };

      const getHeightInner = (node: TreeNode | null): number => {
         if (!node) return 0;
         return 1 + Math.max(getHeightInner(node.left), getHeightInner(node.right));
      };

      const isBalanced = (node: TreeNode | null): boolean => {
         if (!node) return true;
         const lh = getHeightInner(node.left);
         const rh = getHeightInner(node.right);
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

   const arrayToTree = (arr: {id: string, val: number}[]): TreeNode | null => {
      if (arr.length === 0) return null;
      const nodes: TreeNode[] = arr.map(n => ({
         id: n.id,
         val: n.val,
         left: null,
         right: null,
         x: 0,
         y: 0,
         height: 1 
      }));
   
      for (let i = 0; i < arr.length; i++) {
         const leftIdx = 2 * i + 1;
         const rightIdx = 2 * i + 2;
         if (leftIdx < arr.length) nodes[i].left = nodes[leftIdx];
         if (rightIdx < arr.length) nodes[i].right = nodes[rightIdx];
      }
      return nodes[0];
   };

   const insertAVL = (curr: TreeNode | null, data: {id: string, val: number}): TreeNode => {
      if (!curr) return { ...data, left: null, right: null, x: 0, y: 0, height: 1 };
      
      const node = { ...curr };
   
      if (data.val < node.val) node.left = insertAVL(node.left, data);
      else node.right = insertAVL(node.right, data);
   
      updateHeight(node);
      const balance = getBalance(node);
   
      if (balance > 1 && node.left && data.val < node.left.val) return rightRotate(node);
      if (balance < -1 && node.right && data.val >= node.right.val) return leftRotate(node);
      if (balance > 1 && node.left && data.val >= node.left.val) {
         node.left = leftRotate(node.left);
         return rightRotate(node);
      }
      if (balance < -1 && node.right && data.val < node.right.val) {
         node.right = rightRotate(node.right);
         return leftRotate(node);
      }
   
      return node;
   };

   const handleAdd = (val: number) => {
      const newNodeData = {
         id: Math.random().toString(36).substring(2, 11),
         val,
      };

      let positionedTree: TreeNode | null = null;

      if (treeType === 'BST') {
         const insertNode = (curr: TreeNode | null): TreeNode => {
            if (!curr) return { ...newNodeData, left: null, right: null, x: 0, y: 0 };
            if (val < curr.val) return { ...curr, left: insertNode(curr.left) };
            else return { ...curr, right: insertNode(curr.right) };
         };
         const newTree = insertNode(root);
         positionedTree = calculatePositions(newTree, 0, 40, 160);
         setRoot(positionedTree);

      } else if (treeType === 'AVL') {
         const newTree = insertAVL(root, newNodeData);
         positionedTree = calculatePositions(newTree, 0, 40, 160);
         setRoot(positionedTree);

      } else if (treeType === 'MaxHeap' || treeType === 'MinHeap' || treeType === 'BT') {
         const newArr = [...arrayState, newNodeData];
         if (treeType === 'MaxHeap') {
            let i = newArr.length - 1;
            while (i > 0) {
               const p = Math.floor((i - 1) / 2);
               if (newArr[i].val > newArr[p].val) {
                  const temp = newArr[i];
                  newArr[i] = newArr[p];
                  newArr[p] = temp;
                  i = p;
               } else break;
            }
         } else if (treeType === 'MinHeap') {
            let i = newArr.length - 1;
            while (i > 0) {
               const p = Math.floor((i - 1) / 2);
               if (newArr[i].val < newArr[p].val) {
                  const temp = newArr[i];
                  newArr[i] = newArr[p];
                  newArr[p] = temp;
                  i = p;
               } else break;
            }
         }
         
         setArrayState(newArr);
         const newTree = arrayToTree(newArr);
         positionedTree = calculatePositions(newTree, 0, 40, 160);
         setRoot(positionedTree);
      }

      if (positionedTree) {
         setClassification(checkClassification(positionedTree, treeType));
      }

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
               layout
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
               transition={{ duration: 0.4 }}
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
            <div className="w-full flex overflow-x-auto gap-2 pb-2 scrollbar-none border-b border-white/5 [.light_&]:border-black/5">
                {TREE_TYPES.map(t => (
                   <PremiumButton 
                      key={t}
                      variant={treeType === t ? 'primary' : 'secondary'}
                      onClick={() => setTreeType(t)}
                      className="text-xs px-6 py-2 whitespace-nowrap"
                   >
                     {t === 'BT' ? 'Binary Tree' : t === 'BST' ? 'Binary Search Tree' : t.replace(/Heap/g, ' Heap')}
                   </PremiumButton>
                ))}
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
               <div className="flex flex-col gap-2">
                  <h1 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight">
                     {treeType === 'BT' ? 'Binary Tree' : treeType === 'BST' ? 'BST' : treeType.replace(/Heap/g, ' Heap')} <span className="text-primary italic">Visualizer</span>
                  </h1>
                  <p className="text-muted-foreground text-lg font-semibold tracking-wide border-l-4 border-primary/30 pl-4 py-1">
                     {treeType === 'BT' ? 'Generic Binary Tree' : treeType === 'BST' ? 'Binary Search Tree' : treeType === 'AVL' ? 'Self-Balancing AVL Tree' : treeType === 'MaxHeap' ? 'Max-Property Heap Priority Queue' : 'Min-Property Heap Priority Queue'} with real-time visualization.
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
                     onClear={() => { setRoot(null); setArrayState([]); setClassification([]); }}
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
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[5rem] md:text-[10rem] lg:text-[12rem] font-black text-white/[0.03] [.light_&]:text-black/[0.03] select-none pointer-events-none uppercase whitespace-nowrap text-center">
                     {treeType}
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

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 h-auto lg:h-[550px] mb-12">
               <div className="h-[500px] lg:h-full">
                  <LogicBreakdown steps={LOGIC_BREAKDOWNS[treeType].steps} complexity={LOGIC_BREAKDOWNS[treeType].complexity} />
               </div>
               <div className="h-[500px] lg:h-full">
                  <CodePanel algorithm={TREE_ALGORITHMS[treeType]} currentLine={currentLine} />
               </div>
            </div>
         </div>
      </main>
   );
}
