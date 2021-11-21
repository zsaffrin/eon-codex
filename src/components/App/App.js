import { FirebaseProvider } from '../../contexts';

import GlobalStyle from './GlobalStyle';
import AppTest from './AppTest';

const App = () => {
  return (
    <FirebaseProvider>
      <GlobalStyle />
      <h1>EonCodex 0.6.0</h1>
      <AppTest />
    </FirebaseProvider>
  );
};

export default App;
