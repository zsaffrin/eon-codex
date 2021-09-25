import { AppDataProvider as AppDataContextProvider } from '../../../contexts';
import { useCollection } from '../../../hooks';
import { Loading } from '../../ui';

const AppDataProvider = ({ children }) => {
  const [invitationStatuses, invitationStatusesLoading] = useCollection('invitationStatuses');

  if (
    invitationStatusesLoading
  ) {
    return <Loading />;
  }
  
  const appData = {
    invitationStatuses,
  };
  
  return (
    <AppDataContextProvider appData={appData}>
      {children}
    </AppDataContextProvider>
  );
};

export default AppDataProvider;

