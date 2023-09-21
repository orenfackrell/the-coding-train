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
    let i = this.i * nodeDimension;
    let j = this.j * nodeDimension;
    stroke(0);
    if (this.walls[0]) line(i, j, i + nodeDimension, j); //top
    if (this.walls[1])
      line(i + nodeDimension, j, i + nodeDimension, j + nodeDimension); // right
    if (this.walls[2])
      line(i, j + nodeDimension, i + nodeDimension, j + nodeDimension); // bottom
    if (this.walls[3]) line(i, j, i, j + nodeDimension); //left

    if (this.visited) {
      fill(255);
      noStroke();
      rect(i, j, nodeDimension, nodeDimension);
    }
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
        this.nodes[i][j].show(color(255));
      }
    }
  }
}

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent("canvas-container");
  nodeDimension = width / cols; //this is for only a square gird

  grid = new Grid(rows, cols);

  grid.draw();
}

function draw() {
  grid.draw();

  generateMaze();

  aStarToggle = document.getElementById("a-star");
  if (aStarToggle) {
    aStar();
  }
}

function generateMaze() {
  // Choose the initial node, mark it as visited and push it to the stack
  let currentNode = grid.getNode(0, 0);
  currentNode.visited = true;
  stack.push(currentNode);

  // While the stack is not empty
  while (stack.length > 0) {
    // Pop a node from the stack and make it a current node
    currentNode = stack.pop();

    // If the current node has any neighbours which have not been visited
    let neighbors = currentNode.neighbours;
    let unvisitedNeighbors = neighbors.filter((neighbor) => !neighbor.visited);
    if (unvisitedNeighbors.length > 0) {
      // Push the current node to the stack
      stack.push(currentNode);

      // Choose one of the unvisited neighbours
      let randomIndex = floor(random(unvisitedNeighbors.length));
      let chosenNeighbor = unvisitedNeighbors[randomIndex];

      // Remove the wall between the current node and the neighbour node
      let x = currentNode.i - chosenNeighbor.i;
      if (x === 1) {
        currentNode.walls[3] = false;
        chosenNeighbor.walls[1] = false;
      } else if (x === -1) {
        currentNode.walls[1] = false;
        chosenNeighbor.walls[3] = false;
      }

      let y = currentNode.j - chosenNeighbor.j;
      if (y === 1) {
        currentNode.walls[0] = false;
        chosenNeighbor.walls[2] = false;
      } else if (y === -1) {
        currentNode.walls[2] = false;
        chosenNeighbor.walls[0] = false;
      }

      // Mark the chosen cell as visited and push it to the stack
      chosenNeighbor.visited = true;
      stack.push(chosenNeighbor);
    }
  }
}

function updateVariables() {
  gridDimension = document.getElementById("rows").value;
  rows = gridDimension;
  cols = gridDimension;
  setup(); // Reset the sketch with the new variables
  loop(); // Start the draw loop again
}

function aStar() {}
