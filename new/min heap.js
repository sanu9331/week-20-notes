class MinHeap {
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

        // Bubble up the new element to maintain min-heap property
        while (i > 0 && heap[this.parent(i)] > heap[i]) { // Compare with parent to maintain min-heap
            [heap[i], heap[this.parent(i)]] = [heap[this.parent(i)], heap[i]];
            i = this.parent(i);
        }
    }

    deleteMin() {  // Corrected method name from deleteMax to deleteMin
        const { heap } = this;
        if (heap.length === 0) return null; // No elements to delete
        if (heap.length === 1) return heap.pop(); // Only one element

        const min = heap[0]; // The root contains the min value
        heap[0] = heap.pop(); // Replace root with last element

        let i = 0; // Start heapifying from the root
        while (true) {
            const left = 2 * i + 1; // Left child index
            const right = 2 * i + 2; // Right child index
            let smallest = i;

            // Determine the smallest among root, left, and right
            if (left < heap.length && heap[left] < heap[smallest]) {
                smallest = left;
            }

            if (right < heap.length && heap[right] < heap[smallest]) {
                smallest = right;
            }

            if (smallest !== i) {
                [heap[i], heap[smallest]] = [heap[smallest], heap[i]]; // Swap with smallest child
                i = smallest; // Move to the new index to continue heapifying
            } else {
                break; // The heap property is restored
            }
        }
        return min; // Return the minimum value
    }

    printHeap() {
        console.log(this.heap);
    }
}

// Example usage
const minHeap = new MinHeap();
const keys = [4, 7, 1, 9, 5, 3];

keys.forEach(key => minHeap.insert(key));

minHeap.printHeap(); // Output: Min-heap array after insertion
minHeap.deleteMin(); // Corrected from deleteMax to deleteMin
minHeap.printHeap(); // Output should be the heap after deleting the min value
