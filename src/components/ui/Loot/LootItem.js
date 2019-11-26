import React from "react";
import styled from "styled-components";

import { Link, Lookup } from "../../ui";

const TableRow = styled.tr(({ theme }) => {
  const { space } = theme;
  return `
    & > td {
      padding: ${space.sm} ${space.md};
    }
  `;
});

const LootItem = ({ item }) => {
  const { name, claim, comments, url } = item;
  return (
    <TableRow>
      <td>
        {url ? (
          <Link external to={url}>
            {name}
          </Link>
        ) : (
          name
        )}
      </td>
      <td>
        <Lookup collection="playerCharacters" recordId={claim} />
      </td>
      <td>{comments}</td>
    </TableRow>
  );
};

export default LootItem;
