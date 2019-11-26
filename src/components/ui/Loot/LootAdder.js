import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { FirebaseContext } from "../../../contexts";
import { sortBy } from "../../../utils/dataUtils";
import { useSchemaFields } from "../../../hooks/firestoreHooks";
import { Button, Input, Loading, VerticalList } from "../../ui";

const PaddedDiv = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    padding: ${space.md};
  `;
});
const ButtonRow = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-template-columns: repeat(2, auto) 1fr;
    grid-gap: ${space.sm};
    padding: ${space.md} 0;
  `;
});

const LootAdder = () => {
  const { sessionId } = useParams();
  const [fields, fieldsLoading] = useSchemaFields("loot");
  const [active, setActive] = useState(false);
  const [newItem, setNewItem] = useState(null);
  const firebase = useContext(FirebaseContext);

  const filteredFields = !fieldsLoading
    ? fields.reduce(
        (acc, field) => (field.key === "session" ? acc : [...acc, field]),
        []
      )
    : null;

  const itemTemplate = filteredFields
    ? filteredFields.reduce((acc, field) => ({ ...acc, [field.key]: "" }), {
        session: sessionId
      })
    : null;

  useEffect(() => {
    if (itemTemplate && !newItem) {
      setNewItem(itemTemplate);
    }
  }, [itemTemplate, newItem]);

  const handleCancel = () => {
    setActive(false);
    setNewItem(itemTemplate);
  };

  const handleFieldChange = e => {
    setNewItem({
      ...newItem,
      [e.target.id]: e.target.value
    });
  };

  async function handleAddItem() {
    try {
      const res = await firebase.addDoc("loot", newItem);
      if (res.status === "success") {
        setActive(false);
        setNewItem(itemTemplate);
      }
      if (res.status === "error") {
        console.error(res);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <PaddedDiv>
      {active ? (
        <>
          <PaddedDiv>
            {!filteredFields ? (
              <Loading />
            ) : (
              <>
                <VerticalList
                  items={sortBy(filteredFields, "order").map(
                    ({ key, name, type, lookup }) => ({
                      label: name,
                      content: (
                        <Input
                          type={type}
                          id={key}
                          lookup={lookup}
                          value={newItem[key]}
                          onChange={handleFieldChange}
                          key={key}
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
                        <ButtonRow>
                          <Button primary small onClick={handleAddItem}>
                            Add Item
                          </Button>
                          <Button small onClick={handleCancel}>
                            Cancel
                          </Button>
                          <div />
                        </ButtonRow>
                      )
                    }
                  ]}
                />
              </>
            )}
          </PaddedDiv>
        </>
      ) : (
        <Button small onClick={() => setActive(true)}>
          Add
        </Button>
      )}
    </PaddedDiv>
  );
};

export default LootAdder;
