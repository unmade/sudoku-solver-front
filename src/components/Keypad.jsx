import React from 'react';
import { Box, Button } from 'grommet';
import { Erase } from 'grommet-icons';


const Keypad = ({ size, onErase, onNumberClick }) => (
  <Box gap="medium" alignSelf="center" direction="row" justify="between" pad="medium">
    {[...Array(size).keys()].map((i) => (
      <Box key={i}>
        <Button onClick={() => onNumberClick(i + 1)} plain>{i + 1}</Button>
      </Box>
    ))}
    <Box>
      <Button icon={<Erase />} onClick={onErase} plain />
    </Box>
  </Box>
);


export default Keypad;
