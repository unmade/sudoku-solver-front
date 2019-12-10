import React from 'react';
import { Box } from 'grommet';
import Sudoku from '../containers/Sudoku';
import SudokuControls from '../components/SudokuControls';


const BlankGrid = () => (
  <Box align="center">
    <Sudoku />
    <SudokuControls />
  </Box>
);


export default BlankGrid;
