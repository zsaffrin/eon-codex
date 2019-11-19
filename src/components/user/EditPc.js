import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";

import { FirebaseContext, UserContext } from "../../contexts";
import { useCollection, useDocument } from "../../hooks/firestoreHooks";
import { sortBy } from "../../utils/dataUtils";
import { Button, Input, Loading, Page, VerticalList } from "../ui";

const availableFields = ["name", "bio"];

const EditPc = () => {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const { user, userLoaded } = useContext(UserContext);
  const { pcId } = useParams();
  const [fields, fieldsLoading] = useCollection("schemaFields", [
    "schema",
    "==",
    "playerCharacters"
  ]);
  const [pc, pcLoading, pcError] = useDocument(`playerCharacters/${pcId}`);
  const [workingPc, setWorkingPc] = useState(null);

  useEffect(() => {
    if (!pcLoading && pc && !workingPc) {
      setWorkingPc(pc);
    }
  }, [pc, pcLoading, workingPc]);

  const handleFieldChange = e => {
    if (e.isDate) {
      setWorkingPc({
        ...workingPc,
        [e.id]: e.value
      });
    } else if (e.type === "checkbox") {
      setWorkingPc({
        ...workingPc,
        [e.target.id]: e.target.checked
      });
    } else if (e.isMultiselect) {
      setWorkingPc({
        ...workingPc,
        [e.fieldId]: e.value
      });
    } else {
      setWorkingPc({
        ...workingPc,
        [e.target.id]:
          e.target.type === "number" ? Number(e.target.value) : e.target.value
      });
    }
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const { id, ...rest } = workingPc;
      const res = await firebase.updateDoc(`playerCharacters/${pc.id}`, rest);
      if (res.status === "success") {
        history.push(`/user`);
      }
      if (res.status === "error") {
        console.error(res);
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (!userLoaded || !workingPc || fieldsLoading) {
    return <Loading />;
  }

  if (workingPc.player != user.uid) {
    return <Redirect to="/user" />;
  }

  const filteredFields = fields.filter(({ key }) =>
    availableFields.includes(key)
  );

  return (
    <Page>
      <h1>Edit PC</h1>
      <VerticalList
        items={sortBy(filteredFields, "order").map(
          ({ key, name, type, lookup }) => ({
            label: name,
            content: (
              <Input
                type={type}
                id={key}
                lookup={lookup}
                value={workingPc[key]}
                onChange={handleFieldChange}
              />
            )
          })
        )}
      />
      <VerticalList
        items={[
          {
            label: "",
            content: (
              <div>
                <Button small primary onClick={handleFormSubmit}>
                  Save Changes
                </Button>
                <Button small onClick={() => history.push(`/user`)}>
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

export default EditPc;
