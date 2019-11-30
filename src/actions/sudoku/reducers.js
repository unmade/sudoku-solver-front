import { TOGGLE_MARK, UPDATE_CELL, NEXT_STEP, SELECT_CELL } from "./actions";


class Sudoku {
    constructor(puzzle) {
        this.puzzle = puzzle;
    }

    selectCells(positions) {
        this.clearStep();
        this.clearSelection();
        positions.map(position => {
            const [row, col] = position
            this.puzzle[row][col] = {...this.puzzle[row][col], isSelected: true};
            const intersection = this.getIntersectedCellsFor(this.puzzle[row][col]);
            intersection.map(cell => {
                this.puzzle[cell.position[0]][cell.position[1]] = {...cell, isIntersected: true};
            })
        })
    }

    isIntersected(cell_a, cell_b) {
        return (
            cell_a.position[0] === cell_b.position[0]
            || cell_a.position[1] === cell_b.position[1]
            || cell_a.position[2] === cell_b.position[2]
        )
    }

    getIntersectedCellsFor(cell) {
        const result = []
        this.puzzle.map(row => {
            row.map(item => {
                if (cell != item && this.isIntersected(cell, item)) {
                    result.push(item)
                }
            })
        })
        return result
    }

    clearSelection() {
        this.puzzle.map((row, i) => (
            row.map((cell, j) => {
                if (cell.isSelected || cell.isIntersected) {
                    this.puzzle[i][j] = {...this.puzzle[i][j], isSelected: false, isIntersected: false};
                }
            })
        ))
    }

    updateCell(row, col, value) {
        this.puzzle[row][col] = {...this.puzzle[row][col], type: "cell", value: value}
    }

    updateMark(row, col, value) {
        this.puzzle[row][col] = {...this.puzzle[row][col], type: "mark", value: value}
    }

    applyStep(step) {
        this.clearSelection();
        this.selectCells(step.combination.marks.map(item => (item.position)))
        step.changed_cells.map((cell) => {
            const oldCell = this.puzzle[cell.position[0]][cell.position[1]];
            cell.removed = []
            if (cell.type === "mark") {
                step.combination.values.map((value) => {
                    if (oldCell.value.indexOf(value) > -1) {
                        cell.removed.push(value)
                    }
                })
            }
            this.puzzle[cell.position[0]][cell.position[1]] = {...oldCell, ...cell}
        })
    }

    clearStep() {
        this.puzzle.map((row, i) => (
            row.map((cell, j) => {
                if (cell.removed) {
                    this.puzzle[i][j] = {...this.puzzle[i][j], removed: []}
                }
            })
        ))
    }
}


