import { AnimationStep } from "./bubbleSort";

export const getSelectionSortSteps = (arr: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const array = [...arr];
    const n = array.length;

    // Initial state
    steps.push({
        array: [...array],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [],
    });

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            // Comparing current j with minIdx
            steps.push({
                array: [...array],
                comparingIndices: [minIdx, j],
                swappingIndices: [],
                sortedIndices: Array.from({ length: i }, (_, k) => k),
            });

            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }

        if (minIdx !== i) {
            // Swapping min element with i
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            steps.push({
                array: [...array],
                comparingIndices: [],
                swappingIndices: [i, minIdx],
                sortedIndices: Array.from({ length: i }, (_, k) => k),
            });
        }

        // After each outer loop iteration, element i is sorted
        steps.push({
            array: [...array],
            comparingIndices: [],
            swappingIndices: [],
            sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
        });
    }

    // Final sorted state
    steps.push({
        array: [...array],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({ length: n }, (_, k) => k),
    });

    return steps;
};
