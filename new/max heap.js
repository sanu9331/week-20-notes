class MaxHeap {
    constructor() {
        this.heap = [];
    }

    parent(i) {
        return Math.floor((i - 1) / 2);
    }

    insert(val) {
        const { heap } = this;
        heap.push(val); // Add new value to the end
        let i = heap.length - 1; // Index of the newly added element

        // Bubble up the new element to maintain max-heap property
        while (i > 0 && heap[this.parent(i)] < heap[i]) {
            [heap[i], heap[this.parent(i)]] = [heap[this.parent(i)], heap[i]];
            i = this.parent(i);
        }
    }

    deleteMax() {
        const { heap } = this;
        if (heap.length === 0) return null; // No elements to delete
        if (heap.length === 1) return heap.pop(); // Only one element

        const max = heap[0]; // The root contains the max value
        heap[0] = heap.pop(); // Replace root with last element

        let i = 0; // Start heapifying from the root
        while (true) {
            const left = 2 * i + 1; // Left child index
            const right = 2 * i + 2; // Right child index
            let largest = i;

            // Determine the largest among root, left, and right
            if (left < heap.length && heap[left] > heap[largest]) {
                largest = left;
            }

            if (right < heap.length && heap[right] > heap[largest]) {
                largest = right;
            }

            if (largest !== i) {
                [heap[i], heap[largest]] = [heap[largest], heap[i]]; // Swap with largest child
                i = largest; // Move to the new index to continue heapifying
            } else {
                break; // The heap property is restored
            }
        }
        return max; // Return the maximum value
    }

    printHeap() {
        console.log(this.heap);
    }
}

// Example usage
const maxHeap = new MaxHeap();
// const keys = [4, 7, 1, 9, 5, 3];
// keys.forEach(key => maxHeap.insert(key));

maxHeap.insert(10);
maxHeap.insert(20);
maxHeap.insert(30);
maxHeap.insert(40);

maxHeap.printHeap(); // Output: [9, 7, 4, 1, 5, 3]
maxHeap.deleteMax();
maxHeap.printHeap(); // Output should be the heap after deleting the max value
