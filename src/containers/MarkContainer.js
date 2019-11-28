import React from 'react';
import { connect } from 'react-redux';
import { toggleMark } from '../actions/sudoku/actions';
import Mark from "../components/Mark";


const mapStateToProps = (state, ownProps) => ({
    row: ownProps.row,
    col: ownProps.col,
    marks: state.sudoku.sudoku[ownProps.row][ownProps.col].value,
})


const mapDispatchToProps = dispatch => ({
    toggleMark: ({ row, col, value }) => () => (dispatch(toggleMark({ row, col, value }))),
});


const MarkContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Mark);
  

  export default MarkContainer;
