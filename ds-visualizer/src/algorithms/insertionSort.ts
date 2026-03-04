import { AnimationStep } from "./bubbleSort";

export function getInsertionSortSteps(initialArray: number[]): AnimationStep[] {
    const steps: AnimationStep[] = [];
    const arr = [...initialArray];
    const n = arr.length;
    const sortedIndices: number[] = [0];

    // Initial state
    steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [],
    });

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        // Visualizing the element being picked
        steps.push({
            array: [...arr],
            comparingIndices: [i],
            swappingIndices: [],
            sortedIndices: [...Array.from({ length: i }, (_, k) => k)],
        });

        while (j >= 0 && arr[j] > key) {
            // Highlighting comparison
            steps.push({
                array: [...arr],
                comparingIndices: [j, j + 1],
                swappingIndices: [],
                sortedIndices: [...Array.from({ length: i }, (_, k) => k)],
            });

            // "Swap" logic (shift)
            arr[j + 1] = arr[j];

            // Highlighting swap/shift
            steps.push({
                array: [...arr],
                comparingIndices: [],
                swappingIndices: [j, j + 1],
                sortedIndices: [...Array.from({ length: i }, (_, k) => k)],
            });
            j = j - 1;
        }
        arr[j + 1] = key;

        // Key inserted
        steps.push({
            array: [...arr],
            comparingIndices: [],
            swappingIndices: [j + 1],
            sortedIndices: [...Array.from({ length: i + 1 }, (_, k) => k)],
        });
    }

    // Final sorted state
    steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({ length: n }, (_, k) => k),
    });

    return steps;
}
