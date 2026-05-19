import type { TreeType } from "./types";

export const TREE_LABELS: Record<TreeType, string> = {
  BT: "Binary Tree",
  BST: "Binary Search Tree",
  AVL: "AVL Tree",
  MaxHeap: "Max Heap",
  MinHeap: "Min Heap",
};

export const TREE_SHORT_LABELS: Record<TreeType, string> = {
  BT: "Binary Tree",
  BST: "BST",
  AVL: "AVL",
  MaxHeap: "Max Heap",
  MinHeap: "Min Heap",
};

export const TREE_DESCRIPTIONS: Record<TreeType, string> = {
  BT: "Generic binary tree with level-order insertion.",
  BST: "Ordered tree — left smaller, right larger.",
  AVL: "Self-balancing BST with O(log n) height.",
  MaxHeap: "Complete tree where parent ≥ children.",
  MinHeap: "Complete tree where parent ≤ children.",
};

export const TREE_ALGORITHMS: Record<TreeType, string[]> = {
  BST: [
    "Class Node:",
    " Initialize val, left/right as Null",
    " ",
    " Function insert(root, val):",
    " If root is Null: Return Node(val)",
    " If val < root.val:",
    "  root.left = insert(root.left, val)",
    " Else:",
    "  root.right = insert(root.right, val)",
    " Return root",
    " ",
    " Function search(root, val):",
    " If root is Null: Return False",
    " If val == root.val: Return True",
    " If val < root.val: search(root.left, val)",
    " Else: search(root.right, val)",
  ],
  AVL: [
    "Function insert(root, val):",
    "  Perform BST insert",
    "  Update height of ancestors",
    "  balance = height(left) - height(right)",
    "  If balance > 1 and LL case: Right Rotate",
    "  If balance < -1 and RR case: Left Rotate",
    "  If balance > 1 and LR case: Left-Right Rotate",
    "  If balance < -1 and RL case: Right-Left Rotate",
    "  Return balanced root",
  ],
  MaxHeap: [
    "Function insert(val):",
    " Append val to end of array",
    " Bubble Up while parent < child",
    " ",
    "Function extract_max():",
    " Save root, move last to root",
    " Remove last, Bubble Down",
    " Return saved max",
  ],
  MinHeap: [
    "Function insert(val):",
    " Append val to end of array",
    " Bubble Up while parent > child",
    " ",
    "Function extract_min():",
    " Save root, move last to root",
    " Remove last, Bubble Down",
    " Return saved min",
  ],
  BT: [
    "Function insert(root, val):",
    " Use queue for level-order traversal",
    " Find first node with empty child",
    " Attach new node as left or right",
    " ",
    " Traversals: In, Pre, Post, Level-order",
  ],
};

export const LOGIC_BREAKDOWNS: Record<
  TreeType,
  { steps: { title: string; text: string }[]; complexity: string }
> = {
  BST: {
    steps: [
      { title: "Insert", text: "Compare with root; go left if smaller, right if larger." },
      { title: "Search", text: "Binary search style traversal — O(log n) average." },
      { title: "Delete", text: "Replace with inorder successor when two children exist." },
    ],
    complexity: "Insert/Search/Delete: O(log n) avg",
  },
  AVL: {
    steps: [
      { title: "Insert", text: "BST insert, then fix balance up the ancestor chain." },
      { title: "Balance", text: "Balance factor must stay in {-1, 0, 1}." },
      { title: "Rotate", text: "Single (L/R) or double (LR/RL) rotations restore balance." },
    ],
    complexity: "All ops: O(log n)",
  },
  MaxHeap: {
    steps: [
      { title: "Insert", text: "Add at end of array (complete tree), bubble up." },
      { title: "Extract", text: "Swap root with last, bubble down to restore heap." },
      { title: "Peek", text: "Root always holds the maximum element." },
    ],
    complexity: "Insert/Extract: O(log n)",
  },
  MinHeap: {
    steps: [
      { title: "Insert", text: "Add at end, bubble up while parent > child." },
      { title: "Extract", text: "Remove min from root, bubble down." },
      { title: "Peek", text: "Root always holds the minimum element." },
    ],
    complexity: "Insert/Extract: O(log n)",
  },
  BT: {
    steps: [
      { title: "Insert", text: "Level-order — fill left to right, top to bottom." },
      { title: "Traverse", text: "Inorder, preorder, postorder, or level-order visits." },
      { title: "Search", text: "No ordering — must visit up to O(n) nodes." },
    ],
    complexity: "Insert: O(n), Search: O(n)",
  },
};
