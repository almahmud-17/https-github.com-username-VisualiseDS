import type { TopicDetail } from "./types";

export const TOPIC_DETAILS: Record<string, TopicDetail> = {
  "Elementary Data Objects concepts": {
    id: "elementary-objects",
    title: "Elementary Data Objects",
    definition:
      "Integers, characters, booleans, and floating-point values — the atomic units from which every composite structure is built. Knuth calls these the 'basic constituents' of all data.",
    classicNote:
      "Knuth (TAOCP Vol. 1) opens with the precise definition of variables, arrays, and linear lists as the alphabet of programming.",
    mnemonic: "Atoms before molecules — you cannot build a list without knowing what a single cell holds.",
    sources: ["KNUTH", "HOROWITZ"],
    chapter: "§1.1",
    keyOperations: ["Declaration", "Assignment", "Type coercion", "Comparison"],
  },
  "Necessity of Structured Data": {
    id: "structured-necessity",
    title: "Why Structure Matters",
    definition:
      "Unstructured masses of data degrade to O(n) for every query. Structure trades setup cost for predictable access patterns — the central thesis of all algorithm textbooks.",
    classicNote:
      "Aho, Hopcroft & Ullman argue that the choice of representation dominates algorithm design.",
    mnemonic: "A library without a catalog is just a warehouse.",
    sources: ["AHU", "CLRS"],
    chapter: "Ch. 1",
    useCases: ["Databases", "File systems", "Compiler symbol tables"],
  },
  "Types of Data Structures": {
    id: "ds-types",
    title: "Primitive vs Non-Primitive",
    definition:
      "Primitive types are built into the language (int, char, float). Non-primitive types — arrays, lists, trees, graphs — are composed by the programmer.",
    classicNote: "Weiss organizes the field into linear lists, trees, and graphs as the three great families.",
    sources: ["WEISS", "GOODRICH"],
    chapter: "Ch. 1",
    keyOperations: ["Composition", "Abstraction", "Encapsulation"],
  },
  "Linear vs Nonlinear Data Structures": {
    id: "linear-nonlinear",
    title: "Linear vs Nonlinear",
    definition:
      "Linear structures arrange elements sequentially (array, stack, queue, linked list). Nonlinear structures model hierarchy or networks (trees, graphs).",
    classicNote: "Horowitz & Sahni classify this as the first major fork in the design space.",
    mnemonic: "A queue is a line; a tree is a family tree.",
    sources: ["HOROWITZ", "SEDGEWICK"],
    chapter: "§1.2",
    useCases: ["Linear: undo stacks, print queues", "Nonlinear: file directories, social graphs"],
  },
  "Data representation ideas": {
    id: "representation",
    title: "Data Representation",
    definition:
      "Logical view (what the ADT promises) vs physical view (how memory is laid out). The gap between them is where efficiency is won or lost.",
    classicNote: "Goodrich separates interface from implementation — the hallmark of modern DS pedagogy.",
    sources: ["GOODRICH", "WEISS"],
    chapter: "Ch. 2",
  },
  "Representation in Memory": {
    id: "array-memory",
    title: "Contiguous Memory (Arrays)",
    definition:
      "Elements stored at consecutive addresses. Address of A[i] = base + i × element_size. Enables O(1) random access.",
    classicNote: "CLRS §3.1: 'We usually assume a machine with a word size of Θ(lg n) bits.'",
    mnemonic: "Hotel rooms 101, 102, 103 — neighbors on the same hallway.",
    complexity: "Access O(1) · Search O(n) · Insert O(n)",
    sources: ["CLRS", "KNUTH"],
    chapter: "Ch. 3",
    keyOperations: ["Indexing", "Base-address arithmetic"],
    visualizeHref: "/visualize/linked-list",
  },
  "Traversing LA": {
    id: "array-traverse",
    title: "Array Traversal",
    definition: "Visit every element exactly once, typically with a for-loop from index 0 to n−1.",
    classicNote: "Sedgewick: traversal is the simplest algorithm — yet it underlies every scan, filter, and map.",
    complexity: "O(n)",
    sources: ["SEDGEWICK", "HOROWITZ"],
    chapter: "§2.1",
    useCases: ["Summation", "Finding max/min", "Printing elements"],
  },
  "Insertion & Deletion in LA": {
    id: "array-insert-delete",
    title: "Insertion & Deletion in Arrays",
    definition:
      "Inserting at position k requires shifting elements k…n−1 right. Deleting shifts left. Both are O(n) in the worst case.",
    classicNote: "Weiss proves why dynamic arrays amortize inserts to O(1) but individual inserts remain O(n).",
    complexity: "O(n) worst case",
    sources: ["WEISS", "CLRS"],
    chapter: "Ch. 17 (Dynamic Tables)",
    prosCons: {
      pros: ["Cache-friendly contiguous layout", "O(1) random access"],
      cons: ["Costly middle insert/delete", "Fixed capacity unless resized"],
    },
  },
  "Multidimensional Arrays": {
    id: "multi-array",
    title: "Multidimensional Arrays",
    definition:
      "2D arrays model matrices (row × column). Storage is row-major (C) or column-major (Fortran). Mapping (i,j) → memory index is a classic exam topic.",
    classicNote: "Knuth analyzes row-major vs column-major access patterns for cache efficiency.",
    mnemonic: "Spreadsheet cell B3 = row B, column 3.",
    sources: ["KNUTH", "HOROWITZ"],
    chapter: "§2.3",
    useCases: ["Image pixels", "Game boards", "Adjacency matrices"],
  },
  "Algebra of Matrices": {
    id: "matrix-algebra",
    title: "Matrix Algebra",
    definition:
      "Addition (element-wise), multiplication (dot products of rows and columns), transpose, and identity matrix — O(n³) for naive multiply.",
    classicNote: "Strassen's algorithm (CLRS Ch. 4) reduces multiplication to O(n^lg 7) — a landmark result.",
    complexity: "Multiply O(n³) naive · O(n^2.807) Strassen",
    sources: ["CLRS", "HOROWITZ"],
    chapter: "Ch. 4",
  },
  "Sparse Matrices representation": {
    id: "sparse-matrix",
    title: "Sparse Matrices",
    definition:
      "When most entries are zero, store only non-zero triples (row, col, value). Saves space from O(mn) to O(nonzeros).",
    classicNote: "Horowitz dedicates a full section to compressed storage formats used in scientific computing.",
    sources: ["HOROWITZ", "KNUTH"],
    chapter: "§2.4",
    prosCons: {
      pros: ["Huge memory savings", "Faster iteration over nonzeros"],
      cons: ["Slower random access to arbitrary cell"],
    },
  },
  "Stack Representation": {
    id: "stack",
    title: "Stack (LIFO)",
    definition:
      "Last-In-First-Out structure. All operations at one end called Top. Underpins recursion, parsing, and DFS.",
    classicNote: "Knuth: 'Stacks are historically among the most important structures in computer science.'",
    mnemonic: "Cafeteria trays — last placed is first removed.",
    complexity: "Push O(1) · Pop O(1) · Peek O(1)",
    sources: ["KNUTH", "CLRS", "WEISS"],
    chapter: "§2.2.1",
    keyOperations: ["Push", "Pop", "Peek", "isEmpty"],
    useCases: ["Call stack", "Undo/Redo", "DFS", "Expression evaluation"],
    visualizeHref: "/visualize/stack",
  },
  "PUSH and POP Operations": {
    id: "push-pop",
    title: "Push & Pop",
    definition:
      "Push adds to top; Pop removes from top. Overflow occurs when capacity is exceeded; underflow when popping an empty stack.",
    classicNote: "Sedgewick implements stacks with resizing arrays — the industrial standard.",
    complexity: "O(1) amortized",
    sources: ["SEDGEWICK", "WEISS"],
    chapter: "§1.3",
    visualizeHref: "/visualize/stack",
  },
  "Polish & Reverse Polish Notation": {
    id: "polish",
    title: "Polish Notation",
    definition:
      "Infix: (a + b). Prefix (Polish): + a b. Postfix (RPN): a b +. Eliminates parentheses — ideal for stack evaluation.",
    classicNote: "Named after Polish logician Jan Łukasiewicz; Knuth traces its adoption in early compilers.",
    mnemonic: "Postfix: operands first, operator last — like reading left to right.",
    sources: ["KNUTH", "HOROWITZ"],
    chapter: "§2.2.2",
    visualizeHref: "/visualize/stack",
  },
  "Evaluation of Postfix Expressions": {
    id: "postfix-eval",
    title: "Postfix Evaluation",
    definition:
      "Scan tokens left-to-right: push numbers, on operator pop two operands, compute, push result. Final stack top is the answer.",
    classicNote: "Classic compiler exercise appearing in virtually every DS textbook since the 1960s.",
    complexity: "O(n) tokens",
    sources: ["HOROWITZ", "SEDGEWICK"],
    chapter: "§2.2.3",
    visualizeHref: "/visualize/stack",
  },
  "Transforming Infix to Postfix": {
    id: "infix-postfix",
    title: "Infix → Postfix (Shunting-Yard)",
    definition:
      "Use an operator stack. Numbers go to output; operators pop higher-precedence ops first. Parentheses control order.",
    classicNote: "Dijkstra's shunting-yard algorithm — elegant and still used in calculators.",
    sources: ["SEDGEWICK", "KNUTH"],
    chapter: "§2.2.4",
    visualizeHref: "/visualize/stack",
  },
  "Recursion Applications": {
    id: "recursion",
    title: "Recursion",
    definition:
      "A function that calls itself on smaller subproblems. Requires a base case and a recursive case. Uses the call stack implicitly.",
    classicNote: "CLRS: 'Every recursive algorithm can be rewritten iteratively, but not always elegantly.'",
    mnemonic: "Russian dolls — open one to find a smaller one inside.",
    sources: ["CLRS", "SKIENA"],
    chapter: "Ch. 4",
    prosCons: {
      pros: ["Natural for trees and divide-and-conquer", "Cleaner code"],
      cons: ["Stack overflow risk", "Overhead of function calls"],
    },
    visualizeHref: "/visualize/hanoi",
  },
  "Insertion & Deletion logic": {
    id: "queue-ops",
    title: "Queue Operations",
    definition:
      "Enqueue adds at rear; Dequeue removes from front. FIFO discipline models fair scheduling.",
    classicNote: "Weiss: queues are the dual of stacks — same ADT spirit, opposite access policy.",
    complexity: "Enqueue O(1) · Dequeue O(1)",
    sources: ["WEISS", "GOODRICH"],
    chapter: "Ch. 6",
    visualizeHref: "/visualize/queue",
  },
  "Priority Queues": {
    id: "priority-queue",
    title: "Priority Queue",
    definition:
      "Elements dequeued by priority, not arrival order. Implemented with heaps for O(log n) insert and extract.",
    classicNote: "CLRS Ch. 6: heaps make priority queues practical at scale.",
    complexity: "Insert O(log n) · Extract-min O(log n)",
    sources: ["CLRS", "SEDGEWICK"],
    chapter: "Ch. 6",
    visualizeHref: "/visualize/queue",
  },
  "Factorial Function recursion": {
    id: "factorial",
    title: "Factorial",
    definition: "n! = n × (n−1)! with base case 0! = 1. The canonical introduction to recursion.",
    classicNote: "Appears in Knuth's opening examples as the simplest non-trivial recursive definition.",
    complexity: "O(n) calls · O(n) stack depth",
    sources: ["KNUTH", "HOROWITZ"],
    chapter: "§4.1",
  },
  "Fibonacci Sequence": {
    id: "fibonacci",
    title: "Fibonacci",
    definition:
      "F(n) = F(n−1) + F(n−2), F(0)=0, F(1)=1. Naive recursion is O(2^n); memoization reduces to O(n).",
    classicNote: "CLRS uses Fibonacci to introduce dynamic programming (Ch. 15).",
    complexity: "Naive O(2^n) · DP O(n)",
    sources: ["CLRS", "SKIENA"],
    chapter: "Ch. 15",
  },
  "Ackermann Function": {
    id: "ackermann",
    title: "Ackermann Function",
    definition:
      "A total computable function that grows faster than any primitive recursive function — demonstrates recursion's power and danger.",
    classicNote: "Horowitz cites Ackermann to show not all recursive functions are primitive recursive.",
    sources: ["HOROWITZ", "KNUTH"],
    chapter: "§4.2",
  },
  "Towers of Hanoi": {
    id: "hanoi",
    title: "Tower of Hanoi",
    definition:
      "Move n disks between three pegs, never placing larger on smaller. Requires 2^n − 1 moves — exponential.",
    classicNote: "François Édouard Lucas, 1883. Knuth calls it 'a classic pedagogical problem.'",
    mnemonic: "Move n disks? First move n−1 out of the way.",
    complexity: "O(2^n) moves",
    sources: ["KNUTH", "CLRS"],
    chapter: "Ex. 4.4",
    visualizeHref: "/visualize/hanoi",
  },
  "Memory Representation": {
    id: "ll-memory",
    title: "Linked List Memory",
    definition:
      "Nodes scattered in heap memory, connected by pointers. No wasted capacity, but no O(1) random access.",
    classicNote: "Goodrich: 'a linked list trades indexing power for insertion flexibility.'",
    sources: ["GOODRICH", "WEISS"],
    chapter: "Ch. 3",
    visualizeHref: "/visualize/linked-list",
  },
  "Traversing & Searching": {
    id: "ll-traverse",
    title: "List Traversal & Search",
    definition: "Start at head, follow next pointers until null or target found. Search is O(n).",
    complexity: "O(n)",
    sources: ["WEISS", "HOROWITZ"],
    chapter: "§3.2",
    visualizeHref: "/visualize/linked-list",
  },
  "Insertion & Deletion": {
    id: "ll-insert-delete",
    title: "List Insert & Delete",
    definition:
      "Insert at head O(1), at tail O(n) without tail pointer. Delete requires finding predecessor O(n).",
    complexity: "Insert head O(1) · Delete O(n)",
    sources: ["GOODRICH", "SEDGEWICK"],
    chapter: "§3.3",
    visualizeHref: "/visualize/linked-list",
  },
  "Circular Linked Lists": {
    id: "circular-ll",
    title: "Circular Linked List",
    definition: "Last node's next points to head. No null terminator — useful for round-robin scheduling.",
    mnemonic: "Roundabout — no dead end, only the loop.",
    sources: ["HOROWITZ", "WEISS"],
    chapter: "§3.4",
    visualizeHref: "/visualize/linked-list",
  },
  "Header Linked Lists": {
    id: "header-ll",
    title: "Header (Sentinel) Node",
    definition:
      "Dummy node at head simplifies insert/delete code by eliminating special cases for empty lists.",
    classicNote: "CLRS uses sentinels extensively to reduce boundary-case bugs.",
    sources: ["CLRS", "KNUTH"],
    chapter: "§10.4",
  },
  "Two-Way (Doubly) Lists": {
    id: "doubly-ll",
    title: "Doubly Linked List",
    definition:
      "Each node has next and prev pointers. Delete a known node in O(1). Used in LRU caches.",
    complexity: "Delete known node O(1)",
    sources: ["GOODRICH", "WEISS"],
    chapter: "Ch. 4",
    visualizeHref: "/visualize/linked-list",
  },
  "Algorithm & Flowcharting": {
    id: "flowchart",
    title: "Algorithms & Flowcharts",
    definition:
      "An algorithm is a finite sequence of unambiguous steps. Flowcharts visualize control flow with standard symbols.",
    classicNote: "Horowitz opens every chapter with pseudocode before analysis — the classical presentation style.",
    sources: ["HOROWITZ", "AHU"],
    chapter: "Ch. 1",
  },
  "Asymptotic Notations": {
    id: "asymptotic",
    title: "Asymptotic Notation",
    definition:
      "O (upper bound), Ω (lower bound), Θ (tight bound). Describe growth rate as n → ∞, ignoring constants.",
    classicNote: "CLRS Ch. 3 is the gold standard — 'a loose upper bound' vs 'asymptotically tight bound.'",
    mnemonic: "O is 'at most', Ω is 'at least', Θ is 'exactly the order of'.",
    sources: ["CLRS", "SEDGEWICK"],
    chapter: "Ch. 3",
    keyOperations: ["O", "Ω", "Θ", "o", "ω"],
  },
  "Best Case Analysis": {
    id: "best-case",
    title: "Best-Case Analysis",
    definition: "Minimum time over all inputs of size n. Often optimistic — rarely the operational guarantee.",
    classicNote: "Insertion sort: O(n) best case when array is already sorted.",
    sources: ["CLRS", "HOROWITZ"],
    chapter: "Ch. 3",
  },
  "Worst Case Analysis": {
    id: "worst-case",
    title: "Worst-Case Analysis",
    definition: "Maximum time over all inputs of size n. Provides a guarantee — preferred in real-time systems.",
    classicNote: "Quicksort worst case O(n²) when pivot is always min/max — motivates randomized pivot.",
    sources: ["CLRS", "SKIENA"],
    chapter: "Ch. 3",
  },
  "Average Case Analysis": {
    id: "average-case",
    title: "Average-Case Analysis",
    definition: "Expected time over a probability distribution of inputs. Quicksort averages O(n log n).",
    classicNote: "CLRS uses indicator random variables for elegant average-case proofs.",
    sources: ["CLRS"],
    chapter: "Ch. 7",
  },
  "Complexity of Specific Algorithms": {
    id: "complexity-table",
    title: "Complexity Reference",
    definition:
      "Binary search O(log n), merge sort O(n log n), BFS/DFS O(V+E), Dijkstra O((V+E) log V) with heap.",
    classicNote: "Skiena's 'war stories' appendix is a practitioner's cheat sheet.",
    sources: ["SKIENA", "CLRS"],
    chapter: "Appendix",
  },
  "Linear & Binary Search": {
    id: "search",
    title: "Searching",
    definition:
      "Linear: check every element O(n). Binary: halve sorted array O(log n). Binary requires sorted data.",
    mnemonic: "Linear reads every page; binary opens to the middle.",
    complexity: "Linear O(n) · Binary O(log n)",
    sources: ["CLRS", "SEDGEWICK"],
    chapter: "Ch. 2",
    visualizeHref: "/visualize/search",
  },
  "Insertion / Selection Sort": {
    id: "insertion-selection",
    title: "Insertion & Selection Sort",
    definition:
      "Insertion: build sorted prefix by inserting each element. Selection: repeatedly pick minimum. Both O(n²).",
    classicNote: "Insertion sort is optimal for small n and nearly-sorted data — used in Timsort hybrids.",
    complexity: "O(n²)",
    sources: ["CLRS", "SEDGEWICK"],
    chapter: "Ch. 2",
    visualizeHref: "/visualize/sorting",
  },
  "Bubble / Quick / Merge Sort": {
    id: "sorting",
    title: "Sorting Algorithms",
    definition:
      "Bubble O(n²) didactic. Merge O(n log n) stable divide-and-conquer. Quick O(n log n) average, in-place partition.",
    classicNote: "CLRS Ch. 2 (insertion) and Ch. 7 (quicksort) — merge sort appears in Ch. 2 and Ch. 4.",
    complexity: "Bubble O(n²) · Merge O(n log n) · Quick O(n log n) avg",
    sources: ["CLRS", "SEDGEWICK", "KNUTH"],
    chapter: "Ch. 2, 7",
    visualizeHref: "/visualize/sorting",
  },
  "Hash Function architecture": {
    id: "hashing",
    title: "Hash Tables",
    definition:
      "Map keys to array indices via h(k). Average O(1) lookup if load factor is bounded and hash distributes well.",
    classicNote: "Knuth Vol. 3 is the definitive treatment of hashing and collision resolution.",
    mnemonic: "Pigeonholes — each letter goes to a numbered slot.",
    complexity: "Average O(1) · Worst O(n)",
    sources: ["KNUTH", "CLRS"],
    chapter: "Ch. 11",
    keyOperations: ["Hash", "Insert", "Lookup", "Rehash"],
  },
  "Collision Resolution strategies": {
    id: "collision",
    title: "Collision Resolution",
    definition:
      "Chaining: linked lists at each bucket. Open addressing: probe sequence (linear, quadratic, double hashing).",
    classicNote: "CLRS analyzes open addressing load factor α and expected probe length.",
    sources: ["CLRS", "KNUTH"],
    chapter: "Ch. 11",
    prosCons: {
      pros: ["Chaining simple with dynamic size", "Open addressing cache-friendly"],
      cons: ["Clustering in linear probing", "Chaining pointer overhead"],
    },
  },
  "Tree Terminology": {
    id: "tree-terms",
    title: "Tree Terminology",
    definition:
      "Root, parent, child, leaf, depth, height, subtree. Binary tree: at most two children per node.",
    classicNote: "Knuth defines trees formally as recursive structures — root with zero or more subtrees.",
    sources: ["KNUTH", "CLRS"],
    chapter: "Ch. 10",
    keyOperations: ["Root", "Leaf", "Height", "Depth", "Subtree"],
    visualizeHref: "/visualize/tree",
  },
  "Binary Tree Memory representation": {
    id: "bt-memory",
    title: "Binary Tree Representation",
    definition:
      "Linked nodes (left/right pointers) or array (index 2i+1, 2i+2 for children). Array form suits complete trees.",
    classicNote: "Heaps use array representation — CLRS Ch. 6.",
    sources: ["CLRS", "WEISS"],
    chapter: "Ch. 6",
    visualizeHref: "/visualize/tree",
  },
  "Binary Tree Traversals": {
    id: "bt-traversal",
    title: "Tree Traversals",
    definition:
      "Inorder (LNR): sorted for BST. Preorder (NLR): copy tree. Postorder (LRN): delete tree. Level-order: BFS queue.",
    mnemonic: "In-order = left, node, right — 'in' the middle for BST sorted output.",
    complexity: "O(n) each",
    sources: ["CLRS", "SEDGEWICK"],
    chapter: "Ch. 12",
    visualizeHref: "/visualize/tree",
  },
  "Balanced BST (AVL & Red-Black)": {
    id: "balanced-trees",
    title: "Balanced Search Trees",
    definition:
      "AVL: balance factor ∈ {−1,0,1}, stricter. Red-Black: color invariants, fewer rotations on insert. Both O(log n).",
    classicNote: "CLRS Ch. 13 — red-black trees power std::map and Java TreeMap.",
    complexity: "Search/Insert/Delete O(log n)",
    sources: ["CLRS", "SEDGEWICK"],
    chapter: "Ch. 13",
    visualizeHref: "/visualize/tree",
  },
  "Heaps & Heap Sort": {
    id: "heaps",
    title: "Heaps & Heap Sort",
    definition:
      "Complete binary tree with heap property. Max-heap: parent ≥ children. BUILD-HEAP O(n), HEAPSORT O(n log n) in-place.",
    classicNote: "Williams (1964) invented heapsort; Floyd gave the O(n) build-heap analysis.",
    mnemonic: "The king sits at the root — always the max (or min).",
    complexity: "Insert O(log n) · BUILD-HEAP O(n) · SORT O(n log n)",
    sources: ["CLRS", "KNUTH"],
    chapter: "Ch. 6",
    visualizeHref: "/visualize/tree",
  },
  "B Trees & General Tree logic": {
    id: "btree",
    title: "B-Trees",
    definition:
      "Self-balancing tree with many keys per node — minimizes disk I/O. Foundation of database indexes (B+ trees).",
    classicNote: "CLRS Ch. 18: 'B-trees are designed for storage on secondary memory.'",
    complexity: "Search/Insert O(log n) with high branching factor",
    sources: ["CLRS", "KNUTH"],
    chapter: "Ch. 18",
    useCases: ["Database indexes", "File systems", "Large-scale storage"],
  },
};

export function getTopicDetail(conceptKey: string): TopicDetail {
  return (
    TOPIC_DETAILS[conceptKey] ?? {
      id: conceptKey.toLowerCase().replace(/\s+/g, "-"),
      title: conceptKey,
      definition: `Classical treatment of "${conceptKey}" as covered in standard algorithms curricula.`,
      classicNote: "Consult CLRS, Sedgewick, or Horowitz & Sahni for the canonical presentation.",
      sources: ["CLRS"],
      mnemonic: `Master "${conceptKey}" step by step — then visualize it.`,
    }
  );
}
