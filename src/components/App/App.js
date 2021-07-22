import { IconContext } from 'react-icons';
import { FirebaseProvider, UserProvider } from '../../contexts';
import GlobalStyle from './GlobalStyle';
import Theme from './Theme';
import AppContent from './AppContent';

const App = () => {
  return (
    <FirebaseProvider>
      <UserProvider>
        <Theme>
          <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
            <GlobalStyle />
            <AppContent />
          </IconContext.Provider>
        </Theme>
      </UserProvider>
    </FirebaseProvider>
  );
};

export default App;