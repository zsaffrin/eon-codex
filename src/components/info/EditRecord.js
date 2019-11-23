import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { FirebaseContext } from "../../contexts/firebaseContext";

import {
  useCollection,
  useDocument,
  useSchema
} from "../../hooks/firestoreHooks";
import { sortBy } from "../../utils/dataUtils";
import { Button, Input, Loading, Page, VerticalList } from "../ui";

export const EditRecord = ({ addNew }) => {
  const { categoryId, recordId } = useParams();
  const history = useHistory();
  const [record, recordLoading] = useDocument(`${categoryId}/${recordId}`);
  const [workingRecord, setWorkingRecord] = useState(null);
  const [schema, schemaLoading] = useSchema(categoryId);
  const [fields, fieldsLoading] = useCollection("schemaFields", [
    "schema",
    "==",
    categoryId
  ]);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    if (!recordLoading && record && !workingRecord) {
      setWorkingRecord(record);
    }
  }, [record, recordLoading, workingRecord]);

  const handleFieldChange = e => {
    if (e.isDate) {
      setWorkingRecord({
        ...workingRecord,
        [e.id]: e.value
      });
    } else if (e.type === "checkbox") {
      setWorkingRecord({
        ...workingRecord,
        [e.target.id]: e.target.checked
      });
    } else if (e.isMultiselect) {
      setWorkingRecord({
        ...workingRecord,
        [e.fieldId]: e.value
      });
    } else {
      setWorkingRecord({
        ...workingRecord,
        [e.target.id]:
          e.target.type === "number" ? Number(e.target.value) : e.target.value
      });
    }
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const { id, ...rest } = workingRecord;
      const res = addNew
        ? await firebase.addDoc(categoryId, rest)
        : await firebase.updateDoc(`${categoryId}/${record.id}`, rest);
      if (res.status === "success") {
        history.push(`/info/${categoryId}/${recordId}`);
      }
      if (res.status === "error") {
        console.error(res);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return !workingRecord || fieldsLoading || schemaLoading ? (
    <Loading />
  ) : (
    <Page>
      <h1>{`Edit ${schema.name} Record`}</h1>
      <form onSubmit={handleFormSubmit}>
        <VerticalList
          items={sortBy(fields, "order").map(({ key, name, type, lookup }) => ({
            label: name,
            content: (
              <Input
                type={type}
                id={key}
                lookup={lookup}
                value={workingRecord[key]}
                onChange={handleFieldChange}
              />
            )
          }))}
        />
      </form>
      <VerticalList
        items={[
          {
            label: "",
            content: (
              <div>
                <Button small primary onClick={handleFormSubmit}>
                  Save Changes
                </Button>
                <Button
                  small
                  onClick={() =>
                    history.push(`/info/${categoryId}/${recordId}`)
                  }
                >
                  Cancel
                </Button>
              </div>
            )
          }
        ]}
      />
    </Page>
  );
};
