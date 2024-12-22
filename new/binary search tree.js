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

  delete(root, value) {
    if (root === null) {
        return root; // Node not found
    }

    // Traverse the tree to find the node to delete
    if (value < root.value) {
        root.left = this.delete(root.left, value);
    } else if (value > root.value) {
        root.right = this.delete(root.right, value);
    } else {
        // Node to be deleted found

        // Case 1: No children
        if (!root.left && !root.right) {
            return null;
        }

        // Case 2: One child
        if (!root.left) {
            return root.right;
        } else if (!root.right) {
            return root.left;
        }

        // Case 3: Two children
        // Find the in-order successor (smallest node in the right subtree)
        let minValue = this.min(root.right);
        root.value = minValue;

        // Delete the in-order successor
        root.right = this.delete(root.right, minValue);
    }

    return root; // Return the updated root
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

//check if its a valid binary search tree
isBST(root) {
      let result=[]
    if(this.root===null){
        return true;
    }
     this.INORDER(result,root);
     
     for(let i=0;i<result.length;i++){
         if(result[i]<=result[i-1]){
             return false
         }
     }
    return true;
  }
  
  INORDER(result,root){
      if(root){
          return this.INORDER(root.left)
           result.push(root.value);
           return this.INORDER(root.right)
      }
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
