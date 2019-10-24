import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { FirebaseContext } from "../../contexts/firebaseContext";
import { useSchema } from "../../hooks/firestoreHooks";
import { Button, Input, Loading, VerticalList } from "../ui";
import FieldsManager from "./FieldsManager";

const ManageSchema = ({ schemaName }) => {
  const [schema, schemaLoading] = useSchema(schemaName);
  const [workingSchema, setWorkingSchema] = useState({});
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  useEffect(() => {
    if (schema && Object.keys(workingSchema).length === 0) {
      setWorkingSchema(schema);
    }
  }, [schema, workingSchema]);

  const handleFieldChange = e => {
    setWorkingSchema({
      ...workingSchema,
      [e.target.id]: e.target.value
    });
  };

  async function saveSchemaDetails() {
    try {
      const { id, ...rest } = workingSchema;
      const res = await firebase.updateDoc(`schemas/${id}`, rest);
      if (res.status === "success") {
        // This needs to redirect to the schema front page
        // Good opportunity to use new ReactRouter
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

  const fields = [
    {
      label: "Name",
      content: (
        <Input
          type="text"
          id="name"
          value={workingSchema.name}
          onChange={handleFieldChange}
        />
      )
    }
  ];

  return schemaLoading ? (
    <Loading />
  ) : (
    <div>
      <h1>Manage Schema</h1>
      <div>
        <VerticalList items={fields} />
        <Button onClick={saveSchemaDetails}>Save Details</Button>
      </div>
      <FieldsManager schemaName={schemaName} />
      <div>
        <Button onClick={() => history.push(`/${schemaName}`)}>Done</Button>
      </div>
    </div>
  );
};

export default ManageSchema;
