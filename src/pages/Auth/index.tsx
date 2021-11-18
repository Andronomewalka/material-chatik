import { Box, Typography } from "@mui/material";
import { useAppDispatch } from "hooks/useAppDispatch";
import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { changeError } from "state/auth";

const Auth: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const bottomLink = {
    to: location.pathname.includes("sign-in")
      ? "/auth/sign-up"
      : "/auth/sign-in",
    title: location.pathname.includes("sign-in") ? "Sign Up" : "Sign In",
  };

  useEffect(() => {
    dispatch(changeError(""));
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Box
        sx={{
          flex: "0.5 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="h2" component="h2">
          Welcome to CHATIK
        </Typography>
        <Typography component="h4">Please authorize yourself</Typography>
      </Box>
      <Outlet />
      <Box
        sx={{
          textAlign: "center",
          marginBottom: "15px",
        }}
      >
        <Link to={bottomLink.to}>{bottomLink.title}</Link>
      </Box>
    </Box>
  );
};

export default Auth;
