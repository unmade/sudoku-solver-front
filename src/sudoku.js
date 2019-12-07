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


export function emptySudoku(n, m) {
  const sudoku = {};
  ([...Array(n).keys()]).forEach((i) => {
    ([...Array(m).keys()]).forEach((j) => {
      sudoku[[i, j]] = { type: 'mark', position: [i, j, getSquareNum(i, j)], value: [] };
    });
  });
  return sudoku;
}


export function parseSudoku(puzzle) {
  const result = {};
  puzzle.forEach((row, i) => (
    row.forEach((value, j) => {
      if (value) {
        result[[i, j]] = { type: 'cell', position: [i, j, getSquareNum(i, j)], value };
      } else {
        result[[i, j]] = { type: 'mark', position: [i, j, getSquareNum(i, j)], value: [] };
      }
    })
  ));
  return result;
}


function getIntersectedCellsBy(puzzle, row, col) {
  const cell = puzzle[[row, col]];
  return Object.values(puzzle).filter((item) => cell !== item && isIntersected(cell, item));
}


export function selectIntersection(puzzle, positions) {
  const intersections = positions.map((position) => (
    getIntersectedCellsBy(puzzle, ...position)
  ));

  if (intersections.length === 0) {
    return { ...puzzle };
  }

  const result = {};
  intersections[0].forEach((cell) => {
    if (intersections.every((intersection) => intersection.indexOf(cell) !== -1)) {
      const [row, col] = cell.position;
      result[[row, col]] = { ...cell, isIntersected: true };
    }
  });
  return {
    ...puzzle,
    ...result,
  };
}


export function selectCells(puzzle, positions) {
  const result = {};
  positions.forEach((position) => {
    const [row, col] = position;
    result[[row, col]] = { ...puzzle[[row, col]], isSelected: true };
  });

  return {
    ...puzzle,
    ...result,
  };
}


export function clearSelection(puzzle) {
  const result = {};
  Object.entries(puzzle).forEach(([key, cell]) => {
    if (cell.isSelected || cell.isIntersected) {
      result[key] = { ...cell, isSelected: false, isIntersected: false, removed: [] };
    }
  });
  return {
    ...puzzle,
    ...result,
  };
}


export function clearCell(puzzle, row, col) {
  const result = {};
  result[[row, col]] = { ...puzzle[[row, col]], value: [], type: 'mark' };
  return {
    ...puzzle,
    ...result,
  };
}


export function setCellSingleValue(puzzle, row, col, value) {
  const result = {};
  result[[row, col]] = { ...puzzle[[row, col]], value, type: 'cell' };
  return {
    ...puzzle,
    ...result,
  };
}


function updateMark(puzzle, row, col, value) {
  const result = {};
  result[[row, col]] = { ...puzzle[[row, col]], value, type: 'mark' };
  return {
    ...puzzle,
    ...result,
  };
}


export function toggleMarkValue(puzzle, row, col, value) {
  if (puzzle[[row, col]].value.indexOf(value) < 0) {
    return updateMark(puzzle, row, col, [value, ...puzzle[[row, col]].value]);
  }
  return updateMark(puzzle, row, col, puzzle[[row, col]].value.filter((e) => (e !== value)));
}


export function applyHint(puzzle, hint) {
  const positions = hint.combination.marks.map((item) => [item.position[0], item.position[1]]);
  const newPuzzle = selectIntersection(selectCells(clearSelection(puzzle), positions), positions);

  const changedCells = {};
  hint.changed_cells.forEach((cell) => {
    const [row, col] = cell.position;
    const oldCell = newPuzzle[[row, col]];
    changedCells[[row, col]] = { ...oldCell, ...cell };
  });

  const changedMarks = {};
  hint.changed_marks.forEach((cell) => {
    const [row, col] = cell.position;
    const oldCell = newPuzzle[[row, col]];
    const removed = [];
    hint.combination.values.forEach((value) => {
      if (oldCell.value.indexOf(value) > -1) {
        removed.push(value);
      }
    });
    changedMarks[[row, col]] = { ...oldCell, ...cell, removed, isIntersected: true };
  });

  return {
    ...newPuzzle,
    ...changedCells,
    ...changedMarks,
  };
}
