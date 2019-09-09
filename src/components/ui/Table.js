import React, { Fragment } from "react";
import { arrayOf, shape, string } from "prop-types";
import styled from "styled-components";
import Button from "./Button";
import TableCell from "./TableCell";

const HeaderCell = styled.div`
  font-weight: bold;
`;

const StyledTable = styled.div`
  display: grid;
  grid-template-columns:
    repeat(${props => (props.columns ? props.columns.length : 1)}, 1fr)
    ${props => props.actions && "auto"};
`;

const Table = ({ columns, entries, actions }) => (
  <StyledTable columns={columns} actions={actions}>
    {/* Header cells */}
    {columns.map(({ key, name }) => (
      <HeaderCell key={`${key}Header`}>{name}</HeaderCell>
    ))}
    {actions && <HeaderCell />}

    {/* Content cells */}
    {entries.map(entry => (
      <Fragment key={entry.id}>
        {/* Data columns */}
        {columns.map(({ key, lookup, type }) => (
          <TableCell
            key={key}
            lookup={lookup}
            type={type}
            fieldValue={entry[key]}
          />
        ))}
        {/* Action buttons */}
        {actions && (
          <div>
            {actions.delete && (
              <Button onClick={() => actions.delete(entry.id)}>Delete</Button>
            )}
            {actions.edit && (
              <Button onClick={() => actions.edit(entry)}>Edit</Button>
            )}
          </div>
        )}
      </Fragment>
    ))}
  </StyledTable>
);
Table.propTypes = {
  columns: arrayOf(shape({ id: string, uid: string, name: string })),
  entries: arrayOf(shape({})),
  actions: shape({})
};
Table.defaultProps = {
  columns: [],
  entries: []
};

export default Table;
