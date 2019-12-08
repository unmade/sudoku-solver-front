import { connect } from 'react-redux';
import Grid from '../components/Grid';
import { cellChanged } from '../actions/sudoku/actions';


const mapStateToProps = (state) => ({
  sudoku: state.sudoku.sudoku,
});


const mapDispatchToProps = (dispatch) => ({
  onCellChange: (sudoku) => dispatch(cellChanged({ sudoku })),
});


const SudokuGrid = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Grid);


export default SudokuGrid;
