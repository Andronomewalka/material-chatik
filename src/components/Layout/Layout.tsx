import React from "react";
import { Box, Stack } from "@mui/material";
import GlobalStyles from "@mui/material/GlobalStyles";
import { Outlet } from "react-router";
import Header from "components/Header";

const Layout: React.FC = () => {
  return (
    <>
      <GlobalStyles
        styles={(theme) => ({
          html: { height: "100%" },
          body: { height: "100%", overflow: "hidden" },
          "*": { boxSizing: "border-box" },
        })}
      />
      <Stack
        height="100%"
        direction="column"
        justifyContent="strech"
        alignItems="stretch"
      >
        <Header />
        <Box component="main" sx={{ flexGrow: 1, height: "1px" }}>
          <Outlet />
        </Box>
      </Stack>
    </>
  );
};

export default Layout;
