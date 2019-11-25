import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useCollection } from "../../../hooks/firestoreHooks";
import { Loading } from "../../ui";
import LootItem from "./LootItem";

const StyledTable = styled.table(({ theme }) => {
  const { color } = theme;
  return `
    border: 1px solid ${color.lightgray};
    border-collapse: collapse;
    font-size: 0.9em;

    & tbody tr:nth-child(odd) {
      background: ${color.lightgray};
    }
  `;
});
const TableHead = styled.thead(({ theme }) => {
  const { space } = theme;
  return `
    & > th {
      font-size: 0.8em;
      font-weight: bold;
      padding: ${space.sm} ${space.md};
      text-align: left;
      text-transform: uppercase;
    }
  `;
});

const Loot = () => {
  const { sessionId } = useParams();
  const [items, itemsLoading] = useCollection("loot", [
    "session",
    "==",
    sessionId
  ]);

  if (itemsLoading) {
    return <Loading />;
  }

  return items.length > 0 ? (
    <StyledTable>
      <TableHead>
        <th>Item</th>
        <th>Claim</th>
        <th>Comments</th>
      </TableHead>
      <tbody>
        {items.map(item => (
          <LootItem item={item} key={item.id} />
        ))}
      </tbody>
    </StyledTable>
  ) : (
    <div>No loot</div>
  );
};

export default Loot;
