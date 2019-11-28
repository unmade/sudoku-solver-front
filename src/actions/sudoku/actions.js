export const TOGGLE_MARK = 'TOGGLE_MARK';
export const UPDATE_CELL = 'UPDATE_CELL';


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


export function updateCell(props) {
  const {row, col, value} = props
  return {
    type: UPDATE_CELL,
    payload: {
      row,
      col,
      value,
    },
  };
}
