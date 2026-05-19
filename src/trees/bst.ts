import { layoutTree } from "./layout";
import type { PositionedTreeNode, TreeNodeData, TreeOperationResult } from "./types";
import { generateNodeId } from "./utils";

function insertNode(
  curr: PositionedTreeNode | null,
  data: TreeNodeData
): PositionedTreeNode {
  if (!curr) {
    return { ...data, left: null, right: null, x: 0, y: 0 };
  }
  if (data.val < curr.val) {
    return { ...curr, left: insertNode(curr.left, data) };
  }
  if (data.val > curr.val) {
    return { ...curr, right: insertNode(curr.right, data) };
  }
  return curr;
}

function minNode(node: PositionedTreeNode): PositionedTreeNode {
  let current = node;
  while (current.left) current = current.left;
  return current;
}

function deleteNode(
  curr: PositionedTreeNode | null,
  val: number
): { node: PositionedTreeNode | null; removedId: string | null } {
  if (!curr) return { node: null, removedId: null };

  if (val < curr.val) {
    const { node, removedId } = deleteNode(curr.left, val);
    return { node: node ? { ...curr, left: node } : { ...curr, left: null }, removedId };
  }
  if (val > curr.val) {
    const { node, removedId } = deleteNode(curr.right, val);
    return { node: node ? { ...curr, right: node } : { ...curr, right: null }, removedId };
  }

  const removedId = curr.id;
  if (!curr.left) return { node: curr.right, removedId };
  if (!curr.right) return { node: curr.left, removedId };

  const successor = minNode(curr.right);
  return {
    node: {
      ...curr,
      val: successor.val,
      id: successor.id,
      right: deleteNode(curr.right, successor.val).node,
    },
    removedId,
  };
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

export function insertBST(
  root: PositionedTreeNode | null,
  val: number
): TreeOperationResult {
  const newNode: TreeNodeData = { id: generateNodeId(), val };
  const tree = layoutTree(insertNode(root, newNode));
  return {
    root: tree,
    highlightedIds: [newNode.id],
    message: `Inserted ${val}`,
  };
}

export function searchBST(
  root: PositionedTreeNode | null,
  val: number
): TreeOperationResult {
  const path = searchPath(root, val);
  const found = root && path.length > 0 && path[path.length - 1];
  const lastNode = found
    ? (function find(n: PositionedTreeNode | null): PositionedTreeNode | null {
        if (!n) return null;
        if (n.id === path[path.length - 1]) return n;
        return find(n.left) ?? find(n.right);
      })(root)
    : null;

  return {
    root,
    highlightedIds: path,
    message:
      lastNode?.val === val ? `Found ${val}` : `${val} not in tree`,
  };
}

export function deleteBST(
  root: PositionedTreeNode | null,
  val: number
): TreeOperationResult {
  const { node, removedId } = deleteNode(root, val);
  if (!removedId) {
    return {
      root,
      highlightedIds: [],
      message: `${val} not found`,
    };
  }
  return {
    root: layoutTree(node),
    highlightedIds: [removedId],
    message: `Deleted ${val}`,
  };
}
