import React from 'react';
import { connect } from 'react-redux';
import { Box } from 'grommet';
import { retrieveSudoku } from '../store/sudoku/actions';
import Sudoku from '../containers/Sudoku';
import ControlBar from '../components/ControlBar';


class Random extends React.Component {
  componentDidMount() {
    const { retrieveSudoku: retrieve } = this.props;
    retrieve({ slug: 'random' });
  }

  render() {
    return (
      <Box align="center">
        <Sudoku />
        <ControlBar />
      </Box>
    );
  }
}


export default connect(null, { retrieveSudoku })(Random);
