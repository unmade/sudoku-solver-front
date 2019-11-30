import React from 'react';
import { connect } from 'react-redux';
import Grid from '../components/Grid';


const mapStateToProps = state => ({
  sudoku: state.sudoku.sudoku.puzzle,
});


const SudokuGrid = connect(
  mapStateToProps,
)(Grid);


export default SudokuGrid;
