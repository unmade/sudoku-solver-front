import React from 'react';
import {
  grommet, Box, Grid, Grommet,
} from 'grommet';
import SudokuGrid from './containers/SudokuGrid';
import SudokuControls from './containers/SudokuControls';


function App() {
  return (
    <Grommet theme={grommet} full>
      <Grid
        fill
        gap="small"
        rows={['auto', 'flex']}
        columns={['auto', 'flex']}
        areas={[
          { name: 'header', start: [0, 0], end: [1, 0] },
          { name: 'sudoku', start: [0, 1], end: [1, 1] },
        ]}
      >
        <Box gridArea="header" direction="row" align="center" justify="center" />

        <Box gridArea="sudoku" fill="vertical" justify="center" align="center">
          <SudokuGrid />
          <SudokuControls />
        </Box>

      </Grid>
    </Grommet>
  );
}

export default App;
