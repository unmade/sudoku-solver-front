import React from 'react';
import { Button, Text } from 'grommet';
import { Google } from 'grommet-icons';
import GoogleLogin from 'react-google-login';

const GOOGLE_OAUTH2_KEY = process.env.REACT_APP_GOOGLE_OAUTH2_KEY;


const GoogleSignIn = ({ onSuccess, onFailure }) => (
  <GoogleLogin
    clientId={GOOGLE_OAUTH2_KEY}
    onSuccess={onSuccess}
    onFailure={onFailure}
    responseType="code"
    render={(renderProps) => (
      <Button
        icon={<Google color="plain" />}
        label={<Text weight="bold">Sign In</Text>}
        onClick={renderProps.onClick}
        disabled={renderProps.disabled}
        plain
      />
    )}
  />
);

export default GoogleSignIn;
