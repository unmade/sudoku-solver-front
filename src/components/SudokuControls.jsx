import React from 'react';
import { Box } from 'grommet';
import { Redo, Undo } from 'grommet-icons';
import HintButton from '../containers/HintButton';
import RedoButton from '../containers/RedoButton';
import UndoButton from '../containers/UndoButton';


const SudokuControls = () => (
  <Box>
    <Box direction="row" pad="small" gap="medium" align="center">
      <Box round="full" overflow="hidden" background="brand">
        <UndoButton icon={<Undo />} hoverIndicator />
      </Box>
      <Box round="full" overflow="hidden" background="brand">
        <RedoButton icon={<Redo />} hoverIndicator />
      </Box>
      <Box round="full" overflow="hidden" background="brand">
        <HintButton />
      </Box>
    </Box>
  </Box>
);


export default SudokuControls;
