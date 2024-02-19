class Solution {
  tous_arrays_vide(matrice) {
    for (let ligne of matrice) {
      for (let element of ligne) {
        if (element.length !== 0) {
          return false;
        }
      }
    }

    return true;
  }

  solveSudoku(board) {
    let matricepossible = Array.from({ length: 9 }, () => Array(9).fill([]));

    let allval = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        matricepossible[i][j] = [];
      }
    }

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === ".") {
          let valpossible = allval.slice();

          for (let m = 0; m < 9; m++) {
            if (valpossible.includes(board[i][m])) {
              valpossible.splice(valpossible.indexOf(board[i][m]), 1);
            }
          }

          for (let k = 0; k < 9; k++) {
            if (valpossible.includes(board[k][j])) {
              valpossible.splice(valpossible.indexOf(board[k][j]), 1);
            }
          }

          for (
            let ic = Math.floor(i / 3) * 3;
            ic < Math.floor(i / 3) * 3 + 3;
            ic++
          ) {
            for (
              let jc = Math.floor(j / 3) * 3;
              jc < Math.floor(j / 3) * 3 + 3;
              jc++
            ) {
              if (valpossible.includes(board[ic][jc])) {
                valpossible.splice(valpossible.indexOf(board[ic][jc]), 1);
              }
            }
          }

          matricepossible[i][j] = valpossible.slice();
        } else {
          matricepossible[i][j] = [board[i][j]];
        }
      }
    }

    let possible = true;

    while (possible) {
      possible = false;

      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (board[i][j] === "." && matricepossible[i][j].length === 1) {
            possible = true;

            board[i][j] = matricepossible[i][j][0];

            for (let m = 0; m < 9; m++) {
              if (
                matricepossible[i][j][0] === matricepossible[i][m][0] &&
                m !== j
              ) {
                matricepossible[i][m].splice(
                  matricepossible[i][m].indexOf(matricepossible[i][j][0]),
                  1
                );
              }
            }

            for (let k = 0; k < 9; k++) {
              if (
                matricepossible[i][j][0] === matricepossible[k][j][0] &&
                k !== i
              ) {
                matricepossible[k][j].splice(
                  matricepossible[k][j].indexOf(matricepossible[i][j][0]),
                  1
                );
              }
            }

            for (
              let ic = Math.floor(i / 3) * 3;
              ic < Math.floor(i / 3) * 3 + 3;
              ic++
            ) {
              for (
                let jc = Math.floor(j / 3) * 3;
                jc < Math.floor(j / 3) * 3 + 3;
                jc++
              ) {
                if (
                  matricepossible[i][j][0] === matricepossible[ic][jc][0] &&
                  ic !== i &&
                  jc !== j
                ) {
                  matricepossible[ic][jc].splice(
                    matricepossible[ic][jc].indexOf(matricepossible[i][j][0]),
                    1
                  );
                }
              }
            }
          }
        }
      }
    }
  }
}

let sudoku = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

let x = new Solution();

const startTime = performance.now();

x.solveSudoku(sudoku);

const endTime = performance.now();

const executionTime = endTime - startTime;
console.log(`Execution time: ${executionTime} milliseconds`);
