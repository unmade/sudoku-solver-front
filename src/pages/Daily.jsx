import React from 'react';
import { connect } from 'react-redux';
import { Box } from 'grommet';
import { retrieveSudoku } from '../actions/sudoku/actions';
import SudokuGrid from '../containers/SudokuGrid';
import SudokuControls from '../components/SudokuControls';


class Daily extends React.Component {
  componentDidMount() {
    const { retrieveSudokuAction } = this.props;
    retrieveSudokuAction();
  }

  render() {
    return (
      <Box align="center">
        <SudokuGrid />
        <SudokuControls />
      </Box>
    );
  }
}


export default connect(null, { retrieveSudokuAction: retrieveSudoku })(Daily);
