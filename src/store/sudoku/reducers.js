import { parseSudoku, emptySudoku, applyHint } from '../../sudoku';
import {
  APPLY_HINT,
  CELL_CHANGED,
  RETRIEVE_HINT_SUCCESS,
  RETRIEVE_SUDOKU_SUCCESS,
  REDO_CHANGE,
  UNDO_CHANGE,
} from './actions';


const INITIAL_STATE = {
  sudoku: emptySudoku(9, 9),
  history: {
    undo: [],
    redo: [],
  },
  hint: null,
};


const SudokuReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APPLY_HINT: {
      const { hint } = action.payload;
      const { sudoku, history } = state;
      history.undo.push(sudoku);
      return {
        ...state,
        history,
        sudoku: applyHint(sudoku, hint),
        hint: null,
      };
    }
    case CELL_CHANGED: {
      const { sudoku: current, history } = state;
      const { sudoku } = action.payload;
      history.undo.push(current);
      history.redo = [];
      return {
        ...state,
        history,
        sudoku,
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
      };
    }
    case REDO_CHANGE: {
      const { sudoku: current, history } = state;
      const sudoku = history.redo.pop();
      history.undo.push(current);
      return {
        ...state,
        history,
        sudoku,
      };
    }
    case UNDO_CHANGE: {
      const { sudoku: current, history } = state;
      const sudoku = history.undo.pop();
      history.redo.push(current);
      return {
        ...state,
        history,
        sudoku,
      };
    }
    default:
      return state;
  }
};


export default SudokuReducer;
