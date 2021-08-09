import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { useFirebase, useForm, useMessage } from '../../../../../hooks';
import { Box, Button, ButtonRow, H, StackedList } from '../../../../ui';

const StyledPage = styled.div(({ theme }) => {
  const { layout } = theme;
  return `
    height: 100vh;
    display: grid;
    align-items: center;
    padding: ${layout.padding};
  `;
});
const ContentWrap = styled.div(({ theme }) => {
  const { layout } = theme;
  return `
    display: grid;
    grid-gap: ${layout.padding};
    padding: ${layout.padding};
    width: 100%;
    max-width: 20rem;
    min-width: 12rem;
    margin: 0 auto;
  `;
});
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

  const handleLoginSuccess = ({ uid }) => {
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
          handleLoginSuccess(res.result.user);  
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
      <ContentWrap>
        <Title>
          <H l={1} compact centered>Eon Codex</H>
        </Title>
        <Box>
          {message}
          <StyledForm onSubmit={handleSubmit}>
            <StackedList items={formFields} />
            <ButtonRow compact>
              <Button large type="submit">Login</Button>
            </ButtonRow>
          </StyledForm>
        </Box>
      </ContentWrap>
    </StyledPage>
  );
};

export default Login;
