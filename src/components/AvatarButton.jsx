import React from 'react';
import { Box, DropButton, Image } from 'grommet';
import UserMenu from './UserMenu';


const dropProps = {
  align: {
    top: 'bottom',
  },
  margin: {
    left: '-20px',
  },
};


const AvatarButton = ({ profile, onSignOut }) => (
  <DropButton
    dropContent={<UserMenu onSignOut={onSignOut} />}
    dropProps={dropProps}
  >
    <Box width="xxsmall" height="xxsmall" round="full" overflow="hidden">
      <Image fill fit="cover" src={profile.pictureUrl} />
    </Box>
  </DropButton>
);

export default AvatarButton;
