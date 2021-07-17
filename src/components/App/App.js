import { FirebaseProvider, UserProvider } from '../../contexts';
import AppContent from './AppContent';

const App = () => {
  return (
    <FirebaseProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </FirebaseProvider>
  );
};

export default App;