import type { PositionedTreeNode, TreeNodeData } from "./types";

export function generateNodeId(): string {
  return Math.random().toString(36).slice(2, 11);
}

export function arrayToTree(arr: TreeNodeData[]): PositionedTreeNode | null {
  if (arr.length === 0) return null;

  const nodes: PositionedTreeNode[] = arr.map((n) => ({
    ...n,
    left: null,
    right: null,
    x: 0,
    y: 0,
    height: 1,
  }));

  for (let i = 0; i < arr.length; i++) {
    const leftIdx = 2 * i + 1;
    const rightIdx = 2 * i + 2;
    if (leftIdx < arr.length) nodes[i].left = nodes[leftIdx];
    if (rightIdx < arr.length) nodes[i].right = nodes[rightIdx];
  }

  return nodes[0];
}

export function collectTraversal(
  root: PositionedTreeNode | null,
  order: "in" | "pre" | "post" | "level"
): string[] {
  if (!root) return [];

  if (order === "level") {
    const result: string[] = [];
    const queue: PositionedTreeNode[] = [root];
    while (queue.length) {
      const node = queue.shift()!;
      result.push(node.id);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return result;
  }

  const path: string[] = [];
  const walk = (node: PositionedTreeNode | null) => {
    if (!node) return;
    if (order === "pre") path.push(node.id);
    walk(node.left);
    if (order === "in") path.push(node.id);
    walk(node.right);
    if (order === "post") path.push(node.id);
  };
  walk(root);
  return path;
}

export function findNode(
  root: PositionedTreeNode | null,
  val: number
): PositionedTreeNode | null {
  if (!root) return null;
  if (root.val === val) return root;
  return findNode(root.left, val) ?? findNode(root.right, val);
}
