import type { PositionedTreeNode, TreeType } from "./types";

const TYPE_LABELS: Record<TreeType, string> = {
  BT: "Binary Tree",
  BST: "Binary Search Tree",
  AVL: "AVL Tree",
  MaxHeap: "Max Heap",
  MinHeap: "Min Heap",
};

function getHeight(node: PositionedTreeNode | null): number {
  if (!node) return 0;
  return 1 + Math.max(getHeight(node.left), getHeight(node.right));
}

function isFull(node: PositionedTreeNode | null): boolean {
  if (!node) return true;
  if (!node.left && !node.right) return true;
  if (node.left && node.right) return isFull(node.left) && isFull(node.right);
  return false;
}

function isBalanced(node: PositionedTreeNode | null): boolean {
  if (!node) return true;
  const lh = getHeight(node.left);
  const rh = getHeight(node.right);
  return (
    Math.abs(lh - rh) <= 1 &&
    isBalanced(node.left) &&
    isBalanced(node.right)
  );
}

function isBST(node: PositionedTreeNode | null, min = -Infinity, max = Infinity): boolean {
  if (!node) return true;
  if (node.val <= min || node.val >= max) return false;
  return (
    isBST(node.left, min, node.val) &&
    isBST(node.right, node.val, max)
  );
}

function isHeap(node: PositionedTreeNode | null, maxHeap: boolean): boolean {
  if (!node) return true;
  const leftOk =
    !node.left ||
    (maxHeap ? node.val >= node.left.val : node.val <= node.left.val);
  const rightOk =
    !node.right ||
    (maxHeap ? node.val >= node.right.val : node.val <= node.right.val);
  return (
    leftOk &&
    rightOk &&
    isHeap(node.left, maxHeap) &&
    isHeap(node.right, maxHeap)
  );
}

export function classifyTree(
  root: PositionedTreeNode | null,
  type: TreeType
): string[] {
  if (!root) return [];

  const classes: string[] = [TYPE_LABELS[type]];

  if (isFull(root)) classes.push("Full Binary Tree");
  if (isBalanced(root)) classes.push("Balanced Tree");
  if (type !== "BST" && type !== "AVL" && isBST(root)) {
    classes.push("Also satisfies BST property");
  }
  if ((type === "MaxHeap" || type === "MinHeap") && isHeap(root, type === "MaxHeap")) {
    classes.push("Valid heap ordering");
  }

  return classes;
}
