class DoubleHashingHashTable {
    constructor(size) {
        this.size = size;
        this.table = new Array(size).fill(null);
    }

    hash1(key) {
        return key % this.size;
    }

    hash2(key) {
        return 1 + (key % (this.size - 1));
    }

    insert(key, value) {
        let index = this.hash1(key);
        let stepSize = this.hash2(key);

        while (this.table[index] !== null && this.table[index].key !== key) {
            index = (index + stepSize) % this.size;
        }

        this.table[index] = { key, value };
    }

    get(key) {
        let index = this.hash1(key);
        let stepSize = this.hash2(key);

        while (this.table[index] !== null) {
            if (this.table[index].key === key) {
                return this.table[index].value;
            }
            index = (index + stepSize) % this.size;
        }

        return null; // Key not found
    }

    delete(key) {
        let index = this.hash1(key);
        let stepSize = this.hash2(key);

        while (this.table[index] !== null) {
            if (this.table[index].key === key) {
                this.table[index] = 'DELETED'; // Mark slot as deleted
                return;
            }
            index = (index + stepSize) % this.size;
        }
    }
}

// Example usage
const hashTable = new DoubleHashingHashTable(10);
hashTable.insert(1, 'one');
console.log(hashTable.get(1)); // Output: 'one'

hashTable.insert(11, 'eleven'); // Should handle collisions
console.log(hashTable.get(11)); // Output: 'eleven'

hashTable.delete(1);
console.log(hashTable.get(1)); // Output: null (key 1 is deleted)
console.log(hashTable.get(11)); // Output: 'eleven' (key 11 is still there)
