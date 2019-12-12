import { connect } from 'react-redux';
import { Button } from 'grommet';
import { undoChange } from '../store/sudoku/actions';


const mapStateToProps = (state) => ({
  disabled: state.sudoku.history.undo.length === 0,
});


const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(undoChange()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Button);
