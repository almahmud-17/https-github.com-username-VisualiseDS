import { AnimationStep } from "./bubbleSort";

export const getMergeSortSteps = (arr: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const array = [...arr];

    const merge = (low: number, mid: number, high: number) => {
        const left = array.slice(low, mid + 1);
        const right = array.slice(mid + 1, high + 1);
        let i = 0, j = 0, k = low;

        while (i < left.length && j < right.length) {
            steps.push({
                array: [...array],
                comparingIndices: [low + i, mid + 1 + j],
                swappingIndices: [],
                sortedIndices: [],
            });

            if (left[i] <= right[j]) {
                array[k] = left[i];
                i++;
            } else {
                array[k] = right[j];
                j++;
            }
            k++;
            steps.push({
                array: [...array],
                comparingIndices: [],
                swappingIndices: [k - 1],
                sortedIndices: [],
            });
        }

        while (i < left.length) {
            array[k] = left[i];
            i++;
            k++;
            steps.push({
                array: [...array],
                comparingIndices: [],
                swappingIndices: [k - 1],
                sortedIndices: [],
            });
        }

        while (j < right.length) {
            array[k] = right[j];
            j++;
            k++;
            steps.push({
                array: [...array],
                comparingIndices: [],
                swappingIndices: [k - 1],
                sortedIndices: [],
            });
        }
    };

    const mergeSort = (low: number, high: number) => {
        if (low < high) {
            const mid = Math.floor((low + high) / 2);
            mergeSort(low, mid);
            mergeSort(mid + 1, high);
            merge(low, mid, high);
        }
    };

    mergeSort(0, array.length - 1);

    // Final sorted state
    steps.push({
        array: [...array],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({ length: array.length }, (_, k) => k),
    });

    return steps;
};
