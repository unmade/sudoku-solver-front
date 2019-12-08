import { parseSudoku, emptySudoku, applyHint } from '../../sudoku';
import {
  APPLY_HINT,
  CELL_CHANGED,
  RETRIEVE_HINT_SUCCESS,
  RETRIEVE_SUDOKU_SUCCESS,
  RETRIEVE_HINT_FAILURE,
  REDO_CHANGE,
  UNDO_CHANGE,
  RETRIEVE_HINT_REQUEST,
} from './actions';


const INITIAL_STATE = {
  sudoku: emptySudoku(9, 9),
  hasChanges: true,
  history: {
    undo: [],
    redo: [],
  },
  hint: {
    item: null,
    loading: false,
    error: null,
  },
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
        hasChanges: false,
        hint: {
          item: null,
          error: null,
          loading: false,
        },
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
        hasChanges: true,
      };
    }
    case RETRIEVE_HINT_FAILURE: {
      return {
        ...state,
        hint: {
          item: null,
          loading: false,
          error: action.payload,
        },
      };
    }
    case RETRIEVE_HINT_REQUEST: {
      return {
        ...state,
        hint: {
          ...state.hint,
          loading: true,
        },
      };
    }
    case RETRIEVE_HINT_SUCCESS: {
      return {
        ...state,
        hint: {
          item: action.payload,
          loading: false,
          error: null,
        },
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
        hasChanges: true,
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
        hasChanges: true,
      };
    }
    default:
      return state;
  }
};


export default SudokuReducer;
