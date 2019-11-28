import React from 'react';
import { grommet, Box, Grommet } from 'grommet';
import SudokuGrid from './containers/SudokuGrid';

function App() {
  return (
    <Grommet theme={grommet} full>
      <Box pad="small">
        <SudokuGrid />
      </Box>
    </Grommet>
  );
}

export default App;
