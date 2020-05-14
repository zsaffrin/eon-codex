import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowDown,
  faArrowUp,
  faCog,
  faDharmachakra,
  faEdit,
  faHome,
  faInfoCircle,
  faPlus,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faSpotify } from '@fortawesome/free-brands-svg-icons';

import { FirebaseProvider, UserProvider } from '../../contexts';
import GlobalStyle from './GlobalStyle';
import Theme from './Theme';
import Content from './Content';

library.add(
  faArrowDown,
  faArrowUp,
  faCog,
  faDharmachakra,
  faEdit,
  faGithub,
  faHome,
  faInfoCircle,
  faPlus,
  faSpotify,
  faUser,
);

const App = () => (
  <FirebaseProvider>
    <UserProvider>
      <Theme>
        <GlobalStyle />
        <Content />
      </Theme>
    </UserProvider>
  </FirebaseProvider>
);

export default App;
