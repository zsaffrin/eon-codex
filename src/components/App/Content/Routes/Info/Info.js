import React from 'react';
import styled from 'styled-components';

import { Page } from '../../../../ui';
import InfoNav from './InfoNav';
import InfoCategory from './InfoCategory';

const StyledPage = styled(Page)`
  display: grid;
  grid-template-rows: min-content 1fr;
`;

const Info = () => (
  <StyledPage>
    <InfoNav />
    <InfoCategory />
  </StyledPage>
);

export default Info;
