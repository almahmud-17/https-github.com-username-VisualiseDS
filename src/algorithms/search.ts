export interface SearchStep {
    array: number[];
    currentIndex: number;
    low?: number;
    high?: number;
    mid?: number;
    found: boolean;
    foundIndex: number;
    message: string;
}

export const getLinearSearchSteps = (arr: number[], target: number): SearchStep[] => {
    const steps: SearchStep[] = [];
    let found = false;
    let foundIndex = -1;

    for (let i = 0; i < arr.length; i++) {
        steps.push({
            array: [...arr],
            currentIndex: i,
            found: false,
            foundIndex: -1,
            message: `Checking index ${i}: is ${arr[i]} == ${target}?`
        });

        if (arr[i] === target) {
            found = true;
            foundIndex = i;
            steps.push({
                array: [...arr],
                currentIndex: i,
                found: true,
                foundIndex: i,
                message: `Element found at index ${i}!`
            });
            break;
        }
    }

    if (!found) {
        steps.push({
            array: [...arr],
            currentIndex: -1,
            found: false,
            foundIndex: -1,
            message: `Element not found in the array.`
        });
    }

    return steps;
};

export const getBinarySearchSteps = (arr: number[], target: number): SearchStep[] => {
    const steps: SearchStep[] = [];
    const sortedArr = [...arr].sort((a, b) => a - b);
    let low = 0;
    let high = sortedArr.length - 1;
    let found = false;
    let foundIndex = -1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        steps.push({
            array: sortedArr,
            currentIndex: mid,
            low,
            high,
            mid,
            found: false,
            foundIndex: -1,
            message: `Searching in range [${low}, ${high}]. Mid is at index ${mid}.`
        });

        if (sortedArr[mid] === target) {
            found = true;
            foundIndex = mid;
            steps.push({
                array: sortedArr,
                currentIndex: mid,
                low,
                high,
                mid,
                found: true,
                foundIndex: mid,
                message: `Element found at index ${mid}!`
            });
            break;
        } else if (sortedArr[mid] < target) {
            low = mid + 1;
            steps.push({
                array: sortedArr,
                currentIndex: mid,
                low,
                high,
                mid,
                found: false,
                foundIndex: -1,
                message: `${sortedArr[mid]} is smaller than ${target}. Searching right half.`
            });
        } else {
            high = mid - 1;
            steps.push({
                array: sortedArr,
                currentIndex: mid,
                low,
                high,
                mid,
                found: false,
                foundIndex: -1,
                message: `${sortedArr[mid]} is larger than ${target}. Searching left half.`
            });
        }
    }

    if (!found) {
        steps.push({
            array: sortedArr,
            currentIndex: -1,
            found: false,
            foundIndex: -1,
            message: `Element not found in the array.`
        });
    }

    return steps;
};
