import React from 'react';
import AvatarButton from './AvatarButton';
import Loader from './Loader';
import GoogleButton from '../containers/GoogleButton';


class AvatarOrSignIn extends React.Component {
  componentDidMount() {
    const { profile, tokens, retrieveProfile } = this.props;
    if (tokens && !profile.item) {
      retrieveProfile(tokens);
    }
  }

  render() {
    const { profile, tokens, onSignOut } = this.props;
    if (profile && !profile.loading && profile.item) {
      return <AvatarButton profile={profile.item} onSignOut={onSignOut} />;
    }
    if (!tokens && profile && !profile.loading && profile.item === null) {
      return <GoogleButton />;
    }
    if (profile.error !== null) {
      return <GoogleButton />;
    }
    return <Loader />;
  }
}


export default AvatarOrSignIn;