const INITIAL_STATE = {
    sudoku: new Sudoku([
        [
            {'type': 'mark', 'position': [0, 0, 0], 'value': [2, 3, 5]},
            {'type': 'mark', 'position': [0, 1, 0], 'value': [2, 3, 4, 5, 6, 8]},
            {'type': 'mark', 'position': [0, 2, 0], 'value': [8, 2, 5, 6]},
            {'type': 'mark', 'position': [0, 3, 1], 'value': [3, 4, 5, 6, 7, 8]},
            {'type': 'cell', 'position': [0, 4, 1], 'value': 9},
            {'type': 'mark', 'position': [0, 5, 1], 'value': [3, 4, 5, 6, 7]},
            {'type': 'cell', 'position': [0, 6, 2], 'value': 1},
            {'type': 'mark', 'position': [0, 7, 2], 'value': [6, 7]},
            {'type': 'mark', 'position': [0, 8, 2], 'value': [4, 6, 7]}
        ],
        [
            {'type': 'mark', 'position': [1, 0, 0], 'value': [5]},
            {'type': 'mark', 'position': [1, 1, 0], 'value': [4, 5, 6, 8, 9]},
            {'type': 'mark', 'position': [1, 2, 0], 'value': [8, 1, 5, 6]},
            {'type': 'mark', 'position': [1, 3, 1], 'value': [4, 5, 6, 7, 8]},
            {'type': 'mark', 'position': [1, 4, 1], 'value': [8, 4, 5, 7]},
            {'type': 'cell', 'position': [1, 5, 1], 'value': 2},
            {'type': 'cell', 'position': [1, 6, 2], 'value': 3},
            {'type': 'mark', 'position': [1, 7, 2], 'value': [9, 6, 7]},
            {'type': 'mark', 'position': [1, 8, 2], 'value': [9, 4, 6, 7]}
        ],
        [
            {'type': 'mark', 'position': [2, 0, 0], 'value': [3]},
            {'type': 'mark', 'position': [2, 1, 0], 'value': [9, 3, 4, 6]},
            {'type': 'cell', 'position': [2, 2, 0], 'value': 7},
            {'type': 'mark', 'position': [2, 3, 1], 'value': [3, 4, 6]},
            {'type': 'mark', 'position': [2, 4, 1], 'value': [4]},
            {'type': 'cell', 'position': [2, 5, 1], 'value': 1},
            {'type': 'cell', 'position': [2, 6, 2], 'value': 8},
            {'type': 'cell', 'position': [2, 7, 2], 'value': 2},
            {'type': 'cell', 'position': [2, 8, 2], 'value': 5}
        ],
        [
            {'type': 'cell', 'position': [3, 0, 3], 'value': 6},
            {'type': 'mark', 'position': [3, 1, 3], 'value': [2, 5]},
            {'type': 'cell', 'position': [3, 2, 3], 'value': 4},
            {'type': 'mark', 'position': [3, 3, 4], 'value': [1, 2, 5, 7]},
            {'type': 'cell', 'position': [3, 4, 4], 'value': 3},
            {'type': 'cell', 'position': [3, 5, 4], 'value': 8},
            {'type': 'cell', 'position': [3, 6, 5], 'value': 9},
            {'type': 'mark', 'position': [3, 7, 5], 'value': [1, 5, 7]},
            {'type': 'mark', 'position': [3, 8, 5], 'value': [2, 7]}
        ],
        [
            {'type': 'cell', 'position': [4, 0, 3], 'value': 8},
            {'type': 'cell', 'position': [4, 1, 3], 'value': 1},
            {'type': 'mark', 'position': [4, 2, 3], 'value': [2, 5]},
            {'type': 'mark', 'position': [4, 3, 4], 'value': [2, 4, 5, 6, 7, 9]},
            {'type': 'mark', 'position': [4, 4, 4], 'value': [2, 4, 5, 7]},
            {'type': 'mark', 'position': [4, 5, 4], 'value': [4, 5, 6, 7, 9]},
            {'type': 'mark', 'position': [4, 6, 5], 'value': [2, 4, 5]},
            {'type': 'mark', 'position': [4, 7, 5], 'value': [3, 5, 6, 7]},
            {'type': 'mark', 'position': [4, 8, 5], 'value': [2, 4, 6, 7]}
        ],
        [
            {'type': 'mark', 'position': [5, 0, 3], 'value': [2, 3, 5, 7]},
            {'type': 'mark', 'position': [5, 1, 3], 'value': [2, 3, 5]},
            {'type': 'cell', 'position': [5, 2, 3], 'value': 9},
            {'type': 'mark', 'position': [5, 3, 4], 'value': [1, 2, 4, 5, 6, 7]},
            {'type': 'mark', 'position': [5, 4, 4], 'value': [2, 4, 5, 7]},
            {'type': 'mark', 'position': [5, 5, 4], 'value': [4, 5, 6, 7]},
            {'type': 'mark', 'position': [5, 6, 5], 'value': [2, 4, 5]},
            {'type': 'mark', 'position': [5, 7, 5], 'value': [1, 3, 5, 6, 7]},
            {'type': 'cell', 'position': [5, 8, 5], 'value': 8}
        ],
        [
            {'type': 'cell', 'position': [6, 0, 6], 'value': 1},
            {'type': 'cell', 'position': [6, 1, 6], 'value': 7},
            {'type': 'mark', 'position': [6, 2, 6], 'value': [8, 2, 5]},
            {'type': 'mark', 'position': [6, 3, 7], 'value': [2, 3, 4, 5, 8, 9]},
            {'type': 'mark', 'position': [6, 4, 7], 'value': [8, 2, 4, 5]},
            {'type': 'mark', 'position': [6, 5, 7], 'value': [9, 3, 4, 5]},
            {'type': 'cell', 'position': [6, 6, 8], 'value': 6},
            {'type': 'mark', 'position': [6, 7, 8], 'value': [8, 9, 5]},
            {'type': 'mark', 'position': [6, 8, 8], 'value': [9, 2]}
        ],
        [
            {'type': 'cell', 'position': [7, 0, 6], 'value': 9},
            {'type': 'mark', 'position': [7, 1, 6], 'value': [8, 2, 5, 6]},
            {'type': 'mark', 'position': [7, 2, 6], 'value': [8, 2, 5, 6]},
            {'type': 'mark', 'position': [7, 3, 7], 'value': [8, 2, 5]},
            {'type': 'cell', 'position': [7, 4, 7], 'value': 1},
            {'type': 'mark', 'position': [7, 5, 7], 'value': [5]},
            {'type': 'cell', 'position': [7, 6, 8], 'value': 7},
            {'type': 'cell', 'position': [7, 7, 8], 'value': 4},
            {'type': 'cell', 'position': [7, 8, 8], 'value': 3}
        ],
        [
            {'type': 'cell', 'position': [8, 0, 6], 'value': 4},
            {'type': 'mark', 'position': [8, 1, 6], 'value': [8, 2, 5]},
            {'type': 'cell', 'position': [8, 2, 6], 'value': 3},
            {'type': 'mark', 'position': [8, 3, 7], 'value': [2, 5, 7, 8, 9]},
            {'type': 'cell', 'position': [8, 4, 7], 'value': 6},
            {'type': 'mark', 'position': [8, 5, 7], 'value': [9, 5, 7]},
            {'type': 'mark', 'position': [8, 6, 8], 'value': [2, 5]},
            {'type': 'mark', 'position': [8, 7, 8], 'value': [8, 9, 5]},
            {'type': 'cell', 'position': [8, 8, 8], 'value': 1}
        ]
    ]),
    steps: [
        {
            "combination": {
                "name": "Lone Single",
                "marks": [
                    {
                        "type": "mark",
                        "position": [1, 0, 0],
                        "value": [5],
                    },
                ],
                values: [5],
            },
            "changed_cells": [
                {"type": "cell", "position": [1, 0, 0], "value": 5},
                {"type": "mark", "position": [0, 1, 0], "value": [2, 3, 4, 6, 8]},
                {"type": "mark", "position": [0, 2, 0], "value": [8, 2, 6]},
                {"type": "mark", "position": [0, 0, 0], "value": [2, 3]},
                {"type": "mark", "position": [1, 1, 0], "value": [8, 9, 4, 6]},
                {"type": "mark", "position": [1, 2, 0], "value": [8, 1, 6]},
                {"type": "mark", "position": [1, 3, 1], "value": [8, 4, 6, 7]},
                {"type": "mark", "position": [5, 0, 3], "value": [2, 3, 7]},
                {"type": "mark", "position": [1, 4, 1], "value": [8, 4, 7]},
            ],
        },
        {
            "combination": {
                "name": "Lone Single",
                "marks": [
                    {
                        "type": "mark",
                        "position": [2, 0, 0],
                        "value": [3],
                    },
                ],
                values: [3],
            },
            "changed_cells": [
                {"type": "cell", "position": [2, 0, 0], "value": 3},
                {"type": "mark", "position": [0, 1, 0], "value": [8, 2, 4, 6]},
                {"type": "mark", "position": [2, 1, 0], "value": [9, 4, 6]},
                {"type": "mark", "position": [0, 0, 0], "value": [2]},
                {"type": "mark", "position": [2, 3, 1], "value": [4, 6]},
                {"type": "mark", "position": [5, 0, 3], "value": [2, 7]},
            ],
        },
    ],
    nextStep: 0,
};


