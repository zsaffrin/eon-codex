import React from 'react';
import styled from 'styled-components';

import { useCurrentUser } from '../../../../../../hooks';
import { Breadcrumb, H, Page } from '../../../../../ui';
import ManageCharacters from './ManageCharacters';

const PageLayout = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${space.xl};
  `;
});

const Profile = () => {
  const { user } = useCurrentUser();

  return (
    <Page>
      <PageLayout>
        <div>
          <Breadcrumb
            items={[
              'Player',
            ]}
          />
          <H l={1}>{user.name}</H>
        </div>
        <div>
          <H l={2}>My PCs</H>
          <ManageCharacters />
        </div>
      </PageLayout>
    </Page>
  );
};

export default Profile;
