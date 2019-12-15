import { connect } from 'react-redux';
import Sudoku from '../components/Sudoku';
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
)(Sudoku);
