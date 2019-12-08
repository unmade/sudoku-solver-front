import React from 'react';
import {
  Box, Button, Heading, Paragraph,
} from 'grommet';
import { Close } from 'grommet-icons';


const border = {
  color: 'status-error',
  size: 'xsmall',
};


const ErrorModal = ({ error, onClose }) => (
  <Box border={border} pad="medium" gap="small" size="small">
    <Box direction="row" justify="between" align="center">
      <Heading level={4} margin="xsmall">
        {error.title}
      </Heading>
      <Button icon={<Close size="small" />} onClick={onClose} />
    </Box>
    <Box>
      <Paragraph size="small">
        {error.description}
      </Paragraph>
    </Box>
  </Box>
);


export default ErrorModal;
