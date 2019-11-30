export const TOGGLE_MARK = 'TOGGLE_MARK';
export const SELECT_CELL = 'SELECT_CELL';
export const UPDATE_CELL = 'UPDATE_CELL';
export const NEXT_STEP = 'NEXT_STEP';


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


export function updateCell({ row, col, value, keyCode }) {
  return {
    type: UPDATE_CELL,
    payload: {
      row,
      col,
      value,
      keyCode,
    },
  };
}


export function nextStep() {
  return {
    type: NEXT_STEP,
    payload: null,
  };
}
