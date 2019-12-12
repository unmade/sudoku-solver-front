import { connect } from 'react-redux';
import { applyHint, retrieveHint } from '../store/sudoku/actions';
import HintButton from '../components/HintButton';


const mapStateToProps = (state) => ({
  sudoku: state.sudoku.sudoku,
  hasChanges: state.sudoku.hasChanges,
  hint: state.sudoku.hint,
});


const mapDispatchToProps = (dispatch) => ({
  applyHint: ({ hint }) => dispatch(applyHint({ hint })),
  retrieveHint: ({ sudoku, hasChanges }) => dispatch(retrieveHint({ sudoku, hasChanges })),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HintButton);
