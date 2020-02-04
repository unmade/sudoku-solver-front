import React from 'react';
import { Box, Button, Layer } from 'grommet';
import { Info } from 'grommet-icons';
import HintModal from './HintModal';
import ErrorModal from './ErrorModal';


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
    const { sudoku, hasChanges, retrieveHint } = this.props;
    retrieveHint({ sudoku, hasChanges });
    this.setState({
      open: true,
    });
  }

  onClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    const { hint } = this.props;
    const { open } = this.state;
    const shouldOpen = open;
    return (
      <Box>
        <Button
          icon={<Info />}
          hoverIndicator
          open={shouldOpen}
          onClick={() => this.onOpen()}
          disabled={hint.loading}
        />
        {shouldOpen && (
          <Layer
            position="top-right"
            modal={false}
            responsive={false}
            margin={layerMargin}
            onEsc={() => this.onClose()}
            onClickOutside={() => this.onClose()}
          >
            {hint.item && (
              <HintModal
                hint={hint.item}
                onClose={() => this.onClose()}
              />
            )}
            {hint.error && (
              <ErrorModal
                error={hint.error}
                onClose={() => this.onClose()}
              />
            )}
          </Layer>
        )}
      </Box>
    );
  }
}


export default HintButton;
