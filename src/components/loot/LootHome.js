import React from 'react';
import styled from 'styled-components';

import { useCollection } from '../../hooks/firestoreHooks';
import { H, Loading, Page } from '../ui';
import LootListSection from './LootListSection';

const LootItemSections = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${space.md};
  `;
});
const Separator = styled.hr(({ theme }) => {
  const { color } = theme;
  return `
    background: ${color.lightgray};
    border: none;
    color: ${color.lightgray};
    height: 1px;
  `;
});


const LootHome = () => {
  const [lootItems, lootItemsLoading] = useCollection('loot');

  const unclaimedItems = lootItems ? lootItems.filter((item) => (
    !item.status
    || (item.status !== 'claimed' && item.status !== 'sold')
  )) : [];

  const unclaimedMagicItems = unclaimedItems.filter((item) => (
    item.category === 'magicItems'
  ));
  const unclaimedGear = unclaimedItems.filter((item) => (
    item.category === 'armor'
    || item.category === 'weapons'
  ));
  const unclaimedPotionsScrolls = unclaimedItems.filter((item) => (
    item.category === 'potions'
    || item.category === 'scrolls'
  ));
  const unclaimedMisc = unclaimedItems.filter((item) => (
    !item.category
  ));

  const sectionItems = [];
  if (unclaimedMagicItems.length > 0) {
    sectionItems.push({
      title: 'Magic Items',
      items: unclaimedMagicItems,
    });
  }
  if (unclaimedGear.length > 0) {
    sectionItems.push({
      title: 'Gear',
      items: unclaimedGear,
    });
  }
  if (unclaimedPotionsScrolls.length > 0) {
    sectionItems.push({
      title: 'Potions & Scrolls',
      items: unclaimedPotionsScrolls,
    });
  }
  if (unclaimedMisc.length > 0) {
    sectionItems.push({
      title: 'Misc',
      items: unclaimedMisc,
    });
  }

  return lootItemsLoading ? <Loading /> : (
    <Page>
      <H l={1}>Loot</H>
      <Separator />
      <H l={2}>Unclaimed</H>
      <LootItemSections>
        {sectionItems.map(({ title, items }) => (
          <LootListSection
            key={title}
            title={title}
            items={items}
          />
        ))}
      </LootItemSections>
    </Page>
  );
};

export default LootHome;
