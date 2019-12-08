import React from 'react';
import { Box } from 'grommet';
import SudokuGrid from '../containers/SudokuGrid';
import SudokuControls from '../components/SudokuControls';


const BlankGrid = () => (
  <Box align="center">
    <SudokuGrid />
    <SudokuControls />
  </Box>
);


export default BlankGrid;
