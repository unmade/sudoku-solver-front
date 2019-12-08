import { parseSudoku, emptySudoku, applyHint } from '../../sudoku';
import {
  APPLY_HINT,
  CELL_CHANGED,
  RETRIEVE_HINT_SUCCESS,
  RETRIEVE_SUDOKU_SUCCESS,
} from './actions';


const INITIAL_STATE = {
  sudoku: emptySudoku(9, 9),
  history: emptySudoku(9, 9),
  hint: null,
};


const SudokuReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APPLY_HINT: {
      const { hint } = action.payload;
      const { sudoku } = state;
      return {
        ...state,
        sudoku: applyHint(sudoku, hint),
      };
    }
    case CELL_CHANGED: {
      const { sudoku } = action.payload;
      return {
        ...state,
        history: sudoku,
      };
    }
    case RETRIEVE_HINT_SUCCESS: {
      return {
        ...state,
        hint: action.payload,
      };
    }
    case RETRIEVE_SUDOKU_SUCCESS: {
      const { puzzle } = action.payload;
      return {
        ...state,
        sudoku: parseSudoku(puzzle),
        history: parseSudoku(puzzle),
      };
    }
    default:
      return state;
  }
};


export default SudokuReducer;
