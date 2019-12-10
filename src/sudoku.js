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


export function emptySudoku(size) {
  const sudoku = {};
  ([...Array(size).keys()]).forEach((i) => {
    ([...Array(size).keys()]).forEach((j) => {
      sudoku[[i, j]] = {
        position: [i, j, getSquareNum(i, j)],
        value: null,
        candidates: [],
        removed: [],
        isSelected: false,
        isIntersected: false,
      };
    });
  });
  return sudoku;
}


export function makeSudoku(cells, boxSize) {
  const size = boxSize[0] * boxSize[1];
  const result = emptySudoku(size);
  cells.forEach((cell) => {
    const [row, col] = cell.position;
    result[[row, col]] = {
      ...cell,
      removed: [],
      isSelected: false,
      isIntersected: false,
    };
  });
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
  result[[row, col]] = { ...puzzle[[row, col]], value: null, candidates: [] };
  return {
    ...puzzle,
    ...result,
  };
}


export function setCellSingleValue(puzzle, row, col, value) {
  const result = {};
  result[[row, col]] = { ...puzzle[[row, col]], value, candidates: [] };
  return {
    ...puzzle,
    ...result,
  };
}


function updateCandidates(puzzle, row, col, candidates) {
  const result = {};
  result[[row, col]] = { ...puzzle[[row, col]], candidates };
  return {
    ...puzzle,
    ...result,
  };
}


export function toggleCandidate(puzzle, row, col, candidate) {
  const cell = puzzle[[row, col]];
  if (cell.candidates.indexOf(candidate) < 0) {
    return updateCandidates(puzzle, row, col, [candidate, ...cell.candidates]);
  }
  return updateCandidates(puzzle, row, col, cell.candidates.filter((e) => (e !== candidate)));
}


export function applyHint(puzzle, hint) {
  const positions = hint.combination.cells.map((item) => [item.position[0], item.position[1]]);
  const sudoku = selectIntersection(selectCells(clearSelection(puzzle), positions), positions);

  const changes = {};
  hint.changes.forEach((cell) => {
    const [row, col] = cell.position;
    const oldCell = sudoku[[row, col]];
    const removed = hint.combination.values.filter((value) => (
      oldCell.candidates.indexOf(value) > -1
    ));
    changes[[row, col]] = {
      ...oldCell,
      ...cell,
      isIntersected: true,
      removed,
    };
  });

  return {
    ...sudoku,
    ...changes,
  };
}
