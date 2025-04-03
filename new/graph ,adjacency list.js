class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = new Set();
    }
  }

  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) {
      this.addVertex(vertex1);
    }
    if (!this.adjacencyList[vertex2]) {
      this.addVertex(vertex2);
    }
    this.adjacencyList[vertex1].add(vertex2);
    this.adjacencyList[vertex2].add(vertex1);
  }

  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1].delete(vertex2);
    this.adjacencyList[vertex2].delete(vertex1);
  }

  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      return;
    }
    for (let adjacentVertex of this.adjacencyList[vertex]) {
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }

  hasEdge(vertex1, vertex2) {
    return (
      this.adjacencyList[vertex1].has(vertex2) &&
      this.adjacencyList[vertex2].has(vertex1)
    );
  }

  display() {
    for (let vertex in this.adjacencyList) {
      console.log(vertex + " -> " + [...this.adjacencyList[vertex]]);
    }
  }

  bfs(start) {
    const queue = [start];
    const visited = new Set();
    visited.add(start);

    while (queue.length > 0) {
      const vertex = queue.shift();
      console.log(vertex); // Process the vertex

      for (let neighbor of this.adjacencyList[vertex]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }
//DFS traversal
dfs(start){
       const stack=[start];
       const visited=new Set();
       visited.add(start)
       
       while(stack.length>0){
           const vertex=stack.pop()
           console.log(vertex);
           
           for(let item of this.adjacencyList[vertex]){
               if(!visited.has(item)){
                   visited.add(item)
                   stack.push(item)
               }
           }
       }
    }

}

const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "C");
graph.display();
console.log("BFS starting from vertex A:");
graph.bfs("A");
graph.dfs('A');
// graph.removeEdge("A", "B");
// graph.display();
// graph.removeVertex("A");
// graph.display();
