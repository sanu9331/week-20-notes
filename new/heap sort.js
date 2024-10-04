//heap sort
function heapSort(array) {
    // Build max heap
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
        heapify(array, array.length, i);
    }

    // Extract elements from the heap one by one
    for (let i = array.length - 1; i > 0; i--) {
        // Swap the root (maximum value) of the heap with the last element
        [array[0], array[i]] = [array[i], array[0]];

        // Heapify the reduced heap
        heapify(array, i, 0);
    }

    return array;
}

// Function to heapify a subtree rooted with node i which is an index in array[]
function heapify(array, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        heapify(array, n, largest);
    }
}

// Example usage:
const array = [12, 11, 13, 5, 6, 7];
console.log("Original array: ", array);
console.log("Sorted array: ", heapSort(array));