export const SudokuReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_CELL:
            var { row, col, value, keyCode } = action.payload;
            console.log({ row, col, value, keyCode });
            var { sudoku } = state;
            console.log(sudoku);
            if (keyCode === 8 || value === "") {  // backspace
                sudoku.updateMark(row, col, [])
            };
            if (value && value >= 1 && value <= 9) {
                sudoku.updateCell(row, col, value)
            };
            return {
                ...state,
                sudoku: sudoku,
            };
        case TOGGLE_MARK:
            var { row, col, value } = action.payload;
            var { sudoku } = state;
            if (sudoku.puzzle[row][col].value.indexOf(value) < 0) {
                sudoku.updateMark(row, col, [value, ...sudoku.puzzle[row][col].value])
            } else {
                sudoku.updateMark(row, col, sudoku.puzzle[row][col].value.filter((e) => { return e !== value }))
            }
            return {
                ...state,
                sudoku: sudoku,
            };
        case NEXT_STEP:
            var { sudoku, steps, nextStep } = state;
            if (nextStep < steps.length) {
                sudoku.applyStep(steps[nextStep])
                return {
                    ...state,
                    sudoku: sudoku,
                    nextStep: nextStep + 1,
                }
            }
            return state
        case SELECT_CELL:
            var { row, col } = action.payload;
            var { sudoku } = state;
            sudoku.selectCells([[row, col]])
            return {
                ...state,
                sudoku: sudoku,
            }
        default:
            return state;
    }
};
