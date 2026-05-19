"use client";

import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PositionedTreeNode, TreeType } from "@/trees/types";

interface TreeVisualizerProps {
  root: PositionedTreeNode | null;
  treeType: TreeType;
  highlightedIds: Set<string>;
  rotation?: "LL" | "RR" | "LR" | "RL" | null;
  isDark: boolean;
  statusMessage?: string;
}

function collectEdges(
  node: PositionedTreeNode | null,
  edges: { x1: number; y1: number; x2: number; y2: number }[] = []
) {
  if (!node) return edges;
  if (node.left) {
    edges.push({
      x1: node.x,
      y1: node.y + 24,
      x2: node.left.x,
      y2: node.left.y + 24,
    });
    collectEdges(node.left, edges);
  }
  if (node.right) {
    edges.push({
      x1: node.x,
      y1: node.y + 24,
      x2: node.right.x,
      y2: node.right.y + 24,
    });
    collectEdges(node.right, edges);
  }
  return edges;
}

function collectNodes(
  node: PositionedTreeNode | null,
  list: PositionedTreeNode[] = []
): PositionedTreeNode[] {
  if (!node) return list;
  list.push(node);
  collectNodes(node.left, list);
  collectNodes(node.right, list);
  return list;
}

const TreeNodeView = memo(function TreeNodeView({
  node,
  active,
  isDark,
}: {
  node: PositionedTreeNode;
  active: boolean;
  isDark: boolean;
}) {
  return (
    <motion.div
      layout={false}
      initial={false}
      animate={{
        scale: active ? 1.08 : 1,
        backgroundColor: active
          ? "rgba(99, 102, 241, 0.65)"
          : isDark
            ? "rgba(30, 41, 59, 0.9)"
            : "rgba(255, 255, 255, 0.95)",
        borderColor: active
          ? "rgba(99, 102, 241, 1)"
          : isDark
            ? "rgba(255, 255, 255, 0.12)"
            : "rgba(0, 0, 0, 0.1)",
      }}
      transition={{ duration: 0.2 }}
      style={{
        position: "absolute",
        left: `calc(50% + ${node.x}px)`,
        top: `${node.y}px`,
        transform: "translateX(-50%)",
        willChange: active ? "transform" : "auto",
      }}
      className={cn(
        "w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center font-black text-xs md:text-sm z-20 backdrop-blur-sm",
        active && "shadow-[0_0_16px_rgba(99,102,241,0.45)]",
        isDark ? "text-white" : "text-slate-900"
      )}
    >
      {node.val}
    </motion.div>
  );
});

export const TreeVisualizer = memo(function TreeVisualizer({
  root,
  treeType,
  highlightedIds,
  rotation,
  isDark,
  statusMessage,
}: TreeVisualizerProps) {
  const edges = useMemo(() => collectEdges(root), [root]);
  const nodes = useMemo(() => collectNodes(root), [root]);

  return (
    <div className="lg:col-span-8 glass-card min-h-[400px] md:min-h-[550px] p-4 flex flex-col relative overflow-hidden bg-black/20 [.light_&]:bg-black/5">
      <motion.div
        layout={false}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[5rem] md:text-[10rem] font-black text-white/[0.03] [.light_&]:text-black/[0.03] select-none pointer-events-none uppercase whitespace-nowrap text-center"
      >
        {treeType === "BT" ? "BT" : treeType}
      </motion.div>

      {rotation && (
        <motion.div
          layout={false}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-black uppercase tracking-widest"
        >
          Rotation: {rotation}
        </motion.div>
      )}

      {statusMessage && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-xl bg-primary/10 border border-primary/30 text-primary text-xs font-bold whitespace-nowrap">
          {statusMessage}
        </div>
      )}

      <motion.div layout={false} className="w-full h-full relative overflow-auto custom-scrollbar flex-1">
        <div className="min-w-[600px] min-h-[500px] relative">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            style={{ overflow: "visible" }}
          >
            <g style={{ transform: "translateX(50%)" }}>
              {edges.map((e, i) => (
                <line
                  key={i}
                  x1={e.x1}
                  y1={e.y1}
                  x2={e.x2}
                  y2={e.y2}
                  stroke="#6366f1"
                  strokeWidth="2.5"
                  strokeOpacity="0.75"
                />
              ))}
            </g>
          </svg>

          {nodes.map((node) => (
            <TreeNodeView
              key={node.id}
              node={node}
              active={highlightedIds.has(node.id)}
              isDark={isDark}
            />
          ))}

          {!root && (
            <motion.div layout={false} className="absolute inset-0 flex items-center justify-center text-muted-foreground/25 italic font-mono text-xs uppercase tracking-[0.3em]">
              // AWAITING_INPUT
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
});
