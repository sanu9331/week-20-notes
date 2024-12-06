class Node {
    constructor(data) {
        this.data = data
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    prepend(data) {
        const node = new Node(data);
        if (this.head === null) {
            this.head = node;
        } else {
            node.next = this.head;
            this.head = node
        }

    }

    print() {
        let curr = this.head;
        let listValues = '';

        while (curr !== null) {
            listValues += curr.data + '->'
            curr = curr.next;
        }
        console.log(listValues);
    }

    append(data) {
        const node = new Node(data);
        if (this.head === null) {
            console.log('empty')
        } else {
            let curr = this.head;
            while (curr.next !== null) {
                curr = curr.next;
            }
            curr.next = node
        }
    }

    insert(data, index) {
        if (this.head === null || index < 0) {
            return 'empty';
        }
        if (index === 0) {
            this.prepend(data);
            return
        } else {
            const node = new Node(data);
            let curr = this.head;
            for (let i = 0; i < index - 1; i++) {
                curr = curr.next;
            }
            node.next = curr.next
            curr.next = node
        }
    }

    remove(index) {
        let removeIndex;
        if (this.head === null) {
            return 'empty';
        }
        if (index === 0) {
            this.head = this.head.next;
        } else {
            let curr = this.head;

            for (let i = 0; i < index - 1; i++) {
                curr = curr.next;
            }
            removeIndex = curr.next;
            curr.next = removeIndex.next;
        }
    }

    removeAtValue(value) {
        let curr = this.head;
        let prev;
        let removeNode;
        if (this.head === null) {
            return 'List is empty';
        }
        if (this.head.data === value) {
            this.head = this.head.next;
            return
        } else {
            while (curr.data !== value && curr !== null) {
                prev = curr;
                curr = curr.next
            }
            removeNode = curr.next;
            prev.next = removeNode;

        }

    }

    // printReverse() {
    //     let curr = this.head;
    //     let stack = [];
    //     while (curr !== null) {
    //         stack.push(curr.data);
    //         curr = curr.next;
    //     }
    //     let reversedList = '';

    //     while (stack.length > 0) {
    //         reversedList += stack.pop() + '->';
    //         // reversedList += stack.pop();
    //         // if (stack.length > 0) {
    //         //     reversedList += '->';
    //         // }
    //     }

    //     console.log('reverse:', reversedList);
    // }
 printReverse() {
    let prev = null;
    let curr = this.head;
    while (curr) {
      let next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    this.head = prev;
     console.log('Reversed list:');
        this.print();
  }
}

const list = new LinkedList();
list.prepend(10)
// list.prepend(20)
list.print();
console.log('----')
list.append(50);
list.append(60);
list.append(70);
list.print();
list.insert(44, 3);
list.print();
// list.remove(2);
list.removeAtValue(10)
list.print()

list.printReverse();
