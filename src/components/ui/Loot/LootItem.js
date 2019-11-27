import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "../../../contexts";
import { Button, Link, Lookup } from "../../ui";

const TableRow = styled.tr(({ theme }) => {
  const { space } = theme;
  return `
    & > td {
      padding: ${space.sm} ${space.md};
    }
  `;
});

const LootItem = ({ item }) => {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const { id, name, claim, comments, url } = item;

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
      {user.canEdit && (
        <td>
          <Button
            tiny
            onClick={() => history.push(`/sessions/editLootItem/${id}`)}
          >
            Edit
          </Button>
        </td>
      )}
    </TableRow>
  );
};

export default LootItem;
