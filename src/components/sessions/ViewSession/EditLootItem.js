import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { FirebaseContext } from "../../../contexts";

import { useDocument, useSchemaFields } from "../../../hooks/firestoreHooks";
import { sortBy } from "../../../utils/dataUtils";
import { Button, Input, Loading, Page, VerticalList } from "../../ui";

export const EditLootItem = () => {
  const { recordId } = useParams();
  const history = useHistory();
  const [record, recordLoading] = useDocument(`loot/${recordId}`);
  const [workingRecord, setWorkingRecord] = useState(null);
  const [fields, fieldsLoading] = useSchemaFields("loot");
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
      const res = await firebase.updateDoc(`loot/${id}`, rest);
      if (res.status === "success") {
        history.push(`/sessions/${record.session}`);
      }
      if (res.status === "error") {
        console.error(res);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return !workingRecord || fieldsLoading ? (
    <Loading />
  ) : (
    <Page>
      <h1>Edit Loot Item</h1>
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
                  onClick={() => history.push(`/sessions/${record.session}`)}
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

export default EditLootItem;
