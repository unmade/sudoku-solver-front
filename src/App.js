import React from 'react';
import { grommet, Box, Button, Grid, Grommet, Heading, Text } from 'grommet';
import { Erase, Info, Redo, Undo } from "grommet-icons";
import SudokuGrid from './containers/SudokuGrid';

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
        <Box gridArea="header" direction="row" align="center" justify="center">
        </Box>

        <Box gridArea="sudoku" fill="vertical" justify="center" align="center">
            <SudokuGrid />
            <Box direction="row" pad="small" gap="medium" align="center">
              <Box round="full" overflow="hidden" background="brand">
                <Button icon={<Undo />} hoverIndicator/>
              </Box>
              <Box round="full" overflow="hidden" background="brand">
                <Button icon={<Redo />} hoverIndicator/>
              </Box>
              <Box round="full" overflow="hidden" background="brand">
                <Button icon={<Erase />} hoverIndicator/>
              </Box>
              <Box round="full" overflow="hidden" background="brand">
                <Button icon={<Info />} hoverIndicator/>
              </Box>
            </Box>
        </Box>

      </Grid>
    </Grommet>
  );
}

export default App;
