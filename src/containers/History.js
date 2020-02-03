import { connect } from 'react-redux';
import { redoChange, undoChange } from '../store/sudoku/actions';
import History from '../components/History';


const mapStateToProps = (state) => ({
  canRedo: state.sudoku.history.redo.length === 0,
  canUndo: state.sudoku.history.undo.length === 0,
});


const mapDispatchToProps = (dispatch) => ({
  onRedo: () => dispatch(redoChange()),
  onUndo: () => dispatch(undoChange()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(History);
