import React, { useContext, useState } from "react";
import styled from "styled-components";

import { FirebaseContext } from "../../contexts/firebaseContext";
import { useMenuItems } from "../../hooks/firestoreHooks";
import { Button, Input } from "../ui";

const StyledField = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const Field = ({ data }) => {
  const [fieldData, setFieldData] = useState(data);
  const [edit, setEdit] = useState(false);
  const [fieldTypes, fieldTypesLoading] = useMenuItems("fieldTypes");
  const firebase = useContext(FirebaseContext);

  const { key, lookup, name, order, type } = fieldData;

  const toggleEdit = () => setEdit(!edit);

  const handleFieldChange = e => {
    setFieldData({
      ...fieldData,
      [e.target.id]: e.target.value
    });
  };

  const cancelEdit = () => {
    setFieldData(data);
    toggleEdit();
  };

  async function saveField() {
    toggleEdit();
    try {
      const { id, ...rest } = fieldData;
      const res = await firebase.updateDoc(`schemaFields/${id}`, rest);
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

  async function deleteField() {
    toggleEdit();
    try {
      const { id, ...rest } = fieldData;
      const res = await firebase.db.doc(`schemaFields/${id}`).delete();
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

  return (
    <StyledField>
      <div>
        {edit ? (
          <Input
            type="text"
            id="key"
            value={key}
            onChange={handleFieldChange}
          />
        ) : (
          key
        )}
      </div>
      <div>
        {edit ? (
          <Input
            type="text"
            id="name"
            value={name}
            onChange={handleFieldChange}
          />
        ) : (
          name
        )}
      </div>
      <div>
        {edit ? (
          <Input
            type="number"
            id="order"
            value={order}
            onChange={handleFieldChange}
          />
        ) : (
          order
        )}
      </div>
      <div>
        {edit ? (
          !fieldTypesLoading && (
            <>
              <select id="type" value={type} onChange={handleFieldChange}>
                <option value=""></option>
                {fieldTypes.map(({ itemKey, name }) => (
                  <option key={itemKey} value={itemKey}>
                    {name}
                  </option>
                ))}
              </select>
              {type === "menu" ||
                (type === "lookup" && (
                  <Input
                    type="text"
                    id="lookup"
                    value={lookup}
                    onChange={handleFieldChange}
                  />
                ))}
            </>
          )
        ) : (
          <>
            {type}
            {lookup}
          </>
        )}
      </div>
      <div>
        {edit ? (
          <>
            <Button onClick={saveField}>Save</Button>
            <Button onClick={cancelEdit}>Cancel</Button>
            <Button onClick={deleteField}>Delete</Button>
          </>
        ) : (
          <Button onClick={toggleEdit}>Edit</Button>
        )}
      </div>
    </StyledField>
  );
};

export default Field;
