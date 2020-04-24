import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';

import { useCurrentUser } from '../../../hooks';
import { Loading } from '../../ui';
import Header from './Header';
import Routes from './Routes';
import Footer from './Footer';

const ContentLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
`;
const FullHeightWrap = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: calc(100vh - 1rem);
`;

const Content = () => {
  const { userLoaded } = useCurrentUser();

  return !userLoaded ? <Loading /> : (
    <ContentLayout>
      <BrowserRouter>
        <FullHeightWrap>
          <Route path="*" component={Header} />
          <Routes />
        </FullHeightWrap>

        <Route path="*" component={Footer} />
      </BrowserRouter>
    </ContentLayout>
  );
};

export default Content;
