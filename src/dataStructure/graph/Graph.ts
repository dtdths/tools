
type Vertice = any;

class Graph {
  isDirected: boolean = false;
  vertices: Array<Vertice>
  adjList: Map<Vertice, Array<Vertice>>
  /**
   * 
   * @param isDirected 是否有向
   */
  constructor(isDirected = false) {
    this.isDirected = isDirected;
    this.vertices = [];
    this.adjList = new Map();
  }

  /**
   * 添加顶点
   * @param v 顶点
   */
  addVertex(v: Vertice) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }

  /**
   * 连接两顶点的边
   * @param v 顶点1
   * @param w 顶点2
   */
  addEdge(v: Vertice, w: Vertice) {
    if (!this.adjList.get(v)) {
      this.addVertex(v);
    }
    if (!this.adjList.get(w)) {
      this.addVertex(w);
    }
    this.adjList.get(v)?.push(w);
    if (!this.isDirected) {
      this.adjList.get(w)?.push(v);
    }
  }

  getVertices() {
    return this.vertices;
  }
  getAdjList() {
    return this.adjList;
  }

  toString() {
    let s = '';
    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `;
      const neighbors = this.adjList.get(this.vertices[i]) || [];
      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]} `;
      }
      s += '\n';
    }
    return s;
  }
}