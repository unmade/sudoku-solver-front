import React from 'react';
import { Box, Layer } from 'grommet';
import HintButton from '../containers/HintButton';
import History from '../containers/History';


const ControlBar = () => (
  <Box>
    <Layer modal={false} position="bottom-left" responsive={false}>
      <History />
    </Layer>
    <Layer modal={false} position="bottom-right" responsive={false}>
      <Box pad="small">
        <Box round="full" overflow="hidden" background="brand">
          <HintButton />
        </Box>
      </Box>
    </Layer>
  </Box>
);

export default ControlBar;
