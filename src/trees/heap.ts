import { layoutTree } from "./layout";
import type { TreeNodeData, TreeOperationResult } from "./types";
import { arrayToTree, generateNodeId } from "./utils";

function bubbleUp(arr: TreeNodeData[], maxHeap: boolean): TreeNodeData[] {
  const result = [...arr];
  let i = result.length - 1;
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    const shouldSwap = maxHeap
      ? result[i].val > result[parent].val
      : result[i].val < result[parent].val;
    if (!shouldSwap) break;
    [result[i], result[parent]] = [result[parent], result[i]];
    i = parent;
  }
  return result;
}

function bubbleDown(arr: TreeNodeData[], maxHeap: boolean): TreeNodeData[] {
  const result = [...arr];
  let i = 0;
  while (true) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let target = i;

    if (left < result.length) {
      const preferLeft = maxHeap
        ? result[left].val > result[target].val
        : result[left].val < result[target].val;
      if (preferLeft) target = left;
    }
    if (right < result.length) {
      const preferRight = maxHeap
        ? result[right].val > result[target].val
        : result[right].val < result[target].val;
      if (preferRight) target = right;
    }
    if (target === i) break;
    [result[i], result[target]] = [result[target], result[i]];
    i = target;
  }
  return result;
}

export function insertHeap(
  arrayState: TreeNodeData[],
  val: number,
  maxHeap: boolean
): TreeOperationResult {
  const newNode: TreeNodeData = { id: generateNodeId(), val };
  const newArr = bubbleUp([...arrayState, newNode], maxHeap);
  const root = layoutTree(arrayToTree(newArr));

  return {
    root,
    arrayState: newArr,
    highlightedIds: [newNode.id],
    message: maxHeap ? `Inserted ${val} (bubble up)` : `Inserted ${val} (bubble up)`,
  };
}

export function extractHeap(
  arrayState: TreeNodeData[],
  maxHeap: boolean
): TreeOperationResult {
  if (arrayState.length === 0) {
    return { root: null, arrayState: [], highlightedIds: [], message: "Heap is empty" };
  }

  const extracted = arrayState[0];
  if (arrayState.length === 1) {
    return {
      root: null,
      arrayState: [],
      highlightedIds: [extracted.id],
      message: maxHeap ? `Extracted max: ${extracted.val}` : `Extracted min: ${extracted.val}`,
    };
  }

  const swapped = [...arrayState];
  swapped[0] = swapped[swapped.length - 1];
  swapped.pop();
  const newArr = bubbleDown(swapped, maxHeap);
  const root = layoutTree(arrayToTree(newArr));

  return {
    root,
    arrayState: newArr,
    highlightedIds: [extracted.id],
    message: maxHeap
      ? `Extracted max: ${extracted.val}`
      : `Extracted min: ${extracted.val}`,
  };
}

export function peekHeap(arrayState: TreeNodeData[], maxHeap: boolean): TreeOperationResult {
  if (arrayState.length === 0) {
    return { root: null, arrayState: [], highlightedIds: [], message: "Heap is empty" };
  }
  const root = layoutTree(arrayToTree(arrayState));
  return {
    root,
    arrayState,
    highlightedIds: [arrayState[0].id],
    message: maxHeap
      ? `Peek max: ${arrayState[0].val}`
      : `Peek min: ${arrayState[0].val}`,
  };
}
