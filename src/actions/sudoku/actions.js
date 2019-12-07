import { put, takeEvery } from 'redux-saga/effects';
import API_BASE_URL from '../api-config';

const RETRIEVE_SUDOKU = 'RETRIEVE_SUDOKU';
export const RETRIEVE_SUDOKU_REQUEST = 'RETRIEVE_SUDOKU_REQUEST';
export const RETRIEVE_SUDOKU_SUCCESS = 'RETRIEVE_SUDOKU_SUCCESS';
export const RETRIEVE_SUDOKU_FAILURE = 'RETRIEVE_SUDOKU_FAILURE';

const RETRIEVE_HINT = 'RETRIEVE_HINT';
export const RETRIEVE_HINT_REQUEST = 'RETRIEVE_HINT_REQUEST';
export const RETRIEVE_HINT_SUCCESS = 'RETRIEVE_HINT_SUCCESS';
export const RETRIEVE_HINT_FAILURE = 'RETRIEVE_HINT_FAILURE';

export const SELECT_CELL = 'SELECT_CELL';
export const CLEAR_SELECTION = 'CLEAR_SELECTION';
export const SET_CELL_SINGLE_VALUE = 'SET_CELL_SINGLE_VALUE';
export const CLEAR_CELL = 'CLEAR_CELL';
export const TOGGLE_MARK = 'TOGGLE_MARK';
export const APPLY_HINT = 'APPLY_HINT';


function retrieveSudokuRequest() {
  return {
    type: RETRIEVE_SUDOKU_REQUEST,
    payload: null,
  };
}


function retrieveSudokuSuccess({ puzzle, solution }) {
  return {
    type: RETRIEVE_SUDOKU_SUCCESS,
    payload: {
      puzzle,
      solution,
    },
  };
}


function retrieveSudokuFailure(error) {
  return {
    type: RETRIEVE_SUDOKU_FAILURE,
    payload: error,
  };
}


export function retrieveSudoku() {
  return {
    type: RETRIEVE_SUDOKU,
    payload: null,
  };
}


function* retrieveSudokuSaga() {
  const url = `${API_BASE_URL}/sudoku`;

  yield put(retrieveSudokuRequest());

  try {
    const response = yield fetch(url);
    const data = yield response.json();
    yield put(retrieveSudokuSuccess(data));
  } catch (e) {
    yield put(retrieveSudokuFailure(e));
  }
}


function retrieveHintRequest() {
  return {
    type: RETRIEVE_HINT_REQUEST,
    payload: null,
  };
}


function retrieveHintSuccess(hint) {
  return {
    type: RETRIEVE_HINT_SUCCESS,
    payload: hint,
  };
}


function retrieveHintFailure(error) {
  return {
    type: RETRIEVE_HINT_FAILURE,
    payload: error,
  };
}


export function retrieveHint({ puzzle, slug }) {
  return {
    type: RETRIEVE_HINT,
    payload: {
      puzzle,
      slug,
    },
  };
}


function* retrieveHintSaga({ payload }) {
  const { puzzle } = payload;
  const cells = [];
  const marks = [];
  puzzle.forEach((row) => (
    row.forEach((cell) => {
      if (cell.type === 'mark') {
        marks.push(cell);
      }
      if (cell.type === 'cell') {
        cells.push(cell);
      }
    })
  ));
  const url = `${API_BASE_URL}/hints`;
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cells, marks }),
  };
  yield put(retrieveHintRequest());

  try {
    const response = yield fetch(url, options);
    const data = yield response.json();
    yield put(retrieveHintSuccess(data));
  } catch (e) {
    yield put(retrieveHintFailure(e));
  }
}


export function selectCell({ row, col }) {
  return {
    type: SELECT_CELL,
    payload: {
      row,
      col,
    },
  };
}


export function clearSelection() {
  return {
    type: CLEAR_SELECTION,
    payload: null,
  };
}


export function setCellSingleValue({ row, col, value }) {
  return {
    type: SET_CELL_SINGLE_VALUE,
    payload: {
      row,
      col,
      value,
    },
  };
}


export function clearCell({ row, col }) {
  return {
    type: CLEAR_CELL,
    payload: {
      row,
      col,
    },
  };
}


export function toggleMark({ row, col, value }) {
  return {
    type: TOGGLE_MARK,
    payload: {
      row,
      col,
      value,
    },
  };
}


export function applyHint({ hint }) {
  return {
    type: APPLY_HINT,
    payload: {
      hint,
    },
  };
}


export const sudokuSagas = [
  takeEvery(RETRIEVE_SUDOKU, retrieveSudokuSaga),
  takeEvery(RETRIEVE_HINT, retrieveHintSaga),
];