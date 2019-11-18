import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledPage = styled.div`
  background-image: url("https://res.cloudinary.com/dbg0v7696/image/upload/f_auto,q_auto/v1572134405/eon-codex/Hive_Primus_exterior.png");
  background-position: top right;
  background-size: cover;
  display: grid;
  align-items: center;
  justify-items: center;
`;
const LoginPanel = styled.div`
  background: #ccc;
  border-radius: 0.5em;
  padding: 1em;
`;

const ExternalHome = () => {
  return (
    <StyledPage>
      <LoginPanel>
        <Link to="/login">Log In To Explore</Link>
      </LoginPanel>
    </StyledPage>
  );
};

export default ExternalHome;
