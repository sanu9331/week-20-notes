class Node {
    constructor(key, value, next = null) {
        this.key = key;        // Key of the node
        this.value = value;    // Value associated with the key
        this.next = next;      // Pointer to the next node in the list
    }
}

class HashTable {
    constructor(size = 5) {
        this.size = size;               // Number of buckets in the hash table
        this.buckets = Array(size).fill(null); // Initialize buckets with null
    }

    // Hash function to compute index for a given key
    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i) * i) % this.size; // Simple hash function
        }
        return hash;
    }

    // Insert or update a key-value pair
    set(key, value) {
        const index = this.hash(key);       // Compute index using hash function
        let head = this.buckets[index];     // Get current head of the bucket
        let current = head;

        // Traverse the linked list to see if the key exists
        while (current) {
            if (current.key === key) {
                current.value = value; // Update the value if key exists
                return;
            }
            current = current.next; // Move to next node
        }

        // Key is not found, create a new node and add it to the front of the list
        this.buckets[index] = new Node(key, value, head); // New node points to the current head
    }

    // Retrieve value by key
    get(key) {
        const index = this.hash(key);     // Compute index using hash function
        let current = this.buckets[index]; // Get current head of the bucket

        // Traverse the linked list to find the key
        while (current) {
            if (current.key === key) {
                return current.value; // Return value if key is found
            }
            current = current.next; // Move to next node
        }
        return undefined; // Return undefined if key is not found
    }

    // Delete a key-value pair
    delete(key) {
        const index = this.hash(key);     // Compute index using hash function
        let current = this.buckets[index]; // Get current head of the bucket
        let prev = null;                  // Previous node (for unlinking)

        // Traverse the linked list to find the key
        while (current) {
            if (current.key === key) {
                if (prev) {
                    prev.next = current.next; // Unlink the node
                } else {
                    this.buckets[index] = current.next; // Update head of the list
                }
                return; // Exit after deletion
            }
            prev = current; // Update previous node
            current = current.next; // Move to next node
        }
    }

    // Display the contents of the hash table
    display() {
        this.buckets.forEach((bucket, index) => {
            let current = bucket;
            let result = '';
            while (current) {
                result += `[${current.key}: ${current.value}] -> `; // Collect node info
                current = current.next; // Move to next node
            }

            console.log(`Bucket ${index}: ${result}None`); // Print the bucket
        });
    }
}


const hashTable = new HashTable();

// Insert key-value pairs
hashTable.set('name', 'Alice');
hashTable.set('age', '30');
hashTable.set('city', 'Wonderland');
hashTable.set('sanu', '29');
hashTable.set('manu', '129');
hashTable.set('thanu', '229');
hashTable.set('than', '229');
hashTable.set('name', 'Bob');  // Update 'name' to 'Bob'

// Retrieve values
console.log(hashTable.get('name')); // Output: Bob
console.log(hashTable.get('age'));  // Output: 30
console.log(hashTable.get('city')); // Output: Wonderland

// Delete a key
hashTable.delete('city');
console.log(hashTable.get('city')); // Output: undefined

// Display hash table contents
hashTable.display();
