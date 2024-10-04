//linear probing
class LinearProbingHashTable {
    constructor(size) {
        this.size = size;
        this.table = new Array(size).fill(null);
    }

    hash(key) {
        return key % this.size;
    }

    insert(key, value) {
        let index = this.hash(key);
        while (this.table[index] !== null) {
            index = (index + 1) % this.size;
        }
        this.table[index] = { key, value };
    }

    get(key) {
        let index = this.hash(key);
        while (this.table[index] !== null) {
            if (this.table[index].key === key) {
                return this.table[index].value;
            }
            index = (index + 1) % this.size;
        }
        return null; // Key not found
    }
}

// Example usage
const hashTable = new LinearProbingHashTable(10);
hashTable.insert(1, 'one');
console.log(hashTable.get(1)); // Output: 'one'