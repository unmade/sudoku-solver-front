export const TOGGLE_MARK = 'TOGGLE_MARK';


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
