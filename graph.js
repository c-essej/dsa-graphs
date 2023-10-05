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
  depthFirstSearch(start, result =[], seen= new Set([start])) {

    result.push(start.value);

      for(let neighbor of start.adjacent){
        if(!seen.has(neighbor)){
          seen.add(neighbor);
          this.depthFirstSearch(neighbor, result, seen);
        }
    }

    return result;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    let queue = [start];
    let seen = new Set(queue);
    let result = [];

    while (queue.length > 0){
      let currentNode = queue.shift();

      for (let neighbor of currentNode.adjacent){
        if (!seen.has(neighbor)){
          queue.push(neighbor);
          seen.add(neighbor);
          result.push(neighbor.value);
        }
      }

    }
    return result;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {

    let queue = [[start, 0]]
    let seen = new Set([start])

    while (queue.length > 0){
      let [currentNode, distance] = queue.shift();

      if (currentNode === end) return distance;

      for (let neighbor of currentNode.adjacent){
        if (!seen.has(neighbor)){
          queue.push([neighbor, distance +1])
          seen.add(neighbor)
        }
      }
    }
  }
}

module.exports = { Graph, Node }
