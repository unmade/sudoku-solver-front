import React from 'react';
import { Box, Layer, ThemeContext } from 'grommet';
import HintButton from '../containers/HintButton';
import History from '../containers/History';


const zIndexLayer = {
  layer: {
    container: {
      zIndex: 10,
    },
  },
};


const ControlBar = () => (
  <Box>
    <ThemeContext.Extend value={zIndexLayer}>
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
    </ThemeContext.Extend>
  </Box>
);

export default ControlBar;
