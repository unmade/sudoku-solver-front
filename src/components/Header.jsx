import React from 'react';
import { Button, Header as GrommetHeader } from 'grommet';
import { Menu } from 'grommet-icons';
import AvatarOrSignIn from '../containers/AvatarOrSignIn';


const headerPad = {
  horizontal: 'medium',
  vertical: 'small',
};


const Header = ({ onMenuClick }) => (
  <GrommetHeader gridArea="header" pad={headerPad}>
    <Button icon={<Menu />} onClick={onMenuClick} />
    <AvatarOrSignIn />
  </GrommetHeader>
);

export default Header;
