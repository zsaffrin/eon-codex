import { BrowserRouter } from 'react-router-dom';

import { useUser } from '../../../hooks';
import { Loading } from '../../ui';
import Routes from './Routes';

const AppContent = () => {
  const userLoading = useUser()[1];

  if (userLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default AppContent;
