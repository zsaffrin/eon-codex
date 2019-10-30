import React, { useContext } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Firebase context provider
import { FirebaseContext } from "../../contexts/firebaseContext";

// UI Components
import { Loading } from "../ui";

// Page Components
import Header from "../Header";

// Routes
import AppRoutes from "./routes";

// Themes
import { defaultTheme } from "../../themes";

const GlobalStyle = createGlobalStyle`
  html {box-sizing: border-box;}
  *, *:before, *:after { box-sizing: inherit; }
`;

const AppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
`;

const App = () => {
  const firebase = useContext(FirebaseContext);

  return !firebase ? (
    <Loading />
  ) : (
    <ThemeProvider theme={defaultTheme}>
      <AppLayout>
        <GlobalStyle />
        <Router>
          <Route path="*" component={Header} />

          <AppRoutes />
        </Router>
      </AppLayout>
    </ThemeProvider>
  );
};

export default App;
