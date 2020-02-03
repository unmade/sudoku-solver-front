import React from 'react';
import { Box } from 'grommet';
import Sudoku from '../containers/Sudoku';
import ControlBar from '../components/ControlBar';


const BlankGrid = () => (
  <Box align="center">
    <Sudoku />
    <ControlBar />
  </Box>
);


export default BlankGrid;
