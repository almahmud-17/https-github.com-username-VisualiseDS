import type { PositionedTreeNode } from "./types";

export function calculatePositions(
  node: PositionedTreeNode | null,
  x = 0,
  y = 40,
  offset = 160
): PositionedTreeNode | null {
  if (!node) return null;

  return {
    ...node,
    x,
    y,
    left: calculatePositions(node.left, x - offset, y + 80, offset / 2),
    right: calculatePositions(node.right, x + offset, y + 80, offset / 2),
  };
}

export function layoutTree(
  root: PositionedTreeNode | null
): PositionedTreeNode | null {
  return calculatePositions(root, 0, 40, 160);
}
