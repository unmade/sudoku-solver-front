import React from 'react';
import {
  Box, Button, Heading, Paragraph, Text,
} from 'grommet';
import { Close } from 'grommet-icons';
import getHintMessage from '../hints';


const border = {
  color: 'brand',
  size: 'xsmall',
};


const HintModal = ({
  hint, loading, onCancel, onNext, onClose,
}) => {
  const message = getHintMessage(hint.combination.name);
  return (
    <Box border={border} pad="medium" gap="small" size="small">
      <Box direction="row" justify="between" align="center">
        <Heading level={4} margin="xsmall">
          {`Hint: ${message.title}`}
        </Heading>
        <Button icon={<Close size="small" />} onClick={onClose} />
      </Box>
      <Box>
        <Paragraph size="small">
          {message.description}
        </Paragraph>
      </Box>
      <Box direction="row" gap="medium" justify="between">
        <Box>
          <Button
            label={<Text size="small">Cancel</Text>}
            onClick={onCancel}
          />
        </Box>
        <Box>
          <Button
            label={<Text size="small">Next</Text>}
            onClick={onNext}
            disabled={loading}
            primary
          />
        </Box>
      </Box>
    </Box>
  );
};


export default HintModal;
