import React from 'react';
import styled from 'styled-components';

import { sortBy } from '../../../../../../../utils';
import { useCollection } from '../../../../../../../hooks';
import {
  Breadcrumb, H, Link, Loading, Page,
} from '../../../../../../ui';
import LinkStringItem from './LinkStringItem';

const PageLayout = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${space.lg};
    align-content: start;
  `;
});
const ColumnLayout = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${space.md};
    grid-template-columns: repeat(5, auto);
  `;
});
const ItemList = styled.div`
  font-size: 12px;
`;

const CopyLinkString = () => {
  const [groups, groupsLoading] = useCollection('groups');
  const [people, peopleLoading] = useCollection('people');
  const [places, placesLoading] = useCollection('places');
  const [playerCharacters, playerCharactersLoading] = useCollection('playerCharacters');
  const [sessions, sessionsLoading] = useCollection('sessions');

  const categories = [
    {
      label: 'Groups',
      linkKey: 'groups',
      items: groups,
    },
    {
      label: 'People',
      linkKey: 'people',
      items: people,
    },
    {
      label: 'Places',
      linkKey: 'places',
      items: places,
    },
    {
      label: 'PCs',
      linkKey: 'playerCharacters',
      items: playerCharacters,
    },
    {
      label: 'Sessions',
      linkKey: 'sessions',
      items: sessions,
    },
  ];

  return (
    <Page>
      <Breadcrumb items={[
        <Link to="/setup">Setup</Link>,
        <Link to="/setup/tools">Tools</Link>,
      ]}
      />
      <H l={1}>Copy Link String</H>
      <PageLayout>
        {groupsLoading
        || peopleLoading
        || placesLoading
        || playerCharactersLoading
        || sessionsLoading ? <Loading /> : (
          <ColumnLayout>
            {categories.map(({ label, linkKey, items }) => (
              <div key={linkKey}>
                <H l={2}>{label}</H>
                <ItemList>
                  {sortBy(items, 'name').map((item) => (
                    <LinkStringItem
                      key={item.id}
                      item={item}
                      categoryKey={linkKey}
                    />
                  ))}
                </ItemList>
              </div>
            ))}
          </ColumnLayout>
        )}
      </PageLayout>
    </Page>
  );
};

export default CopyLinkString;
