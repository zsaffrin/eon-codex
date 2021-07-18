import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { useFirebase, useForm, useMessage } from '../../../../../hooks';
import { Box, Button, ButtonRow, H, VerticalList } from '../../../../ui';
import Header from './Header';

const StyledPage = styled.div`
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    padding: ${space.xl} 0;
  `;
});
const StyledForm = styled.form(({ theme }) => {
  const { layout } = theme;
  return `
    display: grid;
    grid-gap: ${layout.padding};
  `;
});

const fields = [
  {
    id: 'username',
    label: 'Username',
    defaultValue: '',
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    defaultValue: '',
  },
];

const Login = () => {
  const firebase = useFirebase();
  const history = useHistory();
  const [message, setMessage] = useMessage();
  const [formData, formFields] = useForm(fields);

  const handleLoginSuccess = (uid) => {
    return firebase.updateDoc(`users/${uid}`, {
      lastLoginDate: new Date(),
    }).then(() => {
      history.push('/');
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await firebase.login(formData.username.trim(), formData.password);
      switch (res.status) {
        case 'success':
          handleLoginSuccess(res.result.user.uid);  
          break;
        case 'error':
          setMessage('error', res.result);
          break;
        default:
          setMessage('error', 'Something went wrong');
          break;
      }
    } catch (err) {
      setMessage('error', err, true);
    }
  };
  
  return (
    <StyledPage>
      <Box>
        <Title>
          <H l={1} compact centered>Eon Codex</H>
        </Title>
        <H l={2} compact centered>Login</H>
        {message}
        <StyledForm onSubmit={handleSubmit}>
          <VerticalList items={formFields} />
          <ButtonRow>
            <Button large type="submit">Submit</Button>
          </ButtonRow>
        </StyledForm>
      </Box>
    </StyledPage>
  );
};

export default Login;
