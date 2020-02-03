import React from 'react';
import { Box } from 'grommet';
import HintButton from '../containers/HintButton';
import History from '../containers/History';


const ControlBar = () => (
  <Box align="end" fill="horizontal" justify="between" direction="row">
    <History />
    <Box pad="small">
      <Box round="full" overflow="hidden" background="brand">
        <HintButton />
      </Box>
    </Box>
  </Box>
);

export default ControlBar;
