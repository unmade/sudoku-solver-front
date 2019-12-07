import { parseSudoku, emptySudoku, applyHint } from '../../sudoku';
import {
  APPLY_HINT,
  RETRIEVE_HINT_SUCCESS,
  RETRIEVE_SUDOKU_SUCCESS,
} from './actions';


const INITIAL_STATE = {
  sudoku: emptySudoku(9, 9),
  hint: null,
};


const SudokuReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RETRIEVE_SUDOKU_SUCCESS: {
      const { puzzle } = action.payload;
      return {
        ...state,
        sudoku: parseSudoku(puzzle),
      };
    }
    case RETRIEVE_HINT_SUCCESS: {
      const { sudoku } = state;
      return {
        ...state,
        sudoku,
        hint: action.payload,
      };
    }
    case APPLY_HINT: {
      const { hint } = action.payload;
      const { sudoku } = state;
      return {
        ...state,
        sudoku: applyHint(sudoku, hint),
      };
    }
    default:
      return state;
  }
};


export default SudokuReducer;
