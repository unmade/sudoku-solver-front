import { TOGGLE_MARK, UPDATE_CELL } from "./actions";

const INITIAL_STATE = {
    sudoku: [
        [
            {'type': 'mark', 'value': [2, 3, 5]},
            {'type': 'mark', 'value': [2, 3, 4, 5, 6, 8]},
            {'type': 'mark', 'value': [8, 2, 5, 6]},
            {'type': 'mark', 'value': [3, 4, 5, 6, 7, 8]},
            {'type': 'cell', 'value': 9},
            {'type': 'mark', 'value': [3, 4, 5, 6, 7]},
            {'type': 'cell', 'value': 1},
            {'type': 'mark', 'value': [6, 7]},
            {'type': 'mark', 'value': [4, 6, 7]}
        ],
        [
            {'type': 'mark', 'value': [5]},
            {'type': 'mark', 'value': [4, 5, 6, 8, 9]},
            {'type': 'mark', 'value': [8, 1, 5, 6]},
            {'type': 'mark', 'value': [4, 5, 6, 7, 8]},
            {'type': 'mark', 'value': [8, 4, 5, 7]},
            {'type': 'cell', 'value': 2},
            {'type': 'cell', 'value': 3},
            {'type': 'mark', 'value': [9, 6, 7]},
            {'type': 'mark', 'value': [9, 4, 6, 7]}
        ],
        [
            {'type': 'mark', 'value': [3]},
            {'type': 'mark', 'value': [9, 3, 4, 6]},
            {'type': 'cell', 'value': 7},
            {'type': 'mark', 'value': [3, 4, 6]},
            {'type': 'mark', 'value': [4]},
            {'type': 'cell', 'value': 1},
            {'type': 'cell', 'value': 8},
            {'type': 'cell', 'value': 2},
            {'type': 'cell', 'value': 5}
        ],
        [
            {'type': 'cell', 'value': 6},
            {'type': 'mark', 'value': [2, 5]},
            {'type': 'cell', 'value': 4},
            {'type': 'mark', 'value': [1, 2, 5, 7]},
            {'type': 'cell', 'value': 3},
            {'type': 'cell', 'value': 8},
            {'type': 'cell', 'value': 9},
            {'type': 'mark', 'value': [1, 5, 7]},
            {'type': 'mark', 'value': [2, 7]}
        ],
        [
            {'type': 'cell', 'value': 8},
            {'type': 'cell', 'value': 1},
            {'type': 'mark', 'value': [2, 5]},
            {'type': 'mark', 'value': [2, 4, 5, 6, 7, 9]},
            {'type': 'mark', 'value': [2, 4, 5, 7]},
            {'type': 'mark', 'value': [4, 5, 6, 7, 9]},
            {'type': 'mark', 'value': [2, 4, 5]},
            {'type': 'mark', 'value': [3, 5, 6, 7]},
            {'type': 'mark', 'value': [2, 4, 6, 7]}
        ],
        [
            {'type': 'mark', 'value': [2, 3, 5, 7]},
            {'type': 'mark', 'value': [2, 3, 5]},
            {'type': 'cell', 'value': 9},
            {'type': 'mark', 'value': [1, 2, 4, 5, 6, 7]},
            {'type': 'mark', 'value': [2, 4, 5, 7]},
            {'type': 'mark', 'value': [4, 5, 6, 7]},
            {'type': 'mark', 'value': [2, 4, 5]},
            {'type': 'mark', 'value': [1, 3, 5, 6, 7]},
            {'type': 'cell', 'value': 8}
        ],
        [
            {'type': 'cell', 'value': 1},
            {'type': 'cell', 'value': 7},
            {'type': 'mark', 'value': [8, 2, 5]},
            {'type': 'mark', 'value': [2, 3, 4, 5, 8, 9]},
            {'type': 'mark', 'value': [8, 2, 4, 5]},
            {'type': 'mark', 'value': [9, 3, 4, 5]},
            {'type': 'cell', 'value': 6},
            {'type': 'mark', 'value': [8, 9, 5]},
            {'type': 'mark', 'value': [9, 2]}
        ],
        [
            {'type': 'cell', 'value': 9},
            {'type': 'mark', 'value': [8, 2, 5, 6]},
            {'type': 'mark', 'value': [8, 2, 5, 6]},
            {'type': 'mark', 'value': [8, 2, 5]},
            {'type': 'cell', 'value': 1},
            {'type': 'mark', 'value': [5]},
            {'type': 'cell', 'value': 7},
            {'type': 'cell', 'value': 4},
            {'type': 'cell', 'value': 3}
        ],
        [
            {'type': 'cell', 'value': 4},
            {'type': 'mark', 'value': [8, 2, 5]},
            {'type': 'cell', 'value': 3},
            {'type': 'mark', 'value': [2, 5, 7, 8, 9]},
            {'type': 'cell', 'value': 6},
            {'type': 'mark', 'value': [9, 5, 7]},
            {'type': 'mark', 'value': [2, 5]},
            {'type': 'mark', 'value': [8, 9, 5]},
            {'type': 'cell', 'value': 1}
        ]
    ],
};


export const SudokuReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_CELL:
            var { row, col, value } = action.payload;
            var { sudoku } = state;
            if (value === "") {
                sudoku[row][col] = {type: "mark", value: []}
                return {
                    sudoku: sudoku,
                };
            }
            if (value === "" || value && value >= 1 && value <= 9) {
                sudoku[row][col].value = value;
                return {
                    sudoku: sudoku,
                };
            };
            return state;
        case TOGGLE_MARK:
            var { row, col, value } = action.payload;
            var { sudoku } = state;
            if (sudoku[row][col].value.indexOf(value) < 0) {
                sudoku[row][col] = {type: "mark", value: [value, ...sudoku[row][col].value]}
            } else {
                sudoku[row][col] = {type: "mark", value: sudoku[row][col].value.filter((e) => { return e !== value })}
            }
            return {
                sudoku: sudoku,
            };
        default:
            return state;
    }
};
