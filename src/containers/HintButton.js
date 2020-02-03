import { connect } from 'react-redux';
import { retrieveHint, undoChange } from '../store/sudoku/actions';
import HintButton from '../components/HintButton';


const mapStateToProps = (state) => ({
  sudoku: state.sudoku.sudoku,
  hasChanges: state.sudoku.hasChanges,
  hint: state.sudoku.hint,
});


const mapDispatchToProps = (dispatch) => ({
  undoChange: () => dispatch(undoChange()),
  retrieveHint: ({ sudoku, hasChanges }) => dispatch(retrieveHint({ sudoku, hasChanges })),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HintButton);
