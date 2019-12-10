import { connect } from 'react-redux';
import Grid from '../components/Grid';
import { cellChanged } from '../store/sudoku/actions';


const mapStateToProps = (state) => ({
  sudoku: state.sudoku.sudoku,
  boxSize: state.sudoku.boxSize,
});


const mapDispatchToProps = (dispatch) => ({
  onCellChange: (sudoku) => dispatch(cellChanged({ sudoku })),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Grid);
