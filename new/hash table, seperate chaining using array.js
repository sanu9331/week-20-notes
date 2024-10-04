//seperate chaining
class HashTableWithCollision {
    constructor(size = 10) {
        this.table = new Array(size);
        this.size = size;
    }

    // Hash function
    hash(key) {
        let hashValue = 0;
        for (let i = 0; i < key.length; i++) {
            hashValue += key.charCodeAt(i);
        }
        return hashValue % this.size;
    }

    // Set key-value pair with collision handling
    set(key, value) {
        const index = this.hash(key);
        if (!this.table[index]) {
            this.table[index] = [];
        }

        // Find if key exists in the bucket
        const sameKeyItem = this.table[index].find((item) => item[0] === key);
        if (sameKeyItem) {
            sameKeyItem[1] = value;  // Update value if key exists
        } else {
            this.table[index].push([key, value]);  // Add new key-value pair
        }
    }

    // Get value by key
    get(key) {
        const index = this.hash(key);
        const bucket = this.table[index];
        if (bucket) {
            const sameKeyItem = bucket.find((item) => item[0] === key);
            if (sameKeyItem) {
                return sameKeyItem[1];
            }
        }
        return undefined;
    }

    // Display hash table
    display() {
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i]) {
                console.log(i, this.table[i]);
            }
        }
    }
}

// Usage
const tableWithCollision = new HashTableWithCollision(10);
tableWithCollision.set("sanu", 21);
tableWithCollision.set("manu", 17);  // No overwrite, handled by collision resolution
tableWithCollision.set("manu", 99);  // Update value for 'manu'
tableWithCollision.set("nanu", 50);
tableWithCollision.set("anu", 50); // Could hash to the same index as "sanu" or "manu"

tableWithCollision.display();
console.log(tableWithCollision.get("manu"));