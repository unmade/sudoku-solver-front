import { connect } from 'react-redux';
import { Button } from 'grommet';
import { redoChange } from '../store/sudoku/actions';


const mapStateToProps = (state) => ({
  disabled: state.sudoku.history.redo.length === 0,
});


const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(redoChange()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Button);
