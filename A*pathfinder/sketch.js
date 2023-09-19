// global variables
let grid;
let startNode;
let endNode;
let openSet;
let closedSet;
let path;
let rows = 10;
let cols = 10;

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
  }

  addNeighbours(gird) {
    // for this node grab the coordinates
    let i = this.i;
    let j = this.j;

    if (i > 0) this.neighbours.push(grid[i - 1][j]); // if the node is not on the left edge, add the left neighbour
    if (i < rows.length - 1) this.neighbours.push(grid[i + 1][j]); // if the node is not on the right edge, add the right neighbour
    if (j > 0) this.neighbours.push(grid[i][j - 1]); // if the node is not on the top edge, add the neighbour above
    if (j < rows.length - 1) this.neighbours.push(grid[i][j + 1]); // if the node is not on the bottom edge, add the neighbour below
  }
}

class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.nodes = [];

    // Loop through rows and columns to make 2D array
    // later this is where I will randomly set some nodes to be walls

    // Connect the nodes to their neighbours so the path can be connected through them
  }

  getNode(i, j) {
    // Pull a node from its place in the grid
    // use this to find the lowest F score node in the set to test
  }

  draw() {
    // Loop through the nodes in the grid using the .show() p5 method to append it to the canvas
  }
}

function setup() {
  createCanvas(400, 400);

  // Initialize grid

  // Create start (top left) and end nodes (bottom right)

  // Initialize open and closed sets

  // Add start node to open set

  // Initialize path

  // Run A* algorithm
}

function draw() {
  background(220);
  // Draw grid

  // Draw open set nodes

  // Draw closed set nodes

  // Draw path
}

function aStar() {
  // While there are nodes in the open set {
  // Find node with lowest f score in open set
  // if current node is the end node, the algo ends
  // Move the current node from open set to closed set as its been tested
  // Now find the neighbours of the current node
  // ignore neighbours that are in the closed set or are a wall
  // for remaining neighbours give them a tentative g-score (parent node's g + 1)
  // if (openSet.includes.(neighbour)) {update it's g-score to tentative g-score if it is less}
  // else { give it the tentative g-score and move it to the open set }
  // define the neighbours.h with a function for the heuristic
  // then set neighbour.f = neighbour.g + neighbour.h
  // Loop the above steps
  // if the nodes are all exhausted then there is no solution
}

function heuristic() {
  // use the Manhattan distance as in this example the path can only go in the x and y directions
}
