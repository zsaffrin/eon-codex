import { useHistory } from 'react-router-dom';

import { H } from '../../../../../ui';

const Header = () => {
  const history = useHistory();
  
  return (
    <header>
      <H l={1} compact onClick={() => history.push('/')}>
        Eon Codex
      </H>
    </header>
  );
};

export default Header;
