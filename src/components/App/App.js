import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowDown,
  faArrowUp,
  faChevronLeft,
  faChevronRight,
  faCopy,
  faCog,
  faDharmachakra,
  faEdit,
  faFan,
  faFlask,
  faHome,
  faInfoCircle,
  faMagic,
  faPlus,
  faRing,
  faScroll,
  faShieldAlt,
  faToolbox,
  faTrashAlt,
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
  faChevronLeft,
  faChevronRight,
  faCopy,
  faCog,
  faDharmachakra,
  faEdit,
  faFan,
  faFlask,
  faGithub,
  faHome,
  faInfoCircle,
  faMagic,
  faPlus,
  faRing,
  faScroll,
  faShieldAlt,
  faSpotify,
  faToolbox,
  faTrashAlt,
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
