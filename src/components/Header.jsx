import React from 'react';
import { Button, Header as GrommetHeader } from 'grommet';
import { Menu } from 'grommet-icons';
import AvatarButton from './AvatarButton';
import GoogleButton from './GoogleButton';


const headerPad = {
  horizontal: 'medium',
  vertical: 'small',
};


const Header = ({ profile, onSignInSuccess, onMenuClick }) => (
  <GrommetHeader gridArea="header" pad={headerPad}>
    <Button icon={<Menu />} onClick={onMenuClick} />
    {(profile) ? (
      <AvatarButton profile={profile} />
    ) : (
      <GoogleButton onSuccess={onSignInSuccess} />
    )}
  </GrommetHeader>
);

export default Header;
