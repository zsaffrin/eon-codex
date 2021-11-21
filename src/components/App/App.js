import { FirebaseProvider } from '../../contexts';

import GlobalStyle from './GlobalStyle';

const App = () => {
  return (
    <FirebaseProvider>
      <GlobalStyle />
    </FirebaseProvider>
  );
};

export default App;
