import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "state/store";
import theme from "utils/theme";
import { ChildrenProp } from "utils/childrenProp";
import { HubMiddleware } from "components/HubMiddleware";

const Middlewares: React.FC<ChildrenProp> = ({ children }) => {
  return (
    <Provider store={store}>
      <HubMiddleware>
        <ThemeProvider theme={theme}>
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
      </HubMiddleware>
    </Provider>
  );
};

export default Middlewares;
