import React from 'react';
import styled from 'styled-components';

import { Link, Page } from '../../../../ui';

const PaddedDiv = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    padding: ${space.lg}
  `;
});

const FourOhFour = () => (
  <Page>
    <PaddedDiv>
      404, chump
    </PaddedDiv>
    <PaddedDiv>
      I can&apos;t find this page like your mom couldn&apos;t find her pants this morning
    </PaddedDiv>
    <PaddedDiv>
      Give yer balls a tug!
    </PaddedDiv>
    <PaddedDiv>
      <Link to="/">Go home</Link>
    </PaddedDiv>
  </Page>
);

export default FourOhFour;
