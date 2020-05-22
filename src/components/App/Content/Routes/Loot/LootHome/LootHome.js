import React from 'react';
import { arrayOf, shape } from 'prop-types';

import { H, Page } from '../../../../../ui';
import LootList from './LootList';

const LootHome = ({ items }) => {
  const filteredItems = items.filter((i) => (
    i.category !== 'dipcwkNkgCZKjI2gGVFD'
    && !i.unclaimable
  ));

  return (
    <Page>
      <H l={1}>Loot</H>
      <LootList items={filteredItems} />
    </Page>
  );
};

LootHome.propTypes = {
  items: arrayOf(shape({})),
};
LootHome.defaultProps = {
  items: [],
};

export default LootHome;
