import { Box, Container, Typography } from "@mui/material";
import BoxContainer from "components/Common/BoxContainer";
import React from "react";
import { Outlet } from "react-router-dom";

const Auth: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        gridTemplateRows: "0.4fr 1fr",
      }}
    >
      <BoxContainer
        sx={{
          justifyContent: "end",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="h2" component="h2">
          Welcome to CHATIK
        </Typography>
        <Typography component="h4">Please authorize yourself</Typography>
      </BoxContainer>
      <Outlet />
    </Box>
  );
};

export default Auth;
