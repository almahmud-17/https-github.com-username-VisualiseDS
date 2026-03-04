import { AnimationStep } from "./bubbleSort";

export const getQuickSortSteps = (arr: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const array = [...arr];

    const partition = (low: number, high: number): number => {
        const pivot = array[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            steps.push({
                array: [...array],
                comparingIndices: [j, high],
                swappingIndices: [],
                sortedIndices: [],
            });

            if (array[j] < pivot) {
                i++;
                [array[i], array[j]] = [array[j], array[i]];
                steps.push({
                    array: [...array],
                    comparingIndices: [],
                    swappingIndices: [i, j],
                    sortedIndices: [],
                });
            }
        }

        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        steps.push({
            array: [...array],
            comparingIndices: [],
            swappingIndices: [i + 1, high],
            sortedIndices: [],
        });

        return i + 1;
    };

    const quickSort = (low: number, high: number) => {
        if (low < high) {
            const pi = partition(low, high);
            quickSort(low, pi - 1);
            quickSort(pi + 1, high);
        }
    };

    quickSort(0, array.length - 1);

    // Final sorted state
    steps.push({
        array: [...array],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({ length: array.length }, (_, k) => k),
    });

    return steps;
};
