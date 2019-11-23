import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";

import { FirebaseContext, UserContext } from "../../contexts";
import { useCollection, useDocument } from "../../hooks/firestoreHooks";
import { sortBy } from "../../utils/dataUtils";
import { Button, Input, Loading, Page, VerticalList } from "../ui";

const availableFields = ["name", "bio"];

const EditPc = ({ addNew }) => {
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
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (addNew) {
      if (!fieldsLoading && userLoaded && !workingPc) {
        setWorkingPc(
          fields.reduce((acc, field) => {
            let defaultValue = "";
            if (field.type === "number") {
              defaultValue = 0;
            }
            if (field.type === "boolean") {
              defaultValue = false;
            }
            if (field.type === "multiselect") {
              defaultValue = [];
            }
            if (field.key === "player") {
              defaultValue = user.uid;
            }

            return {
              ...acc,
              [field.key]: defaultValue
            };
          }, {})
        );
      }
    } else if (!pcLoading && pc && !workingPc) {
      setWorkingPc(pc);
    }
  }, [
    addNew,
    fields,
    fieldsLoading,
    pc,
    pcLoading,
    workingPc,
    user,
    userLoaded
  ]);

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
      const res = addNew
        ? await firebase.addDoc("playerCharacters", rest)
        : await firebase.updateDoc(`playerCharacters/${pc.id}`, rest);
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

  async function deletePc() {
    try {
      const res = await firebase.deleteDoc(`playerCharacters/${pc.id}`);
      if (res.status === "success") {
        history.push("/user");
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

  if (!addNew && workingPc.player !== user.uid) {
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
            content: confirmDelete ? (
              <div>
                <div>
                  Are you sure you want to Delete this PC? This is permanent!
                </div>
                <div>
                  <Button small onClick={() => setConfirmDelete(false)}>
                    No, never mind
                  </Button>
                  <Button small danger onClick={deletePc}>
                    Yes, Delete
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <Button small primary onClick={handleFormSubmit}>
                  {addNew ? "Add PC" : "Save Changes"}
                </Button>
                <Button small onClick={() => history.push(`/user`)}>
                  Cancel
                </Button>
                <Button small danger onClick={() => setConfirmDelete(true)}>
                  Delete
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
