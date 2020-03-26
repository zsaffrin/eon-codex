import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  ButtonRow, Button, H, Input, Page, VerticalList,
} from '../ui';
import { FirebaseContext } from '../../contexts/firebaseContext';

const Login = () => {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [message, setMessage] = useState(null);
  const history = useHistory();
  const firebase = useContext(FirebaseContext);

  const handleFieldUpdate = (e) => {
    setCreds({
      ...creds,
      [e.target.id]: e.target.value,
    });
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const res = await firebase.login(creds.username.trim(), creds.password);
      if (res.status === 'success') {
        history.push('/');
      }
      if (res.status === 'error') {
        setMessage(res.result);
      }
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <Page fullWidth>
      <H l={1}>Log In</H>
      {message && <div>{message}</div>}
      <form onSubmit={handleFormSubmit}>
        <VerticalList
          items={[
            {
              label: 'Username',
              content: (
                <Input
                  type="text"
                  id="username"
                  value={creds.username}
                  onChange={handleFieldUpdate}
                />
              ),
            },
            {
              label: 'Password',
              content: (
                <Input
                  type="password"
                  id="password"
                  value={creds.password}
                  onChange={handleFieldUpdate}
                />
              ),
            },
            {
              fullRow: true,
              label: 'actions',
              content: (
                <ButtonRow align="center">
                  <Button type="submit">Submit</Button>
                </ButtonRow>
              ),
            },
          ]}
        />
      </form>
    </Page>
  );
};

export default Login;
