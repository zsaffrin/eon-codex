import { IconContext } from 'react-icons';

import { FirebaseProvider, UserProvider } from '../../contexts';

import Theme from './Theme';
import GlobalStyle from './GlobalStyle';
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
