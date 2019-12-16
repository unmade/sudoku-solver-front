import React from 'react';
import {
  Box, Button, Collapsible, Layer, ResponsiveContext,
} from 'grommet';
import { Close } from 'grommet-icons';


const Sidebar = ({ children, open, onClose }) => {
  const size = React.useContext(ResponsiveContext);
  if (!open || size !== 'small') {
    return (
      <Collapsible direction="horizontal" open={open}>
        <Box
          fill
          gap="medium"
          pad="medium"
        >
          {children}
        </Box>
      </Collapsible>
    );
  }
  return (
    <Layer gridArea="sidebar">
      <Box
        tag="header"
        justify="end"
        align="center"
        direction="row"
      >
        <Button
          icon={<Close />}
          onClick={onClose}
        />
      </Box>
      <Box
        fill
        gap="medium"
        pad="medium"
      >
        {children}
      </Box>
    </Layer>
  );
};


export default Sidebar;
