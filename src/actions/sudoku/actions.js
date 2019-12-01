export const TOGGLE_MARK = 'TOGGLE_MARK';
export const SELECT_CELL = 'SELECT_CELL';
export const CLEAR_CELL = 'CLEAR_CELL';
export const SET_CELL_SINGLE_VALUE = 'SET_CELL_SINGLE_VALUE';
export const NEXT_STEP = 'NEXT_STEP';
export const CLEAR_SELECTION = 'CLEAR_SELECTION';


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


export function selectCell({ row, col }) {
  return {
    type: SELECT_CELL,
    payload: {
      row,
      col,
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


export function clearSelection() {
  return {
    type: CLEAR_SELECTION,
    payload: null,
  };
}


export function nextStep() {
  return {
    type: NEXT_STEP,
    payload: null,
  };
}
