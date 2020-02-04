import React from 'react';
import {
  Accordion,
  AccordionPanel,
  Box,
  Button,
  Paragraph,
  ResponsiveContext,
  Text,
  ThemeContext,
} from 'grommet';
import { Close, CircleInformation } from 'grommet-icons';
import getHintMessage from '../hints';


const border = {
  color: 'brand',
  size: 'xsmall',
};


const accordionTheme = {
  accordion: {
    icons: {
    },
    border: null,
  },
};


const AccordionHeader = (title) => (
  <Box direction="row" justify="between">
    <Box align="center" direction="row" gap="small">
      <CircleInformation color="brand" />
      <Text size="small" weight="bold">{title}</Text>
    </Box>
  </Box>
);


const HintModal = ({ hint, onClose }) => {
  const message = getHintMessage(hint.combination.name);
  const size = React.useContext(ResponsiveContext);
  const defaultIndex = (size === 'small') ? 1 : 0;
  const [activeIndex, setActiveIndex] = React.useState([defaultIndex]);
  return (
    <Box
      width="medium"
      border={border}
      direction="row"
      pad="small"
      gap="small"
      round="small"
      responsive={false}
    >
      <ThemeContext.Extend value={accordionTheme}>
        <Accordion
          activeIndex={activeIndex}
          onActive={(newActiveIndex) => setActiveIndex(newActiveIndex)}
        >
          <AccordionPanel label={AccordionHeader(message.title)}>
            <Box>
              <Paragraph size="small">
                {message.description}
              </Paragraph>
            </Box>
          </AccordionPanel>
        </Accordion>
      </ThemeContext.Extend>
      <Box>
        <Button icon={<Close />} onClick={onClose} plain />
      </Box>
    </Box>
  );
};


export default HintModal;
