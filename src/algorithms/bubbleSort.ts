export type AnimationStep = {
    array: number[];
    comparingIndices: number[];
    swappingIndices: number[];
    sortedIndices: number[];
};

export function getBubbleSortSteps(initialArray: number[]): AnimationStep[] {
    const steps: AnimationStep[] = [];
    const arr = [...initialArray];
    const n = arr.length;
    const sortedIndices: number[] = [];

    // Initial state
    steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [],
    });

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Comparing state
            steps.push({
                array: [...arr],
                comparingIndices: [j, j + 1],
                swappingIndices: [],
                sortedIndices: [...sortedIndices],
            });

            if (arr[j] > arr[j + 1]) {
                // Swap
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                // Swapping state
                steps.push({
                    array: [...arr],
                    comparingIndices: [],
                    swappingIndices: [j, j + 1],
                    sortedIndices: [...sortedIndices],
                });
            }
        }
        // Element n-i-1 is sorted
        sortedIndices.push(n - i - 1);
        steps.push({
            array: [...arr],
            comparingIndices: [],
            swappingIndices: [],
            sortedIndices: [...sortedIndices],
        });
    }

    // Final sorted state
    sortedIndices.push(0);
    steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [...sortedIndices],
    });

    return steps;
}
