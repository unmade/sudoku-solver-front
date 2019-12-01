import { connect } from 'react-redux';
import {
  selectCell, clearCell, setCellSingleValue, toggleMark, clearSelection,
} from '../actions/sudoku/actions';
import Cell from '../components/Cell';


const mapStateToProps = (state, ownProps) => ({
  item: state.sudoku.sudoku.puzzle[ownProps.row][ownProps.col],
});


const mapDispatchToProps = (dispatch) => ({
  toggleMark: ({ row, col, value }) => dispatch(toggleMark({ row, col, value })),
  onFocus: ({ row, col }) => () => dispatch(selectCell({ row, col })),
  onBlur: () => dispatch(clearSelection()),
  onKeyUp: ({ row, col }) => (event) => {
    if (event.keyCode === 8) { // backspace
      dispatch(clearCell({ row, col }));
    }
    if (event.key >= 1 && event.key <= 9) {
      dispatch(setCellSingleValue({ row, col, value: event.key }));
    }
  },
});


const CellContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cell);


export default CellContainer;
