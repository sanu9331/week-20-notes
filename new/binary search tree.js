class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  isEmpty() {
    return this.root === null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(root, newNode) {
    if (newNode.value < root.value) {
      if (root.left === null) {
        root.left = newNode;
      } else {
        this.insertNode(root.left, newNode);
      }
    } else {
      if (root.right === null) {
        root.right = newNode;
      } else {
        this.insertNode(root.right, newNode);
      }
    }
  }

  search(root, value) {
    if (!root) {
      return false;
    }
    if (root.value === value) {
      return true;
    } else if (value < root.value) {
      return this.search(root.left, value);
    } else {
      return this.search(root.right, value);
    }
  }

  min(root) {
    if (!root.left) {
      return root.value;
    } else {
      return this.min(root.left);
    }
  }

  max(root) {
    if (!root.right) {
      return root.value;
    } else {
      return this.max(root.right);
    }
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

 deleteNode(root, value) {
    // Step 1: Base case - if the root is null, return null (node not found)
    if (root === null) {
        return root;
    }
    // Step 2: If the value to delete is smaller than the root value, go to the left subtree
    if (value < root.value) {
        root.left = this.deleteNode(root.left, value);
    }
    // Step 3: If the value to delete is greater than the root value, go to the right subtree
    else if (value > root.value) {
        root.right = this.deleteNode(root.right, value);
    }
    // Step 4: If the value matches the root value, this is the node to be deleted
    else {
        // Case 1: The node has no children (leaf node)
        if (!root.left && !root.right) {
            return null; // Remove the node by returning null
        }

        // Case 2: The node has one child (either left or right)
        if (!root.left) {
            return root.right; // If no left child, replace with right child
        } else if (!root.right) {
            return root.left; // If no right child, replace with left child
        }

        // Case 3: The node has two children
        // To delete a node with two children, we need to find its in-order successor
        // (the smallest node in the right subtree), replace the node's value with
        // the in-order successor's value, and delete the in-order successor.
        
        root.value = this.min(root.right); // Replace root value with in-order successor's value
        
        // Recursively delete the in-order successor (which is now at the right subtree)
        root.right = this.deleteNode(root.right, root.value);
    }
    // Step 5: Return the modified root
    return root;
}



//DFS (depth first search)
  inOrder(root) {
    if (root) {
      this.inOrder(root.left);
      console.log(root.value);
      this.inOrder(root.right);
    }
  }

  preOrder(root) {
    if (root) {
      console.log(root.value);
      this.preOrder(root.left);
      this.preOrder(root.right);
    }
  }

  postOrder(root) {
    if (root) {
      this.postOrder(root.left);
      this.postOrder(root.right);
      console.log(root.value);
    }
  }


//BFS (breadth first search)
  levelOrder() {
    /** Use the optimised queue enqueue and dequeue from queue-object.js instead.
     * I've used an array for simplicity. */
    const queue = [];
    queue.push(this.root);
    while (queue.length) {
      let curr = queue.shift();
      console.log(curr.value);
      if (curr.left) {
        queue.push(curr.left);
      }
      if (curr.right) {
        queue.push(curr.right);
      }
    }
  }

  height(node) {
    if (!node) {
      return 0;
    } else {
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    }
  }

  printLevel(node, level) {
    if (!node) {
      return;
    }
    if (level === 1) {
      console.log(`levell==${node.value} `);
    } else if (level > 1) {
      this.printLevel(node.left, level - 1);
      this.printLevel(node.right, level - 1);
    }
  }

  isBST(node, min, max) {
    if (!node) {
      return true;
    }
    if (node.value < min || node.value > max) {
      return false;
    }
    return (
      this.isBST(node.left, min, node.value) &&
      this.isBST(node.right, node.value, max)
    );
  }
}

// TODO level order and delete

const bst = new BinarySearchTree();
console.log(bst.isEmpty());
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
bst.insert(13);
bst.insert(17);
bst.insert(2);
console.log(bst.search(bst.root, 10)); // true
console.log(bst.search(bst.root, 7));  // true
bst.inOrder(); // 2 3 5 7 10 13 15 17
bst.preOrder(); // 10 5 3 2 7 15 13 17
bst.postOrder(); // 2 3 7 5 13 17 15 10
bst.levelOrder(); // 10 5 15 3 7 13 17 2
bst.printLevel(bst.root, 2); // levell==5 levell==15
console.log(bst.min(bst.root)); // 2
console.log(bst.max(bst.root)); // 17
console.log(bst.height(bst.root)); // 4
