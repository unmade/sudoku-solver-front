import React from 'react';
import { Box, Button, Layer } from 'grommet';
import { Info } from 'grommet-icons';
import HintModal from './HintModal';


const layerMargin = {
  vertical: 'medium',
  horizontal: 'small',
};


const HintButton = ({ sudoku, hint, applyHint, retrieveHint }) => {
  const [open, setOpen] = React.useState();
  const onOpen = () => {
    retrieveHint({ puzzle: sudoku.puzzle });
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onReveal = () => {
    applyHint({ hint });
    setOpen(false);
  };
  const shouldOpen = !!hint && open;
  return (
    <Box>
      <Button
        icon={<Info />}
        hoverIndicator
        open={shouldOpen}
        onClick={onOpen}
      />
      {hint && open && (
        <Layer
          position="top-right"
          modal={false}
          responsive={false}
          margin={layerMargin}
          onEsc={onClose}
        >
          <HintModal hint={hint} onReveal={onReveal} onClose={onClose} />
        </Layer>
      )}
    </Box>
  );
};


export default HintButton;
