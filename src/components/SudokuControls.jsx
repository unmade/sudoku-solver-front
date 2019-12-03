import React from 'react';
import { Box, Button } from 'grommet';
import {
  Erase, Redo, Undo,
} from 'grommet-icons';
import HintButton from '../containers/HintButton';


const SudokuControls = () => (
  <Box>
    <Box direction="row" pad="small" gap="medium" align="center">
      <Box round="full" overflow="hidden" background="brand">
        <Button icon={<Undo />} hoverIndicator />
      </Box>
      <Box round="full" overflow="hidden" background="brand">
        <Button icon={<Redo />} hoverIndicator />
      </Box>
      <Box round="full" overflow="hidden" background="brand">
        <Button icon={<Erase />} hoverIndicator />
      </Box>
      <Box round="full" overflow="hidden" background="brand">
        <HintButton />
      </Box>
    </Box>
  </Box>
);


export default SudokuControls;
