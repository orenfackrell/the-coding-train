// global variables
let grid;
let startNode;
let endNode;
let openSet;
let closedSet;
let path;
let rows = 10;
let cols = 10;
let wallPercent = 10;
let solution = undefined;
let w, h;

class Node {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.g = 0;
    this.h = 0;
    this.f = 0;
    this.neighbours = [];
    this.previous = undefined;
    this.wall = false;

    if (random(1) < wallPercent / 100) {
      this.wall = true;
    }
  }

  addNeighbours(grid) {
    let i = this.i;
    let j = this.j;

    if (i > 0) this.neighbours.push(grid[i - 1][j]);
    if (i < grid.length - 1) this.neighbours.push(grid[i + 1][j]);
    if (j > 0) this.neighbours.push(grid[i][j - 1]);
    if (j < grid[0].length - 1) this.neighbours.push(grid[i][j + 1]);
  }

  show(color) {
    fill(color);
    if (this.wall) {
      fill(0);
    }
    stroke(0);
    rect(this.i * w, this.j * h, w, h);
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
    // check if node is in the valid grid of nodes
    if (i < 0 || i >= this.rows || j < 0 || j >= this.cols) {
      return null;
    }
    // Pull a node from its place in the grid
    return this.nodes[i][j]; // this take the column it is in (i) then multiply it by the row to get which #node it is in the list
    // use this to find the lowest F score node in the set to test
  }

  draw() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.nodes[i][j].show(color(255, 255, 255));
      }
    }
  }
}

function newProblem() {
  solution = false;
  let messageElement = document.getElementById("message-container");
  messageElement.textContent = "";

  // get the dimensions for the nodes in the grid
  w = width / cols;
  h = height / rows;
  // Initialize grid
  grid = new Grid(rows, cols);
  // Create start (top left) and end nodes (bottom right)
  startNode = grid.getNode(0, 0);
  endNode = grid.getNode(rows - 1, cols - 1);
  startNode.wall = false; // Ensure start node is not a wall
  endNode.wall = false; // Ensure end node is not a wall
  // Initialize open and closed sets
  openSet = [];
  closedSet = [];
  // Add start node to open set
  openSet.push(startNode);
  // Initialize path
  path = [];
}

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent("canvas-container");
  newProblem();
}

function drawPath() {
  for (let i = 0; i < path.length; i++) {
    path[i].show(color(0, 0, 255));
  }
  let messageElement = document.getElementById("message-container");
  messageElement.textContent =
    "Solution found! Number of tiles in the optimal path is " + path.length;
}

function draw() {
  background(220);
  // Draw grid
  grid.draw();
  // Draw open set nodes in green
  for (let i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));
  }
  // Draw closed set nodes in red
  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0));
  }
  aStar();
  if (solution) {
    drawPath();
    noLoop();
  }
}

function aStar() {
  // While there are nodes in the open set {
  if (openSet.length > 0) {
    let lowestF = 0; // Find node with lowest f score in open set
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestF].f) {
        lowestF = i;
      }
    }

    let currentNode = openSet[lowestF];

    if (currentNode === endNode) {
      let temp = currentNode;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      solution = true;
    }

    // Move the current node from open set to closed set as its been tested
    openSet.splice(lowestF, 1);
    closedSet.push(currentNode);
    // Now find the neighbours of the current node
    let neighbours = currentNode.neighbours;
    for (i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];

      // ignore neighbours that are in the closed set or are a wal
      if (!closedSet.includes(neighbour) && !neighbour.wall) {
        // for remaining neighbours give them a tentative g-score (parent node's g + 1)
        let tempG = currentNode.g + 1;

        let newPath = false;
        if (openSet.includes(neighbour)) {
          // if (openSet.includes.(neighbour)) {update it's g-score to tentative g-score if it is less}
          if (tempG < neighbour.g) {
            neighbour.g = tempG;
            newPath = true;
          }
          // else { give it the tentative g-score and move it to the open set }
        } else {
          neighbour.g = tempG;
          newPath = true;
          openSet.push(neighbour);
        }

        // define the neighbours.h with a function for the heuristic
        // then set neighbour.f = neighbour.g + neighbour.h
        if (newPath) {
          neighbour.h = heuristic(neighbour, endNode);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.previous = currentNode;
        }
        // if the nodes are all exhausted then there is no solution
      }
    }
  } else {
    console.log("No solution found!");
    noLoop();
  }
}

function heuristic(nodeA, nodeB) {
  // use the Manhattan distance as in this example the path can only go in the x and y directions
  return abs(nodeA.i - nodeB.i) + abs(nodeA.j - nodeB.j);
}

function updateVariables() {
  rows = document.getElementById("rows").value;
  cols = document.getElementById("cols").value;
  wallPercent = document.getElementById("wallPercent").value;
  newProblem(); // Reset the sketch with the new variables
  loop(); // Start the draw loop again
}
