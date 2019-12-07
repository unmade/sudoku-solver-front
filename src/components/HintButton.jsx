import React from 'react';
import { Box, Button, Layer } from 'grommet';
import { Info } from 'grommet-icons';
import HintModal from './HintModal';


const layerMargin = {
  vertical: 'medium',
  horizontal: 'small',
};


class HintButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  onOpen() {
    const { sudoku, retrieveHint } = this.props;
    retrieveHint({ puzzle: sudoku });
    this.setState({
      open: true,
    });
  }

  onClose() {
    this.setState({
      open: false,
    });
  }

  onReveal() {
    const { hint, applyHint } = this.props;
    applyHint({ hint });
    this.setState({
      open: false,
    });
  }

  render() {
    const { hint } = this.props;
    const { open } = this.state;
    const shouldOpen = !!hint && open;
    return (
      <Box>
        <Button
          icon={<Info />}
          hoverIndicator
          open={shouldOpen}
          onClick={() => this.onOpen()}
        />
        {shouldOpen && (
          <Layer
            position="top-right"
            modal={false}
            responsive={false}
            margin={layerMargin}
            onEsc={() => this.onClose()}
          >
            <HintModal
              hint={hint}
              onReveal={() => this.onReveal()}
              onClose={() => this.onClose()}
            />
          </Layer>
        )}
      </Box>
    );
  }
}


export default HintButton;
