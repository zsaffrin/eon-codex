import { FirebaseProvider, UserProvider } from '../../contexts';
import GlobalStyle from './GlobalStyle';
import Theme from './Theme';
import AppContent from './AppContent';

const App = () => {
  return (
    <FirebaseProvider>
      <UserProvider>
        <Theme>
          <GlobalStyle />
          <AppContent />
        </Theme>
      </UserProvider>
    </FirebaseProvider>
  );
};

export default App;