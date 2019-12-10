import {
  applyHint,
  clearSelection,
  emptySudoku,
  makeSudoku,
  selectCells,
} from '../../sudoku';
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

const DEFAULT_BOX_SIZE = [3, 3];

const INITIAL_STATE = {
  sudoku: emptySudoku(DEFAULT_BOX_SIZE[0] * DEFAULT_BOX_SIZE[1]),
  boxSize: DEFAULT_BOX_SIZE,
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
      const { sudoku } = state;
      const hint = action.payload;
      const positions = hint.combination.cells.map(({ position }) => [position[0], position[1]]);
      return {
        ...state,
        sudoku: selectCells(clearSelection(sudoku), positions),
        hint: {
          item: action.payload,
          loading: false,
          error: null,
        },
      };
    }
    case RETRIEVE_SUDOKU_SUCCESS: {
      const { cells, boxSize } = action.payload;
      return {
        ...state,
        boxSize,
        sudoku: makeSudoku(cells, boxSize),
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
