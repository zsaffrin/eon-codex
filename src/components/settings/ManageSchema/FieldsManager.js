import React, { Fragment, useContext, useEffect, useState } from "react";
import { arrayOf, shape, string } from "prop-types";
import styled from "styled-components";

import { FirebaseContext } from "../../../contexts/firebaseContext";
import { useCollection } from "../../../hooks/firestoreHooks";
import { Button, Input, Loading } from "../../ui";
import { sortBy } from "../../../utils/dataUtils";
import Field from "./Field";

const columns = [
  { key: "key", name: "Key" },
  { key: "name", name: "Name" },
  { key: "order", name: "Order" },
  { key: "type", name: "Type" }
];

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const HeaderCell = styled.div`
  font-weight: bold;
`;

const FullWidthCell = styled.div`
  grid-column: 1 / -1;
`;

const FieldsManager = ({ schemaName }) => {
  const [fields, fieldsLoading] = useCollection("schemaFields", [
    "schema",
    "==",
    schemaName
  ]);
  const firebase = useContext(FirebaseContext);

  async function createNewField() {
    const maxOrder = fields.reduce(
      (acc, { order }) => (order > acc ? order : acc),
      0
    );
    try {
      const res = await firebase.db.collection("schemaFields").add({
        key: "",
        name: "",
        order: maxOrder + 1,
        schema: schemaName
      });
      if (res.status === "success") {
      }
      if (res.status === "error") {
        // Implement message display so this works
        // setMessage(res.result);
      }
    } catch (err) {
      // Implement message display so this works
      // setMessage(err.message);
    }
  }

  return fieldsLoading ? (
    <Loading />
  ) : (
    <div>
      <StyledHeader>
        {columns.map(({ key, name }) => (
          <HeaderCell key={`${key}Header`}>{name}</HeaderCell>
        ))}
      </StyledHeader>
      {sortBy(fields, "order").map(field => (
        <Field key={field.key} data={field} />
      ))}
      <FullWidthCell>
        <Button onClick={createNewField}>+</Button>
      </FullWidthCell>
    </div>
  );
};
FieldsManager.propTypes = {
  fields: arrayOf(shape({ key: string, name: string, type: string }))
};
FieldsManager.defaultProps = {
  fields: []
};

export default FieldsManager;
