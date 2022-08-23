import { IconContext } from 'react-icons';

import { CloudinaryProvider, FirebaseProvider, UserProvider } from '../../contexts';

import Theme from './Theme';
import GlobalStyle from './GlobalStyle';
import AppContent from './AppContent';

const App = () => {
  return (
    <FirebaseProvider>
      <UserProvider>
        <CloudinaryProvider>
          <Theme>
            <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
              <GlobalStyle />
              <AppContent />
            </IconContext.Provider>
          </Theme>
        </CloudinaryProvider>
      </UserProvider>
    </FirebaseProvider>
  );
};

export default App;
