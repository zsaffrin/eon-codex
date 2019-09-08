import React, { useContext, useState } from "react";

import { useCollection } from "../../hooks/firestoreHooks";
import { Loading } from "../ui";

const Input = ({ id, lookup, value, onChange, ...rest }) => {
  const [choices, choicesLoading] = useCollection(lookup || " ");

  if (lookup) {
    return choicesLoading ? (
      <Loading />
    ) : (
      <select id={id} value={value} onChange={onChange}>
        <option value=""></option>
        {choices &&
          choices.map(choice => (
            <option value={choice.id} key={choice.id}>
              {choice.name}
            </option>
          ))}
      </select>
    );
  }

  return <input id={id} value={value} onChange={onChange} {...rest} />;
};

export default Input;
