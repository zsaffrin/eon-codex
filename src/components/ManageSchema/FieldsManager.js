import React, { Fragment } from "react";
import { arrayOf, shape, string } from "prop-types";
import styled from "styled-components";

import { useCollection } from "../../hooks/firestoreHooks";
import { Button, Input, Loading } from "../ui";

const columns = [
  { key: "key", name: "Key" },
  { key: "name", name: "Name" },
  { key: "order", name: "Order" },
  { key: "type", name: "Type" }
];

const HeaderCell = styled.div`
  font-weight: bold;
`;

const StyledTable = styled.div`
  display: grid;
  grid-template-columns: repeat(${columns.length}, 1fr);
`;

const FullWidthCell = styled.div`
  grid-column: 1 / -1;
`;

const FieldsManager = ({ schemaName }) => {
  const [fields, fieldsLoading] = useCollection("schemaFields", [
    "schema",
    "==",
    "places"
  ]);

  return fieldsLoading ? (
    <Loading />
  ) : (
    <StyledTable>
      {columns.map(({ key, name }) => (
        <HeaderCell key={`${key}Header`}>{name}</HeaderCell>
      ))}
      {fields.map(({ key, name, order, type }) => (
        <Fragment key={key}>
          <div>
            <Input type="text" id="key" value={key} />
          </div>
          <div>
            <Input type="text" id="name" value={name} />
          </div>
          <div>
            <Input type="number" id="order" value={order} />
          </div>
          <div>
            <select value={type}>
              <option value=""></option>
              <option value="datetime">DateTime</option>
              <option value="lookup">Lookup</option>
              <option value="menu">Menu</option>
              <option value="text">Text</option>
            </select>
          </div>
        </Fragment>
      ))}
      <FullWidthCell>
        <Button>+</Button>
      </FullWidthCell>
    </StyledTable>
  );
};
FieldsManager.propTypes = {
  fields: arrayOf(shape({ key: string, name: string, type: string }))
};
FieldsManager.defaultProps = {
  fields: []
};

export default FieldsManager;
