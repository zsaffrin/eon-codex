import React from 'react';
import styled from 'styled-components';

import { Page } from '../ui';
import InfoNav from './InfoNav';
import RecordList from './RecordList';
import RecordContent from './RecordContent';

const StyledPage = styled(Page)`
  display: grid;
  grid-template-rows: min-content 1fr;
`;
const ContentWrap = styled.div(({ theme }) => {
  const { color } = theme;
  return `
    border: 1px solid ${color.lightgray};
    display: grid;
    grid-template-columns: 1fr 3fr;
  `;
});

const Info = () => (
  <StyledPage>
    <InfoNav />
    <ContentWrap>
      <RecordList />
      <RecordContent />
    </ContentWrap>
  </StyledPage>
);

export default Info;
