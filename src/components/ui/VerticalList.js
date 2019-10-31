import React, { Fragment } from "react";
import { arrayOf, shape } from "prop-types";
import styled from "styled-components";

const List = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 3fr;
  grid-gap: 1em;
  max-width: 48em;
`;
const Label = styled.label`
  font-weight: bold;
  text-align: right;
`;

const VerticalList = ({ items }) => {
  return (
    <List>
      {items.map(({ label, content }) => (
        <Fragment key={label}>
          <Label>{label}</Label>
          <div>{content}</div>
        </Fragment>
      ))}
    </List>
  );
};
VerticalList.propTypes = {
  items: arrayOf(shape({}))
};
VerticalList.defaultProps = {
  items: []
};

export default VerticalList;
