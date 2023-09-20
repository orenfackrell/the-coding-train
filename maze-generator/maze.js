// global variables
let grid;
let rows = 10;
let cols = 10;
let nodeDimension;
let stack = [];

class Node {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.visited = false;
    this.neighbours = [];
    this.walls = [true, true, true, true];
  }

  // pulled from aStar, need to know all neighbours for the backtracking
  addNeighbours(grid) {
    let i = this.i;
    let j = this.j;

    if (i > 0) this.neighbours.push(grid[i - 1][j]);
    if (i < grid.length - 1) this.neighbours.push(grid[i + 1][j]);
    if (j > 0) this.neighbours.push(grid[i][j - 1]);
    if (j < grid[0].length - 1) this.neighbours.push(grid[i][j + 1]);
  }

  show() {
    // draw the nodes in this by making all of its walls rather than filling it with a stroke
  }
}

class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.nodes = new Array(rows);

    // Create nodes
    for (let i = 0; i < rows; i++) {
      this.nodes[i] = new Array(cols);
      for (let j = 0; j < cols; j++) {
        let node = new Node(i, j);
        this.nodes[i][j] = node;
      }
    }

    // Connect neighbors
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        this.nodes[i][j].addNeighbours(this.nodes);
      }
    }
  }

  getNode(i, j) {
    if (i < 0 || i >= this.rows || j < 0 || j >= this.cols) {
      return null;
    }
    return this.nodes[i][j];
  }

  draw() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.nodes[i][j].show(color(255, 255, 255));
      }
    }
  }
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  grid = new Grid();

  grid.draw();

  // generateMaze();
}

function generateMaze() {
  // init grid[0][0] = current;
  // set current.visited = true;
  // stack.push(current)

  // if (stack.length > 0){
    // stack.pop() = current;
    // if (current.neighbours) {
      // select random neighbour node from  current.neighbours

        // if (neighbour.visited = false){
          // remove the wall between current and neighbour;
          // neighbour.visited = true 
          // stack.push(neighbour)}}}
}
