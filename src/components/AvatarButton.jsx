import React from 'react';
import {
  Box, Button, DropButton, Image,
} from 'grommet';
import { Logout } from 'grommet-icons';


const dropProps = {
  align: {
    top: 'bottom',
  },
  margin: {
    left: '-20px',
  },
};


const Content = () => (
  <Box pad="small" width="small">
    <Button icon={<Logout />} label="Sign Out" plain />
  </Box>
);


const AvatarButton = ({ profile }) => (
  <DropButton
    dropContent={<Content />}
    dropProps={dropProps}
  >
    <Box width="xxsmall" height="xxsmall" round="full" overflow="hidden">
      <Image fill fit="cover" src={profile.pictureUrl} />
    </Box>
  </DropButton>
);

export default AvatarButton;
