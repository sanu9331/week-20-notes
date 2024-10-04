class QuadraticProbingHashTable {
    constructor(size) {
        this.size = size;
        this.table = new Array(size).fill(null);
    }

    // Hash function
    hash(key) {
        return key % this.size;
    }

    // Insert key-value pair using quadratic probing
    insert(key, value) {
        let index = this.hash(key);
        let i = 0;

        while (this.table[index] !== null && this.table[index].key !== key) {
            i++;
            index = (this.hash(key) + i * i) % this.size;
        }
        this.table[index] = { key, value }; // Insert or update the key-value pair
    }

    // Retrieve value by key using quadratic probing
    get(key) {
        let index = this.hash(key);
        let i = 0;

        while (this.table[index] !== null) {
            if (this.table[index].key === key) {
                return this.table[index].value; // Return the value if key is found
            }
            i++;
            index = (this.hash(key) + i * i) % this.size;
        }
        return null; // Key not found
    }

    // Delete key-value pair using quadratic probing
    delete(key) {
        let index = this.hash(key);
        let i = 0;

        while (this.table[index] !== null) {
            if (this.table[index].key === key) {
                this.table[index] = null; // Mark the slot as deleted
                return;
            }
            i++;
            index = (this.hash(key) + i * i) % this.size;
        }
    }
}

// Example usage
const hashTable = new QuadraticProbingHashTable(10);
hashTable.insert(1, 'one');
hashTable.insert(11, 'eleven'); // This should go to a different slot due to quadratic probing
console.log(hashTable.get(1));   // Output: 'one'
console.log(hashTable.get(11));  // Output: 'eleven'

// Delete key 1
console.log(hashTable.get(1));   // Output: null (key 1 is deleted)
console.log(hashTable.get(11));  // Output: 'eleven' (key 11 is still there)
