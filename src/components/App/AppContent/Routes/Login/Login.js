import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useFirebase, useMessage } from '../../../../../hooks';
import { Button, ButtonRow, Form, H, Page } from '../../../../ui';

const Panel = styled.div(({ theme }) => {
  const { borders, layout, space } = theme;

  return `
    border: 1px solid ${borders.color};
    border-radius: ${layout.borderRadius};
    display: grid;
    grid-gap: ${space.lg};
    margin: ${space.xl} auto;
    padding: ${space.xl};
    width: 100%;
    max-width: 30rem;
  `;
});
const StyledLink = styled(Link)(({ theme }) => {
  const { space } = theme;

  return `
    color: inherit;
    text-decoration: none;
    padding-top: ${space.xl};
  `;
});

const fields = [
  {
    key: 'username',
    label: 'Username',
  },
  {
    key: 'password',
    label: 'Password',
    type: 'password',
  }
];

const Login = () => {
  const { login } = useFirebase();
  const [message, setMessage] = useMessage();
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/');
  };
  
  const handleLoginError = (result) => {
    if (result.includes('invalid-email')) {
      setMessage('error', 'Username should be a valid email address');
    } else if (result.includes('user-not-found') || result.includes('wrong-password')) {
      setMessage('error', 'Wrong username and/or Password');
    } else if (result.includes('too-many-requests')) {
      setMessage('error', 'Account temporarily disabled for too many incorrect login attempts. Reset your password or try again after a few minutes.');
    } else {
      setMessage('error', JSON.stringify(result, ' ', 2));
    }
  };
  
  const handleFormSubmit = async (formData) => {
    setMessage();
    
    const { username, password } = formData;
    const res = await login(username.trim(), password);

    if (res.status === 'success') {
      handleLoginSuccess();
    } else if (res.status === 'error') {
      handleLoginError(res.result);
    } else {
      setMessage('error', 'Something went wrong');
    }
  };

  const buttonRow = (
    <div>
      <ButtonRow>
        <Button primary type="submit" label="Log In" />
      </ButtonRow>
    </div>
  );
  
  return (
    <Page>
      <StyledLink to="/">
        <H l={1} compact centered>Eon Codex</H>
      </StyledLink>
      <Panel>
        <H l={2} compact centered>Log In</H>
        {message}
        <Form
          fields={fields}
          onSubmit={handleFormSubmit}
          footer={buttonRow}
        />
      </Panel>
    </Page>
  );
};

export default Login;
