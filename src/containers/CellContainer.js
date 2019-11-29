import React from 'react';
import { connect } from 'react-redux';
import { updateCell, toggleMark } from '../actions/sudoku/actions';
import Cell from "../components/Cell";


const mapStateToProps = (state, ownProps) => ({
    row: ownProps.row,
    col: ownProps.col,
    item: state.sudoku.sudoku[ownProps.row][ownProps.col],
})


const mapDispatchToProps = dispatch => ({
    updateCell: ({ row, col, value, keyCode }) => dispatch(updateCell({ row, col, value, keyCode })),
    toggleMark: ({ row, col, value }) => dispatch(toggleMark({ row, col, value })),
});


const CellContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Cell);
  

  export default CellContainer;
