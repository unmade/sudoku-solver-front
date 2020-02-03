import React from 'react';
import { connect } from 'react-redux';
import { Box } from 'grommet';
import { retrieveSudoku } from '../store/sudoku/actions';
import ControlBar from '../components/ControlBar';
import Sudoku from '../containers/Sudoku';


class Daily extends React.Component {
  componentDidMount() {
    const { retrieveSudoku: retrieve } = this.props;
    retrieve({ slug: 'daily' });
  }

  render() {
    return (
      <Box fill="vertical">
        <Box fill justify="center">
          <Box>
            <Sudoku />
          </Box>
        </Box>
        <Box responsive={false}>
          <ControlBar />
        </Box>
      </Box>
    );
  }
}


export default connect(null, { retrieveSudoku })(Daily);
