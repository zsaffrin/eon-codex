import React from 'react';
import { arrayOf, shape, number } from 'prop-types';
import styled from 'styled-components';

import SessionLootCategory from './SessionLootCategory';
import SessionGoldLoot from './SessionGoldLoot';

const StyledLootCategories = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${space.md};
  `;
});

const SessionLootCategories = ({
  lootCategoryData, lootItemData, schemaFields, participants,
}) => {
  const goldLootItems = lootItemData.filter((i) => i.category === 'dipcwkNkgCZKjI2gGVFD');
  const miscLootItems = lootItemData.filter((i) => !i.category);

  const lootItemSections = lootCategoryData.reduce((acc, cat) => {
    const { id, name } = cat;
    const items = lootItemData.filter((item) => item.category === id);
    return items.length > 0 && id !== 'dipcwkNkgCZKjI2gGVFD' ? [
      ...acc,
      (
        <SessionLootCategory
          key={id}
          items={items}
          title={name}
          fields={schemaFields}
        />
      ),
    ] : acc;
  }, []);

  return (
    <StyledLootCategories>
      {/* Gold */}
      {goldLootItems.length > 0 && (
        <SessionGoldLoot
          key="dipcwkNkgCZKjI2gGVFD"
          items={goldLootItems}
          title="Gold"
          fields={schemaFields}
          shares={participants}
        />
      )}

      {/* Other Categories */}
      {lootItemSections}

      {/* Misc (no Category) */}
      {miscLootItems.length > 0 && (
        <SessionLootCategory
          key="misc"
          items={miscLootItems}
          title="Misc"
          fields={schemaFields}
        />
      )}
    </StyledLootCategories>
  );
};

SessionLootCategories.propTypes = {
  lootItemData: arrayOf(shape({})),
  lootCategoryData: arrayOf(shape({})),
  schemaFields: arrayOf(shape({})),
  participants: number,
};
SessionLootCategories.defaultProps = {
  lootItemData: [],
  lootCategoryData: [],
  schemaFields: [],
  participants: 0,
};

export default SessionLootCategories;
