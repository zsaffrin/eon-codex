import { useHistory } from 'react-router-dom';

import { Button, ButtonRow } from '../../../../../ui';

const Header = () => {
  const history = useHistory();
  
  return (
    <header>
      <ButtonRow>
        <Button onClick={() => history.push('/logout')}>Logout</Button>
      </ButtonRow>
    </header>
  );
};

export default Header;
