/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    // let newNode = new Node(vertex);
    this.nodes.add(vertex);
   }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {

    for (let vertex of vertexArray){
      this.addVertex(vertex);
    }
   }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
   }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
   }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    for (let node of this.nodes){
      for (let adjacency of node.adjacent){
        if (adjacency.value === vertex.value){
          node.adjacent.delete(adjacency)
        }
      }
    }
    this.nodes.delete(vertex);
   }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start, seen= new Set([start])) {
      for(let neighbor of start.adjacent){
        if(!seen.has(neighbor)){
          seen.add(neighbor);
          this.depthFirstSearch(neighbor, seen);
        }
    }

    let seenArr = [];

    for(let node of seen){
      seenArr.push(node.value);
    }
   return seenArr;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {


  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) { }
}

module.exports = { Graph, Node }
