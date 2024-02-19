// https://leetcode.com/problems/sudoku-solver/submissions/1179903134/

pos = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

class Solution {
  constructor(i, j, pos) {
    this.i = i;
    this.j = j;
    this.pos = pos;
  }
}

function solveSudoku(board) {

  var binaryPos = [];

  var i = 0,
    j = 0;
  while (true) {
    if (board[i][j] === ".") {
      line = board[i];
      col = board.map((e) => e[j]);
      block = extractBlock(board, getBlockIndex(i, j));

      s = new Set([...line, ...col, ...block]);

      let newPoss = pos.filter((e) => !s.has(e));
      console.log("test ", i, j, newPoss);

      if (newPoss.length === 1) {
        board[i][j] = newPoss[0];
        change = true;
      } else if (newPoss.length === 2) {
        binaryPos = [...binaryPos, new Solution(i, j, newPoss)];
      } else if (newPoss.length === 0) return null;
    }

    // indexes movement
    if (i === 8 && j === 8 && change === true) {
      i = 0;
      j = 0;
      change = false;
      console.log(" ----- smalll reset --------");
    } else if (i === 8 && j === 8 && change === false) {
      if (validateSudoku(board) || binaryPos.length === 0) break;
      console.log("binary", binaryPos.length);
      console.log(" ----- recursive reset --------");

      for (const binPos of binaryPos) {
        console.log(" ---- right recusive ------");
        let copyBoard = [...board];
        copyBoard[binPos.i][binPos.j] = binPos.pos[0];
        solution = solveSudoku(copyBoard);
        if (solution && validateSudoku(solution)) return solution;

        console.log(" ---- left  recusive ------");
        copyBoard[binPos.i][binPos.j] = binPos.pos[1];
        solution = solveSudoku(copyBoard);

        if (solution && validateSudoku(solution)) return solution;
      }
    } else if (j === 8) {
      j = 0;
      i++;
    } else j++;
  }

  return board;
}

function getBlockIndex(i, j) {
  // Calculate the block's row index and column index
  const blockRowIndex = Math.floor(i / 3);
  const blockColIndex = Math.floor(j / 3);

  // Calculate the block index
  const blockIndex = blockRowIndex * 3 + blockColIndex;

  return blockIndex;
}

function validateSudoku(board) {
  for (let i = 0; i < 9; i++) {
    line = board[i];
    col = board.map((e) => e[i]);
    block = extractBlock(board, i);

    if (!isValid(line) || !isValid(col) || !isValid(block)) {
      return false;
    }
  }
  return true;
}

const isValid = (arr) => {
  let s = new Set(arr);
  if (s.has(".")) {
    return false;
  }
  return s.size === 9;
};

function extractBlock(board, blockIndex) {
  const startRow = Math.floor(blockIndex / 3) * 3;
  const startCol = (blockIndex % 3) * 3;

  const block = [];

  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      block.push(board[i][j]);
    }
  }

  return block;
}

const test_boards = [
  [
    [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ],
    true,
  ], // valid boxes and rows, repeats in cols
];

