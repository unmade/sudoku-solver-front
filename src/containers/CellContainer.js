import React from 'react';
import { connect } from 'react-redux';
import { updateCell } from '../actions/sudoku/actions';
import Cell from "../components/Cell";


const mapStateToProps = (state, ownProps) => ({
    row: ownProps.row,
    col: ownProps.col,
    value: state.sudoku.sudoku[ownProps.row][ownProps.col].value,
})


const mapDispatchToProps = dispatch => ({
    updateCell: ({ row, col }) => event => (dispatch(updateCell({ row, col, value: event.target.value }))),
});


const MarkContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Cell);
  

  export default MarkContainer;
