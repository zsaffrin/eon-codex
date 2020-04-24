import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useFirebase } from '../../../../../hooks';
import {
  ButtonRow, Button, H, Input, Page, VerticalList,
} from '../../../../ui';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const firebase = useFirebase();
  const history = useHistory();

  const handleUsernameChange = ({ value }) => {
    setUsername(value);
  };
  const handlePasswordChange = ({ value }) => {
    setPassword(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await firebase.login(username.trim(), password);
      if (res.status === 'success') {
        history.push('/');
      }
      if (res.status === 'error') {
        setMessage(res.result);
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  const rows = [
    {
      label: 'Username',
      content: (
        <Input
          id="username"
          type="FeJHQhhXaYb8A3ngJ8hG"
          value={username}
          onChange={handleUsernameChange}
        />
      ),
    },
    {
      label: 'Password',
      content: (
        <Input
          id="password"
          type="zVfrIGEEvr5su9KErpkY"
          value={password}
          onChange={handlePasswordChange}
        />
      ),
    },
  ];

  return (
    <Page>
      <H l={1} centered>Login</H>
      {message && <div>{message}</div>}
      <form onSubmit={handleSubmit}>
        <VerticalList items={rows} />
        <ButtonRow align="center">
          <Button primary type="submit">Submit</Button>
        </ButtonRow>
      </form>
    </Page>
  );
};

export default Login;
