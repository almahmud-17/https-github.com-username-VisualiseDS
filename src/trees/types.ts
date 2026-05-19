export type TreeType = "BT" | "BST" | "AVL" | "MaxHeap" | "MinHeap";

export const TREE_TYPES: TreeType[] = ["BT", "BST", "AVL", "MaxHeap", "MinHeap"];

export interface TreeNodeData {
  id: string;
  val: number;
}

export interface PositionedTreeNode extends TreeNodeData {
  left: PositionedTreeNode | null;
  right: PositionedTreeNode | null;
  x: number;
  y: number;
  height?: number;
}

export interface TreeOperationResult {
  root: PositionedTreeNode | null;
  arrayState?: TreeNodeData[];
  highlightedIds: string[];
  rotation?: "LL" | "RR" | "LR" | "RL" | null;
  message?: string;
}

export type TraversalOrder = "in" | "pre" | "post" | "level";
