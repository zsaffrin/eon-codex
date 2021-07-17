import { BrowserRouter } from 'react-router-dom';

import { useUser } from '../../../hooks';
import { Loading } from '../../ui';
import Routes from './Routes';

const AppContent = () => {
  const isUserLoaded = useUser()[1];

  if (!isUserLoaded) { return <Loading fullpage />; }
  
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default AppContent;