const test_boards2 = [
  [
    [
      [5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5],
    ],
    false,
  ], // A board full of fives
  [
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    false,
  ], // All rows are 1..9
  [
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [2, 2, 2, 2, 2, 2, 2, 2, 2],
      [3, 3, 3, 3, 3, 3, 3, 3, 3],
      [4, 4, 4, 4, 4, 4, 4, 4, 4],
      [5, 5, 5, 5, 5, 5, 5, 5, 5],
      [6, 6, 6, 6, 6, 6, 6, 6, 6],
      [7, 7, 7, 7, 7, 7, 7, 7, 7],
      [8, 8, 8, 8, 8, 8, 8, 8, 8],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
    ],
    false,
  ], // All cols are 1..9
  [
    [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ],
    true,
  ],
  [
    [
      [1, 3, 2, 5, 7, 9, 4, 6, 8],
      [4, 9, 8, 2, 6, 1, 3, 7, 5],
      [7, 5, 6, 3, 8, 4, 2, 1, 9],
      [6, 4, 3, 1, 5, 8, 7, 9, 2],
      [5, 2, 1, 7, 9, 3, 8, 4, 6],
      [9, 8, 7, 4, 2, 6, 5, 3, 1],
      [2, 1, 4, 9, 3, 5, 6, 8, 7],
      [3, 6, 5, 8, 1, 7, 9, 2, 4],
      [8, 7, 9, 6, 4, 2, 1, 5, 3],
    ],
    true,
  ],
  [
    [
      [7, 8, 4, 1, 5, 9, 3, 2, 6],
      [5, 3, 9, 6, 7, 2, 8, 4, 1],
      [6, 1, 2, 4, 3, 8, 7, 5, 9],
      [9, 2, 8, 7, 1, 5, 4, 6, 3],
      [3, 5, 7, 8, 4, 6, 1, 9, 2],
      [4, 6, 1, 9, 2, 3, 5, 8, 7],
      [8, 7, 6, 3, 9, 4, 2, 1, 5],
      [2, 4, 3, 5, 6, 1, 9, 7, 8],
      [1, 9, 5, 2, 8, 7, 6, 3, 4],
    ],
    true,
  ],
  [
    [
      [9, 2, 6, 5, 8, 3, 4, 7, 1],
      [7, 1, 3, 4, 2, 6, 9, 8, 5],
      [8, 4, 5, 9, 7, 1, 3, 6, 2],
      [3, 6, 2, 8, 5, 7, 1, 4, 9],
      [4, 7, 1, 2, 6, 9, 5, 3, 8],
      [5, 9, 8, 3, 1, 4, 7, 2, 6],
      [6, 5, 7, 1, 3, 8, 2, 9, 4],
      [2, 8, 4, 7, 9, 5, 6, 1, 3],
      [1, 3, 9, 6, 4, 2, 8, 5, 7],
    ],
    true,
  ],
  [
    [
      [7, 1, 5, 6, 2, 3, 8, 4, 9],
      [6, 2, 4, 8, 1, 9, 3, 7, 5],
      [3, 9, 8, 7, 4, 5, 6, 2, 1],
      [5, 3, 9, 2, 7, 6, 4, 1, 8],
      [4, 6, 2, 1, 9, 8, 5, 3, 7],
      [8, 7, 1, 5, 3, 4, 9, 6, 2],
      [2, 5, 3, 9, 6, 7, 1, 8, 4],
      [1, 8, 6, 4, 5, 2, 7, 9, 3],
      [9, 4, 7, 3, 8, 1, 2, 5, 6],
    ],
    true,
  ],
  [
    [
      [7, 8, 3, 4, 5, 6, 1, 2, 9],
      [6, 9, 2, 1, 8, 7, 3, 4, 5],
      [1, 4, 5, 2, 3, 9, 6, 7, 8],
      [8, 1, 7, 3, 6, 2, 9, 5, 4],
      [5, 6, 4, 7, 9, 8, 2, 1, 3],
      [3, 2, 9, 5, 4, 1, 8, 6, 7],
      [4, 7, 6, 8, 2, 3, 5, 9, 1],
      [9, 3, 1, 6, 7, 5, 4, 8, 2],
      [2, 5, 8, 9, 1, 4, 7, 3, 6],
    ],
    true,
  ],
  [
    [
      [1, 7, 3, 2, 6, 8, 9, 5, 4],
      [4, 2, 5, 1, 9, 3, 7, 6, 8],
      [8, 6, 9, 7, 4, 5, 1, 2, 3],
      [6, 1, 2, 8, 3, 7, 4, 9, 5],
      [3, 9, 8, 4, 5, 6, 2, 1, 7],
      [5, 4, 7, 9, 1, 2, 3, 8, 6],
      [9, 5, 4, 3, 8, 1, 6, 7, 2],
      [2, 3, 6, 5, 7, 9, 8, 4, 1],
      [7, 8, 1, 6, 2, 4, 5, 3, 9],
    ],
    true,
  ],
  [
    [
      [8, 4, 7, 2, 6, 5, 1, 9, 3],
      [1, 3, 6, 7, 9, 8, 2, 4, 5],
      [9, 5, 2, 1, 4, 3, 8, 6, 7],
      [4, 2, 9, 6, 7, 1, 5, 3, 8],
      [6, 7, 8, 5, 3, 2, 9, 1, 4],
      [3, 1, 5, 4, 8, 9, 7, 2, 6],
      [5, 6, 4, 9, 1, 7, 3, 8, 2],
      [7, 8, 1, 3, 2, 4, 6, 5, 9],
      [2, 9, 3, 8, 5, 6, 4, 7, 1],
    ],
    true,
  ],
  [
    [
      [8, 4, 7, 2, 6, 5, 1, 0, 3],
      [1, 3, 6, 7, 0, 8, 2, 4, 5],
      [0, 5, 2, 1, 4, 3, 8, 6, 7],
      [4, 2, 0, 6, 7, 1, 5, 3, 8],
      [6, 7, 8, 5, 3, 2, 0, 1, 4],
      [3, 1, 5, 4, 8, 0, 7, 2, 6],
      [5, 6, 4, 0, 1, 7, 3, 8, 2],
      [7, 8, 1, 3, 2, 4, 6, 5, 0],
      [2, 0, 3, 8, 5, 6, 4, 7, 1],
    ],
    false,
  ], // a valid board, but with 0 instead of 9
  [
    [
      [1, 3, 2, 5, 7, 9, 4, 6, 8],
      [4, 9, 8, 2, 6, 1, 3, 7, 5],
      [7, 5, 6, 3, 8, 4, 2, 1, 9],
      [6, 4, 3, 1, 5, 8, 7, 9, 2],
      [5, 2, 1, 7, 9, 3, 8, 4, 6],
      [9, 8, 7, 4, 2, 6, 5, 3, 1],
      [2, 1, 4, 9, 3, 5, 6, 8, 7],
      [3, 6, 5, 8, 1, 7, 9, 2, 4],
      [8, 7, 9, 6, 4, 2, 1, 3, 5],
    ],
    false,
  ], // duplicated '3' in eighth column
  [
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [2, 3, 4, 5, 6, 7, 8, 9, 1],
      [3, 4, 5, 6, 7, 8, 9, 1, 2],
      [4, 5, 6, 7, 8, 9, 1, 2, 3],
      [5, 6, 7, 8, 9, 1, 2, 3, 4],
      [6, 7, 8, 9, 1, 2, 3, 4, 5],
      [7, 8, 9, 1, 2, 3, 4, 5, 6],
      [8, 9, 1, 2, 3, 4, 5, 6, 7],
      [9, 1, 2, 3, 4, 5, 6, 7, 8],
    ],
    false,
  ], // valid rows and cols, but invalid boxes
  [
    [
      [0, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ],
    false,
  ],
  [
    [
      [1, 2, 3, 4, 5, 6, 6, 9, 9],
      [4, 5, 6, 6, 9, 9, 1, 2, 3],
      [6, 9, 9, 1, 2, 3, 4, 5, 6],
      [2, 3, 4, 5, 6, 6, 9, 9, 1],
      [5, 6, 6, 9, 9, 1, 2, 3, 4],
      [9, 9, 1, 2, 3, 4, 5, 6, 6],
      [3, 4, 5, 6, 6, 9, 9, 1, 2],
      [6, 6, 9, 9, 1, 2, 3, 4, 5],
      [9, 1, 2, 3, 4, 5, 6, 6, 9],
    ],
    false,
  ],
  [
    [
      [1, 2, 3, 1, 2, 3, 1, 2, 3],
      [4, 5, 6, 4, 5, 6, 4, 5, 6],
      [7, 8, 9, 7, 8, 9, 7, 8, 9],
      [2, 3, 1, 2, 3, 1, 2, 3, 1],
      [5, 6, 4, 5, 6, 4, 5, 6, 4],
      [8, 9, 7, 8, 9, 7, 8, 9, 7],
      [3, 1, 2, 3, 1, 2, 3, 1, 2],
      [6, 4, 5, 6, 4, 5, 6, 4, 5],
      [9, 7, 8, 9, 7, 8, 9, 7, 8],
    ],
    false,
  ],
  [
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [4, 5, 6, 7, 8, 9, 1, 2, 3],
      [7, 8, 9, 1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [4, 5, 6, 7, 8, 9, 1, 2, 3],
      [7, 8, 9, 1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [4, 5, 6, 7, 8, 9, 1, 2, 3],
      [7, 8, 9, 1, 2, 3, 4, 5, 6],
    ],
    false,
  ], // valid boxes and rows, repeats in cols
];

// console.log("started");
// console.log(test_boards);
// test_boards.forEach((e) =>
//   console.log("expected: ", e[1], " - result :", validateSudoku(e[0]))
// );

const brd = [
  [".", ".", "9", "7", "4", "8", ".", ".", "."],
  ["7", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", "2", ".", "1", ".", "9", ".", ".", "."],
  [".", ".", "7", ".", ".", ".", "2", "4", "."],
  [".", "6", "4", ".", "1", ".", "5", "9", "."],
  [".", "9", "8", ".", ".", ".", "3", ".", "."],
  [".", ".", ".", "8", ".", "3", ".", "2", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "6"],
  [".", ".", ".", "2", "7", "5", "9", ".", "."],
];

const solu = [
  ["5", "1", "9", "7", "4", "8", "6", "3", "2"],
  ["7", "8", "3", "6", "5", "2", "4", "1", "9"],
  ["4", "2", "6", "1", "3", "9", "8", "7", "5"],
  ["3", "5", "7", "9", "8", "6", "2", "4", "1"],
  ["2", "6", "4", "3", "1", "7", "5", "9", "8"],
  ["1", "9", "8", "5", "2", "4", "3", "6", "7"],
  ["9", "7", "5", "8", "6", "3", "1", "2", "4"],
  ["8", "3", "2", "4", "9", "1", "7", "5", "6"],
  ["6", "4", "1", "2", "7", "5", "9", "8", "3"],
];

function displaySudokuBoard(board) {
  let result = "";
  for (let i = 0; i < board.length; i++) {
    if (i > 0 && i % 3 === 0) {
      // Add horizontal line after every 3 rows
      result += "- - - - - - - - - - - - -\n";
    }
    for (let j = 0; j < board[i].length; j++) {
      if (j > 0 && j % 3 === 0) {
        // Add vertical line after every 3 columns
        result += "| ";
      }
      result += board[i][j] + " ";
    }
    result += "\n";
  }
  return result;
}

console.log("display\n\n-");

const startTime = performance.now();

s1 = solveSudoku(brd);

const endTime = performance.now();

console.log("my solution");
console.log(displaySudokuBoard(s1));
console.log("expected solution");
console.log(displaySudokuBoard(solu));

const executionTime = endTime - startTime;
console.log(`Execution time: ${executionTime} milliseconds`);
