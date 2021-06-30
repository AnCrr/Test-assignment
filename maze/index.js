const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
const DIRECTIONS_STRING = {
  TOP: "top",
  RIGHT: "right",
  BOTTOM: "bottom",
  LEFT: "left",
};
const myMaze = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 1, 0, 1, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

class Maze {
  constructor(maze) {
    this.maze = maze;
    this.width = maze[0].length;
    this.height = maze.length;
  }
  // Added optional argument to indicate cells that should not be visited
  find(col, row, visited = new Set()) {
    // Create a unique reference for the current cell
    const cellId = row * this.width + col;
    // Check that this cell lies within the grid, has a non-zero value,
    //    and has not been visited before
    if (!this.maze[row] || !this.maze[row][col] || visited.has(cellId)) {
      return; // No success
    }

    visited.add(cellId); // Mark this cell as visited, so it will not be visited the second time.

    // console.log("visiting: ", col, row); // Uncomment to see progress
    if (this.maze[row][col] == 2) {

      return [[col, row]]; // Return the path that will be extended during backtracking
    }

    // Loop through the 4 directions
    for (const [addcol, addrow] of DIRECTIONS) {
      const found = this.find(col + addcol, row + addrow, visited);
      // If found, prepend current cell to partial solution and get out of recursion
      if (found) {
        return [[col, row], ...found];
      }
    }
  }

  getDirections(path) {
    const reversePath = [...path].reverse();
    const result = [];

    for (let index = 0; index < reversePath.length; index++) {
      const [pointX, pointY] = reversePath[index];
      const [nextPointX, nextPointY] = reversePath[index + 1] || [];

      if (pointX > nextPointX) result.push(DIRECTIONS_STRING.LEFT);
      if (pointX < nextPointX) result.push(DIRECTIONS_STRING.RIGHT);
      if (pointY > nextPointY) result.push(DIRECTIONS_STRING.TOP);
      if (pointY < nextPointY) result.push(DIRECTIONS_STRING.BOTTOM);
    }

    return result;
  }
}

const maze = new Maze(myMaze);
const path = maze.find(0, 3);
const result = maze.getDirections(path);

console.log(result);
