import React, { useEffect } from "react";
import { Stack, CircularProgress } from "@mui/material";
import GlobalStyles from "@mui/material/GlobalStyles";
import { Outlet } from "react-router";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import Header from "components/Header";
import {
  selectIsSignedIn,
  selectLayoutFetchStatus,
  refreshTokenSignIn,
} from "state/auth";
import { RequestStatus } from "state/shared/requestStatus";

const Layout: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSignedIn = useAppSelector(selectIsSignedIn);
  const status = useAppSelector(selectLayoutFetchStatus);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(refreshTokenSignIn());
    }
  }, []);

  return (
    <>
      <GlobalStyles
        styles={(theme) => ({
          html: { height: "100%" },
          body: { height: "100%", overflowX: "hidden" },
          "*": { boxSizing: "border-box" },
        })}
      />
      <Stack
        display="grid"
        height="100%"
        direction="column"
        justifyContent="strech"
        alignItems="stretch"
        sx={{
          gridTemplateRows: "auto 1fr auto",
        }}
      >
        <Header />
        {status === RequestStatus.Requesting ||
        status === RequestStatus.Idle ? (
          <CircularProgress
            sx={{
              margin: "auto",
            }}
          />
        ) : (
          <Outlet />
        )}
      </Stack>
    </>
  );
};

export default Layout;
