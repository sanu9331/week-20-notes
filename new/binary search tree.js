class Node {
    constructor(key) {
        this.key = key;      // Key of the node
        this.left = null;   // Left child
        this.right = null;  // Right child
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;  // Root of the BST
    }

    // Insert a key into the BST
    insert(key) {
        const newNode = new Node(key);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this._insertRec(this.root, newNode);
        }
    }

    // Recursive helper function for insertion
    _insertRec(node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this._insertRec(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this._insertRec(node.right, newNode);
            }
        }
    }

    // Search for a key in the BST
    search(key) {
        return this._searchRec(this.root, key);
    }

    // Recursive helper function for search
    _searchRec(node, key) {
        if (node === null) {
            return false;  // Key not found
        }
        if (key === node.key) {
            return true;   // Key found
        } else if (key < node.key) {
            return this._searchRec(node.left, key);
        } else {
            return this._searchRec(node.right, key);
        }
    }

    //***********tree traversal********************

    // Pre-order traversal
    preOrder(root) {
        let result = [];
        this._preOrderRec(root, result);
        return result;
    }

    _preOrderRec(node, result) {
        if (node) {
            result.push(node.key);
            this._preOrderRec(node.left, result);
            this._preOrderRec(node.right, result);
        }
    }

    // In-order traversal
    inOrder(root) {
        let result = [];
        this._inOrderRec(root, result);
        return result;
    }

    _inOrderRec(node, result) {
        if (node) {
            this._inOrderRec(node.left, result);
            result.push(node.key);
            this._inOrderRec(node.right, result);
        }
    }

    // Post-order traversal
    postOrder(root) {
        let result = [];
        this._postOrderRec(root, result);
        return result;
    }

    _postOrderRec(node, result) {
        if (node) {
            this._postOrderRec(node.left, result);
            this._postOrderRec(node.right, result);
            result.push(node.key);
        }
    }

    bfs(root) {
        let result = [];
        let queue = [];
        queue.push(root);
        while (queue.length > 0) {
            let curr = queue.shift();
            result.push(curr.key);
            if (curr.left) {
                queue.push(curr.left);
            }
            if (curr.right) {
                queue.push(curr.right);
            }
        }
        return result;
    }

    //min value
    min(root) {
        if (!root.left) {
            return root.key;
        } else {
            return this.min(root.left);
        }

    }

    //max value
    max(root) {
        if (!root.right) {
            return root.key;
        } else {
            return this.max(root.right);
        }

    }

    //delete node
    delete(value) {
        this.root = this.deleteNode(this.root, value);
    }

    deleteNode(root, value) {
        if (root === null) {
            return root;
        }
        if (value < root.key) {
            root.left = this.deleteNode(root.left, value);
        } else if (value > root.key) {
            root.right = this.deleteNode(root.right, value);
        } else {
            // Case 1: Node with no child (leaf node)
            if (!root.left && !root.right) {
                return null;
            }
            // Case 2: Node with one child (left or right)
            if (!root.left) {
                return root.right;
            } else if (!root.right) {
                return root.left;
            }
            // Case 3: Node with two children
            // Find the minimum value in the right subtree (successor)
            root.key = this.min(root.right);
            root.right = this.deleteNode(root.right, root.key);
        }
        return root;
    }


}

// Example usage
const bst = new BinarySearchTree();

// Inserting values
bst.insert(50);
bst.insert(30);
bst.insert(70);
bst.insert(20);
bst.insert(40);
bst.insert(60);
bst.insert(80);

// Searching for values
console.log(bst.search(40)); // Output: true
console.log(bst.search(25)); // Output: false

// Traversals
console.log("Pre-order traversal:");
console.log(bst.preOrder(bst.root)); // Output: [50, 30, 20, 40, 70, 60, 80]

console.log("In-order traversal:");
console.log(bst.inOrder(bst.root)); // Output: [20, 30, 40, 50, 60, 70, 80]

console.log("Post-order traversal:");
console.log(bst.postOrder(bst.root)); // Output: [20, 40, 30, 60, 80, 70, 50]

console.log("BFS traversal:", bst.bfs(bst.root)); // Output: [50, 30, 70, 20, 40, 60, 80]

console.log("Min value:", bst.min(bst.root)); // Output: 20
console.log("Max value:", bst.max(bst.root)); // Output: 80

bst.delete(20); // Deleting a node with two children

console.log("In-order traversal:", bst.inOrder(bst.root)); // [40, 60, 70, 80]
