import Sudoku from '../../sudoku';
import {
  APPLY_HINT,
  CLEAR_CELL,
  CLEAR_SELECTION,
  SET_CELL_SINGLE_VALUE,
  RETRIEVE_HINT_SUCCESS,
  RETRIEVE_SUDOKU_SUCCESS,
  SELECT_CELL,
  TOGGLE_MARK,
} from './actions';


const INITIAL_STATE = {
  sudoku: new Sudoku(),
  hint: null,
  steps: [],
  nextStep: 0,
};


const SudokuReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RETRIEVE_SUDOKU_SUCCESS: {
      const { puzzle } = action.payload;
      return {
        ...state,
        sudoku: new Sudoku(puzzle),
      };
    }
    case SELECT_CELL: {
      const { row, col } = action.payload;
      const { sudoku } = state;
      sudoku.selectCells([[row, col]]);
      return {
        ...state,
        sudoku,
      };
    }
    case CLEAR_SELECTION: {
      const { sudoku } = state;
      sudoku.clearSelection();
      return {
        ...state,
        sudoku,
      };
    }
    case SET_CELL_SINGLE_VALUE: {
      const { row, col, value } = action.payload;
      const { sudoku } = state;
      sudoku.setCellSingleValue(row, col, value);
      return {
        ...state,
        sudoku,
      };
    }

    case CLEAR_CELL: {
      const { row, col } = action.payload;
      const { sudoku } = state;
      sudoku.clearCell(row, col);
      return {
        ...state,
        sudoku,
      };
    }
    case TOGGLE_MARK: {
      const { row, col, value } = action.payload;
      const { sudoku } = state;
      sudoku.toggleMarkValue(row, col, value);
      return {
        ...state,
        sudoku,
      };
    }
    case APPLY_HINT: {
      const { hint } = action.payload;
      const { sudoku } = state;
      sudoku.applyHint(hint);
      return {
        ...state,
        sudoku,
      };
    }
    case RETRIEVE_HINT_SUCCESS: {
      return {
        ...state,
        hint: action.payload,
      };
    }
    default:
      return state;
  }
};


export default SudokuReducer;
