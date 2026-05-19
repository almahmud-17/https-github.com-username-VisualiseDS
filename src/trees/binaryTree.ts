import { layoutTree } from "./layout";
import type { PositionedTreeNode, TreeNodeData, TreeOperationResult } from "./types";
import { arrayToTree, generateNodeId } from "./utils";

export function insertBinaryTree(
  arrayState: TreeNodeData[],
  val: number
): TreeOperationResult {
  const newNode: TreeNodeData = { id: generateNodeId(), val };
  const newArr = [...arrayState, newNode];
  const root = layoutTree(arrayToTree(newArr));

  return {
    root,
    arrayState: newArr,
    highlightedIds: [newNode.id],
    message: "Inserted at next level-order position",
  };
}

export function removeBinaryTree(
  arrayState: TreeNodeData[],
  targetVal?: number
): TreeOperationResult {
  if (arrayState.length === 0) {
    return { root: null, arrayState: [], highlightedIds: [] };
  }

  let newArr: TreeNodeData[];
  if (targetVal !== undefined) {
    const idx = arrayState.findIndex((n) => n.val === targetVal);
    if (idx === -1) {
      return {
        root: layoutTree(arrayToTree(arrayState)),
        arrayState,
        highlightedIds: [],
        message: "Value not found",
      };
    }
    newArr = arrayState.filter((_, i) => i !== idx);
  } else {
    newArr = arrayState.slice(0, -1);
  }

  const root = layoutTree(arrayToTree(newArr));
  return {
    root,
    arrayState: newArr,
    highlightedIds: [],
    message: targetVal !== undefined ? `Removed ${targetVal}` : "Removed last node",
  };
}
