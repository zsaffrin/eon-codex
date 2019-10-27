import React from "react";
import styled from "styled-components";

const StyledPage = styled.div`
  background: url("https://res.cloudinary.com/dbg0v7696/image/upload/v1572134405/eon-codex/Hive_Primus_exterior.png");
  background-size: cover;
  color: #fff;
`;

const InternalHome = () => {
  return <StyledPage>Eon Codex</StyledPage>;
};

export default InternalHome;
