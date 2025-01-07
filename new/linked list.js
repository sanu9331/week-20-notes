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
            this.head = node;
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
            while (curr !== null && curr.data !== value) {
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

detectCycle(){
    let fast=this.head
    let slow=this.head
    
    while(fast!==null && fast.next!==null){
        slow=slow.next
        fast=fast.next.next
        if(slow===fast){
            return true
        }
    }
    return false
}

nodesCount(){
let curr=this.head;
let count=0
while(curr!==null){
    count++
    curr=curr.next
}
return count
}

  findmidElement(){
      let curr=this.head
      const res=this.nodesCount()
      let count=Math.floor(res/2)
      for(let i=0;i<count;i++){
          curr=curr.next
      }
      return curr.data
  }
  
  isPalindrome(){
      if(this.head===null){
          return true
      }
      
      let stack=[]
      let curr=this.head
      
      // Step 1: Push all values into the stack
      while(curr!==null){
          stack.push(curr.data)
          curr=curr.next
      }
      
        curr=this.head
      
      // Step 2: Traverse the list again and compare with stack
      while(curr!==null){
          const top=stack.pop()
          if(curr.data!==top){
              return false
          }
          curr=curr.next
      }
      return true
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
console.log('cyclic:',list.detectCycle())
console.log('node count:',list.nodesCount())
console.log('mid element=',list.findmidElement())
console.log('palindrome:',  list.isPalindrome())
