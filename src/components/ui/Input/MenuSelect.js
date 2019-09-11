import React from "react";
import { string } from "prop-types";

import { useDocument } from "../../../hooks/firestoreHooks";
import Loading from "../Loading";
import SelectInput from "./SelectInput";

const MenuSelect = ({ menuName, ...rest }) => {
  const [menu, menuLoading] = useDocument(`menus/${menuName}`);

  const choices = menu
    ? menu.options.map(({ key, label }) => ({ id: key, name: label }))
    : [];

  return menuLoading ? (
    <Loading />
  ) : (
    <SelectInput choices={choices} {...rest} />
  );
};
MenuSelect.propTypes = {
  menuName: string
};
MenuSelect.defaultProps = {
  menuName: " "
};

export default MenuSelect;
