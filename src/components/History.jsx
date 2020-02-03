import React from 'react';
import { Box, Button } from 'grommet';
import { Redo, Undo } from 'grommet-icons';


const History = ({ canRedo, canUndo, onRedo, onUndo }) => (
  <Box direction="row" pad="small" gap="small">
    <Box round="full" overflow="hidden" background="white">
      <Button
        icon={<Undo />}
        onClick={onUndo}
        disabled={canUndo}
        hoverIndicator
      />
    </Box>
    <Box round="full" overflow="hidden" background="white">
      <Button
        icon={<Redo />}
        onClick={onRedo}
        disabled={canRedo}
        hoverIndicator
      />
    </Box>
  </Box>
);

export default History;
