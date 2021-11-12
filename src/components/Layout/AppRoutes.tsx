import React from "react";
import { Route, Routes } from "react-router";
import { selectIsSignedIn } from "state/auth/selectors";
import Chat from "pages/Chat";
import { useAppSelector } from "hooks/useAppSelector";
import Auth from "pages/Auth";
import Layout from "./Layout";
import SignIn from "components/Auth/SignIn";
import SignUp from "components/Auth/SignUp";
import { Navigate } from "react-router-dom";

const AppRoutes: React.FC = () => {
  const isSignedIn = useAppSelector(selectIsSignedIn);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<Navigate to={`${isSignedIn ? "chat" : "auth"}`} />}
        />
        <Route
          path="chat"
          element={
            isSignedIn ? <Chat /> : <Navigate to="auth" replace={true} />
          }
        />
        <Route path="auth/" element={<Auth />}>
          <Route index element={<Navigate to="sign-in" />} />
          <Route
            path="sign-in"
            element={
              !isSignedIn ? <SignIn /> : <Navigate to="/" replace={true} />
            }
          />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        <Route path="*" element={<span>404 not found</span>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
