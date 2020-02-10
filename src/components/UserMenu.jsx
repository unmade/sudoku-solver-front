import React from 'react';
import { Box, Button } from 'grommet';
import { Logout } from 'grommet-icons';


const UserMenu = ({ onSignOut }) => (
  <Box pad="small" width="small">
    <Button
      icon={<Logout />}
      onClick={onSignOut}
      label="Sign Out"
      plain
    />
  </Box>
);

export default UserMenu;
