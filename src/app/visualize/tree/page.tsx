"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { InputPanel } from "@/components/InputPanel";
import { CodePanel } from "@/components/CodePanel";
import { LogicBreakdown } from "@/components/LogicBreakdown";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { TreeVisualizer } from "@/components/tree/TreeVisualizer";
import { TreeTypeTabs } from "@/components/tree/TreeTypeTabs";
import { useTheme } from "@/components/Providers";
import {
  TREE_SHORT_LABELS,
  TREE_DESCRIPTIONS,
  TREE_ALGORITHMS,
  LOGIC_BREAKDOWNS,
  classifyTree,
  insertBinaryTree,
  removeBinaryTree,
  insertBST,
  searchBST,
  deleteBST,
  insertAVL,
  searchAVL,
  insertHeap,
  extractHeap,
  peekHeap,
  collectTraversal,
  type TreeType,
  type PositionedTreeNode,
  type TreeNodeData,
} from "@/trees";
import { Eye, ArrowDown } from "lucide-react";

export default function TreePage() {
  const [treeType, setTreeType] = useState<TreeType>("BST");
  const [root, setRoot] = useState<PositionedTreeNode | null>(null);
  const [arrayState, setArrayState] = useState<TreeNodeData[]>([]);
  const [highlightedIds, setHighlightedIds] = useState<string[]>([]);
  const [rotation, setRotation] = useState<"LL" | "RR" | "LR" | "RL" | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [classification, setClassification] = useState<string[]>([]);
  const [speed, setSpeed] = useState(50);
  const { theme } = useTheme();

  const highlightSet = useMemo(() => new Set(highlightedIds), [highlightedIds]);

  const applyResult = useCallback(
    (
      result: {
        root: PositionedTreeNode | null;
        arrayState?: TreeNodeData[];
        highlightedIds: string[];
        rotation?: typeof rotation;
        message?: string;
      },
      type: TreeType
    ) => {
      setRoot(result.root);
      if (result.arrayState !== undefined) setArrayState(result.arrayState);
      setRotation(result.rotation ?? null);
      setStatusMessage(result.message);
      setClassification(classifyTree(result.root, type));
      setHighlightedIds(result.highlightedIds);
      if (result.highlightedIds.length) {
        window.setTimeout(() => setHighlightedIds([]), 1200);
      }
      if (result.rotation) {
        window.setTimeout(() => setRotation(null), 2000);
      }
    },
    []
  );

  useEffect(() => {
    setRoot(null);
    setArrayState([]);
    setClassification([]);
    setHighlightedIds([]);
    setRotation(null);
    setStatusMessage(undefined);
  }, [treeType]);

  const handleAdd = useCallback(
    (val: number) => {
      let result;
      switch (treeType) {
        case "BST":
          result = insertBST(root, val);
          break;
        case "AVL":
          result = insertAVL(root, val);
          break;
        case "MaxHeap":
          result = insertHeap(arrayState, val, true);
          break;
        case "MinHeap":
          result = insertHeap(arrayState, val, false);
          break;
        default:
          result = insertBinaryTree(arrayState, val);
      }
      applyResult(result, treeType);
    },
    [treeType, root, arrayState, applyResult]
  );

  const handleRemove = useCallback(
    (val?: number) => {
      let result;
      switch (treeType) {
        case "BST":
          if (val === undefined) return;
          result = deleteBST(root, val);
          break;
        case "AVL":
          setStatusMessage("AVL delete coming soon — use Clear for now");
          return;
        case "MaxHeap":
          result = extractHeap(arrayState, true);
          break;
        case "MinHeap":
          result = extractHeap(arrayState, false);
          break;
        default:
          result = removeBinaryTree(arrayState, val);
      }
      applyResult(result, treeType);
    },
    [treeType, root, arrayState, applyResult]
  );

  const handleSearch = useCallback(
    (val: number) => {
      if (treeType !== "BST" && treeType !== "AVL") {
        setStatusMessage("Search is for BST/AVL — use traversal on other trees");
        return;
      }
      const result = treeType === "BST" ? searchBST(root, val) : searchAVL(root, val);
      applyResult(result, treeType);
    },
    [treeType, root, applyResult]
  );

  const handlePeek = useCallback(() => {
    if (treeType !== "MaxHeap" && treeType !== "MinHeap") return;
    const result = peekHeap(arrayState, treeType === "MaxHeap");
    applyResult(result, treeType);
  }, [treeType, arrayState, applyResult]);

  const handleExtract = useCallback(() => {
    if (treeType !== "MaxHeap" && treeType !== "MinHeap") return;
    const result = extractHeap(arrayState, treeType === "MaxHeap");
    applyResult(result, treeType);
  }, [treeType, arrayState, applyResult]);

  const handleClear = useCallback(() => {
    setRoot(null);
    setArrayState([]);
    setClassification([]);
    setHighlightedIds([]);
    setRotation(null);
    setStatusMessage(undefined);
  }, []);

  const handleTraversal = useCallback(
    async (order: "in" | "pre" | "post" | "level") => {
      const path = collectTraversal(root, order);
      for (const id of path) {
        setHighlightedIds([id]);
        await new Promise((r) => setTimeout(r, (101 - speed) * 8));
      }
      setHighlightedIds([]);
    },
    [root, speed]
  );

  const isHeap = treeType === "MaxHeap" || treeType === "MinHeap";
  const supportsSearch = treeType === "BST" || treeType === "AVL";

  return (
    <main className="min-h-screen pt-20 pb-12 flex flex-col items-center">
      <Navbar />

      <div className="container max-w-7xl flex-1 flex flex-col gap-6 px-4 md:px-6">
        <TreeTypeTabs active={treeType} onChange={setTreeType} />

        <motion.div layout={false} className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight">
              {TREE_SHORT_LABELS[treeType]}{" "}
              <span className="text-primary italic">Visualizer</span>
            </h1>
            <p className="text-muted-foreground text-lg font-semibold tracking-wide border-l-4 border-primary/30 pl-4 py-1">
              {TREE_DESCRIPTIONS[treeType]}
            </p>
          </div>

          <motion.div layout={false} className="flex flex-col items-center md:items-end gap-4">
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              {classification.map((cls, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-[10px] font-black text-primary uppercase tracking-widest"
                >
                  {cls}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <InputPanel
              onAdd={handleAdd}
              onRemove={handleRemove}
              onSearch={supportsSearch ? handleSearch : undefined}
              onClear={handleClear}
              label="Value"
            />

            {isHeap && (
              <div className="glass-card p-4 flex flex-col gap-3">
                <span className="text-sm font-black uppercase text-muted-foreground tracking-widest">
                  Heap Operations
                </span>
                <motion.div layout={false} className="grid grid-cols-2 gap-2">
                  <PremiumButton
                    variant="secondary"
                    className="text-xs font-bold uppercase"
                    onClick={handlePeek}
                  >
                    <Eye size={14} className="mr-1" /> Peek
                  </PremiumButton>
                  <PremiumButton
                    variant="primary"
                    className="text-xs font-bold uppercase"
                    onClick={handleExtract}
                  >
                    <ArrowDown size={14} className="mr-1" />
                    {treeType === "MaxHeap" ? "Extract Max" : "Extract Min"}
                  </PremiumButton>
                </motion.div>
              </div>
            )}

            <div className="glass-card p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black uppercase text-muted-foreground tracking-widest">
                  Traversals
                </span>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-24 accent-primary"
                  title="Animation speed"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(["in", "pre", "post", "level"] as const).map((t) => (
                  <PremiumButton
                    key={t}
                    variant="secondary"
                    className="text-xs font-bold uppercase py-2"
                    onClick={() => handleTraversal(t)}
                  >
                    {t === "level" ? "Level" : `${t}order`}
                  </PremiumButton>
                ))}
              </div>
            </div>
          </div>

          <TreeVisualizer
            root={root}
            treeType={treeType}
            highlightedIds={highlightSet}
            rotation={rotation}
            isDark={theme === "dark"}
            statusMessage={statusMessage}
          />
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 h-auto lg:h-[550px] mb-12">
          <div className="h-[500px] lg:h-full">
            <LogicBreakdown
              steps={LOGIC_BREAKDOWNS[treeType].steps}
              complexity={LOGIC_BREAKDOWNS[treeType].complexity}
            />
          </div>
          <div className="h-[500px] lg:h-full">
            <CodePanel algorithm={TREE_ALGORITHMS[treeType]} currentLine={-1} />
          </div>
        </div>
      </div>
    </main>
  );
}
