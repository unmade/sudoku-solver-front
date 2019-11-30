import { connect } from 'react-redux';
import { nextStep } from '../actions/sudoku/actions';
import SudokuControls from '../components/SudokuControls';


const mapDispatchToProps = dispatch => ({
    nextStep: () => dispatch(nextStep()),
});


const SudokuControlsContainer = connect(
    null,
    mapDispatchToProps,
)(SudokuControls);
  

export default SudokuControlsContainer;
