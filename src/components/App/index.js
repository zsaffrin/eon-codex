import React, { useContext } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCog, faUser } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// Firebase context provider
import { FirebaseContext, UserContext } from "../../contexts";

// UI Components
import { Loading } from "../ui";

// Page Components
import Header from "../Header";
import Footer from "../Footer";

// Routes
import AppRoutes from "./routes";

// Themes
import { defaultTheme } from "../../themes";

// Set FontAwesome library
library.add(faCog, faUser, faGithub);

const GlobalStyle = createGlobalStyle(({ theme }) => {
  const { color, text } = theme;
  return `
    html { background: ${color.background}; }
    *, *:before, *:after { box-sizing: inherit; }
    
    body {      
      box-sizing: border-box;
      color: ${text.color};
    }
  `;
});

const AppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
`;
const ContentWrap = styled.div`
  min-height: calc(100vh - 1em);
  display: grid;
  grid-template-rows: auto 1fr;
`;

const App = () => {
  const firebase = useContext(FirebaseContext);
  const { userLoaded } = useContext(UserContext);

  return !firebase || !userLoaded ? (
    <Loading />
  ) : (
    <ThemeProvider theme={defaultTheme}>
      <AppLayout>
        <GlobalStyle />
        <Router>
          <ContentWrap>
            <Route path="*" component={Header} />
            <AppRoutes />
          </ContentWrap>

          <Route path="*" component={Footer} />
        </Router>
      </AppLayout>
    </ThemeProvider>
  );
};

export default App;
