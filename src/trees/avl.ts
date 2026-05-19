import { layoutTree } from "./layout";
import type { PositionedTreeNode, TreeNodeData, TreeOperationResult } from "./types";
import { generateNodeId } from "./utils";

function getHeight(node: PositionedTreeNode | null): number {
  return node?.height ?? (node ? 1 : 0);
}

function getBalance(node: PositionedTreeNode | null): number {
  return node ? getHeight(node.left) - getHeight(node.right) : 0;
}

function updateHeight(node: PositionedTreeNode): void {
  node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
}

function rightRotate(y: PositionedTreeNode): PositionedTreeNode {
  const x = { ...y.left! };
  const t2 = x.right;
  x.right = { ...y, left: t2 };
  updateHeight(x.right);
  updateHeight(x);
  return x;
}

function leftRotate(x: PositionedTreeNode): PositionedTreeNode {
  const y = { ...x.right! };
  const t2 = y.left;
  y.left = { ...x, right: t2 };
  updateHeight(y.left);
  updateHeight(y);
  return y;
}

function insertAVLNode(
  curr: PositionedTreeNode | null,
  data: TreeNodeData
): { node: PositionedTreeNode; rotation: TreeOperationResult["rotation"] } {
  if (!curr) {
    return {
      node: { ...data, left: null, right: null, x: 0, y: 0, height: 1 },
      rotation: null,
    };
  }

  const node = { ...curr };
  let rotation: TreeOperationResult["rotation"] = null;

  if (data.val < node.val) node.left = insertAVLNode(node.left, data).node;
  else if (data.val > node.val) node.right = insertAVLNode(node.right, data).node;
  else return { node, rotation: null };

  updateHeight(node);
  const balance = getBalance(node);

  if (balance > 1 && node.left && data.val < node.left.val) {
    return { node: rightRotate(node), rotation: "LL" };
  }
  if (balance < -1 && node.right && data.val >= node.right.val) {
    return { node: leftRotate(node), rotation: "RR" };
  }
  if (balance > 1 && node.left && data.val >= node.left.val) {
    node.left = leftRotate(node.left);
    return { node: rightRotate(node), rotation: "LR" };
  }
  if (balance < -1 && node.right && data.val < node.right.val) {
    node.right = rightRotate(node.right);
    return { node: leftRotate(node), rotation: "RL" };
  }

  return { node, rotation };
}

function searchPath(
  curr: PositionedTreeNode | null,
  val: number,
  path: string[] = []
): string[] {
  if (!curr) return path;
  path.push(curr.id);
  if (curr.val === val) return path;
  if (val < curr.val) return searchPath(curr.left, val, path);
  return searchPath(curr.right, val, path);
}

export function insertAVL(
  root: PositionedTreeNode | null,
  val: number
): TreeOperationResult {
  const newNode: TreeNodeData = { id: generateNodeId(), val };
  const { node, rotation } = insertAVLNode(root, newNode);
  const tree = layoutTree(node);

  const rotationLabels: Record<NonNullable<typeof rotation>, string> = {
    LL: "Left-Left rotation",
    RR: "Right-Right rotation",
    LR: "Left-Right rotation",
    RL: "Right-Left rotation",
  };

  return {
    root: tree,
    highlightedIds: [newNode.id],
    rotation,
    message: rotation
      ? `Inserted ${val} — ${rotationLabels[rotation]}`
      : `Inserted ${val}`,
  };
}

function findByPath(
  root: PositionedTreeNode | null,
  path: string[]
): PositionedTreeNode | null {
  if (!root || path.length === 0) return null;
  if (root.id === path[0]) {
    if (path.length === 1) return root;
    const next = path[1];
    if (root.left?.id === next) return findByPath(root.left, path.slice(1));
    if (root.right?.id === next) return findByPath(root.right, path.slice(1));
  }
  return null;
}

export function searchAVL(
  root: PositionedTreeNode | null,
  val: number
): TreeOperationResult {
  const path = searchPath(root, val);
  const node = findByPath(root, path);
  const found = node?.val === val;
  return {
    root,
    highlightedIds: path,
    message: found ? `Found ${val}` : `${val} not in tree`,
  };
}
