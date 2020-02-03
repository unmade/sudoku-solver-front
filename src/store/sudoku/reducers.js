import {
  applyHint,
  emptySudoku,
  makeSudoku,
} from '../../sudoku';
import {
  CELL_CHANGED,
  RETRIEVE_HINT_SUCCESS,
  RETRIEVE_SUDOKU_SUCCESS,
  RETRIEVE_HINT_FAILURE,
  REDO_CHANGE,
  UNDO_CHANGE,
  RETRIEVE_HINT_REQUEST,
} from './actions';
import getMessageByCode from '../../errors';


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
      const { code } = action.payload;
      return {
        ...state,
        hint: {
          item: null,
          loading: false,
          error: getMessageByCode(code),
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
      const { sudoku, history } = state;
      const hint = action.payload;
      history.undo.push(sudoku);
      return {
        ...state,
        history,
        sudoku: applyHint(sudoku, hint),
        hasChanges: false,
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
