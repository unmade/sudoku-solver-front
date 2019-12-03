function isIntersected(cellA, cellB) {
  return (
    cellA.position[0] === cellB.position[0]
    || cellA.position[1] === cellB.position[1]
    || cellA.position[2] === cellB.position[2]
  );
}


function getSquareNum(row, col) {
  return Math.floor(row / 3) * 3 + Math.floor(col / 3);
}


function emptySudoku(n, m) {
  const sudoku = [];
  ([...Array(n).keys()]).forEach((i) => {
    const row = [];
    ([...Array(m).keys()]).forEach((j) => {
      row.push({ type: 'mark', position: [i, j, getSquareNum(i, j)], value: [] });
    });
    sudoku.push(row);
  });
  return sudoku;
}


class Sudoku {
  constructor(puzzle) {
    if (puzzle) {
      this.puzzle = puzzle.map((row, i) => (
        row.map((cell, j) => (
          (cell) ? (
            { type: 'cell', position: [i, j, getSquareNum(i, j)], value: cell }
          ) : (
            { type: 'mark', position: [i, j, getSquareNum(i, j)], value: [] }
          )
        ))
      ));
    } else {
      this.puzzle = emptySudoku(9, 9);
    }
  }

  selectCells(positions) {
    this.clearStep();
    this.clearSelection();
    positions.forEach((position) => {
      const [row, col] = position;
      this.puzzle[row][col] = { ...this.puzzle[row][col], isSelected: true };
      const intersection = this.getIntersectedCellsFor(this.puzzle[row][col]);
      intersection.forEach((cell) => {
        this.puzzle[cell.position[0]][cell.position[1]] = { ...cell, isIntersected: true };
      });
    });
  }

  getIntersectedCellsFor(cell) {
    const result = [];
    this.puzzle.forEach((row) => {
      row.forEach((item) => {
        if (cell !== item && isIntersected(cell, item)) {
          result.push(item);
        }
      });
    });
    return result;
  }

  clearSelection() {
    this.puzzle.map((row, i) => (
      row.forEach((cell, j) => {
        if (cell.isSelected || cell.isIntersected) {
          this.puzzle[i][j] = { ...this.puzzle[i][j], isSelected: false, isIntersected: false };
        }
      })
    ));
  }

  clearCell(row, col) {
    this.puzzle[row][col] = { ...this.puzzle[row][col], type: 'mark', value: [] };
  }

  setCellSingleValue(row, col, value) {
    this.puzzle[row][col] = { ...this.puzzle[row][col], type: 'cell', value };
  }

  updateMark(row, col, value) {
    this.puzzle[row][col] = { ...this.puzzle[row][col], type: 'mark', value };
  }

  toggleMarkValue(row, col, value) {
    if (this.puzzle[row][col].value.indexOf(value) < 0) {
      this.updateMark(row, col, [value, ...this.puzzle[row][col].value]);
    } else {
      this.updateMark(row, col, this.puzzle[row][col].value.filter((e) => (e !== value)));
    }
  }

  applyHint(hint) {
    this.selectCells(hint.combination.marks.map((item) => (item.position)));
    hint.changed_cells.forEach((cell) => {
      const oldCell = this.puzzle[cell.position[0]][cell.position[1]];
      const removed = [];
      if (cell.type === 'mark') {
        hint.combination.values.forEach((value) => {
          if (oldCell.value.indexOf(value) > -1) {
            removed.push(value);
          }
        });
      }
      this.puzzle[cell.position[0]][cell.position[1]] = { ...oldCell, ...cell, removed };
    });
  }

  clearStep() {
    this.puzzle.forEach((row, i) => (
      row.forEach((cell, j) => {
        if (cell.removed) {
          this.puzzle[i][j] = { ...this.puzzle[i][j], removed: [] };
        }
      })
    ));
  }
}


export default Sudoku;
