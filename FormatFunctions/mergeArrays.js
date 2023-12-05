// Merges two arrays into one, removing duplicate elements.

function mergeArrays(arr1, arr2) {
    return [...new Set([...arr1, ...arr2])];
}
