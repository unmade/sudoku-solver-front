import { connect } from 'react-redux';
import { applyHint, retrieveHint } from '../actions/sudoku/actions';
import HintButton from '../components/HintButton';


const mapStateToProps = (state) => ({
  sudoku: state.sudoku.sudoku,
  hint: state.sudoku.hint,
});


const mapDispatchToProps = (dispatch) => ({
  applyHint: ({ hint }) => dispatch(applyHint({ hint })),
  retrieveHint: ({ puzzle }) => dispatch(retrieveHint({ puzzle })),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HintButton);
