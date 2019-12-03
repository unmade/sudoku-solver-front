import React from 'react';
import {
  Box, Button, Heading, Paragraph, Text,
} from 'grommet';
import { Close } from 'grommet-icons';


const border = {
  color: 'brand',
  size: 'xsmall',
};


const HintModal = ({ hint, onReveal, onClose }) => (
  <Box border={border} pad="medium" gap="small" size="small">
    <Box direction="row" justify="between" align="center">
      <Heading level={4} margin="xsmall">
        {`Hint: ${hint.combination.name}`}
      </Heading>
      <Button icon={<Close size="small" />} onClick={onClose} />
    </Box>
    <Box>
      <Paragraph size="small">
        {hint.combination.description}
      </Paragraph>
    </Box>
    <Box direction="row" gap="medium" justify="between">
      <Box>
        <Button label={<Text size="small">Learn More</Text>} />
      </Box>
      <Box>
        <Button label={<Text size="small">Reveal</Text>} onClick={onReveal} primary />
      </Box>
    </Box>
  </Box>
);


export default HintModal;
