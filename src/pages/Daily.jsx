import React from 'react';
import { connect } from 'react-redux';
import { Box } from 'grommet';
import { retrieveSudoku } from '../store/sudoku/actions';
import SudokuGrid from '../containers/SudokuGrid';
import SudokuControls from '../components/SudokuControls';


class Daily extends React.Component {
  componentDidMount() {
    const { retrieveSudoku: retrieve } = this.props;
    retrieve();
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


export default connect(null, { retrieveSudoku })(Daily);
