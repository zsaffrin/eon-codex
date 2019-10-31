import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLinks = styled.div`
  font-size: 0.85em;

  & > *:not(:last-child):after {
    content: ">";
    display: inline-block;
    margin: 0 0.25em;
  }
`;

const Breadcrumb = ({ links }) => {
  return (
    <StyledLinks>
      {links.map(({ label, target }) => (
        <Link to={target} key={label}>
          {label}
        </Link>
      ))}
    </StyledLinks>
  );
};

export default Breadcrumb;
