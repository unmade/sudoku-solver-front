import { put, takeEvery } from 'redux-saga/effects';
import API_BASE_URL from '../api-config';

const RETRIEVE_SUDOKU = 'RETRIEVE_SUDOKU';
export const RETRIEVE_SUDOKU_REQUEST = 'RETRIEVE_SUDOKU_REQUEST';
export const RETRIEVE_SUDOKU_SUCCESS = 'RETRIEVE_SUDOKU_SUCCESS';
export const RETRIEVE_SUDOKU_FAILURE = 'RETRIEVE_SUDOKU_FAILURE';

export const SELECT_CELL = 'SELECT_CELL';
export const CLEAR_SELECTION = 'CLEAR_SELECTION';
export const SET_CELL_SINGLE_VALUE = 'SET_CELL_SINGLE_VALUE';
export const CLEAR_CELL = 'CLEAR_CELL';
export const TOGGLE_MARK = 'TOGGLE_MARK';
export const NEXT_STEP = 'NEXT_STEP';


function retrieveSudokuRequest() {
  return {
    type: RETRIEVE_SUDOKU_REQUEST,
    payload: null,
  };
}


function retrieveSudokuSuccess(puzzle) {
  return {
    type: RETRIEVE_SUDOKU_SUCCESS,
    payload: puzzle,
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


export function nextStep() {
  return {
    type: NEXT_STEP,
    payload: null,
  };
}


export const sudokuSagas = [
  takeEvery(RETRIEVE_SUDOKU, retrieveSudokuSaga),
];
