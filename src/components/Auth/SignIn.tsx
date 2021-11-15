import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { useAppDispatch } from "hooks/useAppDispatch";
import {
  changeError,
  selectError,
  selectFetchStatus,
  signIn,
} from "state/auth";
import { RequestStatus } from "state/shared/requestStatus";
import { useAppSelector } from "hooks/useAppSelector";
import { SignInFormValues } from "./types";
import { useInputsNavigation } from "hooks/useInputsNavigation";
import { Link } from "react-router-dom";

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const wrapperRef = useRef(null);
  const status = useAppSelector(selectFetchStatus);
  const error = useAppSelector(selectError);
  const [isPasswordRevealed, setIsPasswordRevealed] = useState(false);
  useInputsNavigation(wrapperRef);

  const onSubmit = (
    data: SignInFormValues,
    { setSubmitting }: FormikHelpers<SignInFormValues>
  ) => {
    setSubmitting(true);
    dispatch(signIn(data)).then(() => setSubmitting(false));
  };

  const onShowPasswordClick = () => {
    setIsPasswordRevealed(!isPasswordRevealed);
  };

  const onFormChanged = (e: any) => {
    if (error) {
      dispatch(changeError(""));
    }
  };

  return (
    <Box>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form onChange={onFormChanged}>
            <Box
              ref={wrapperRef}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "strech",
                gap: "30px",
                width: "450px",
                padding: "40px 60px",
                margin: "0 auto 50px",
              }}
            >
              <Field
                name="email"
                type="input"
                required
                InputLabelProps={{ required: false }}
                disabled={isSubmitting}
                as={TextField}
                label="Email"
                variant="outlined"
              />
              <Field
                name="password"
                type={isPasswordRevealed ? "input" : "password"}
                required
                InputLabelProps={{ required: false }}
                disabled={isSubmitting}
                as={TextField}
                label="Password"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={onShowPasswordClick}
                      >
                        {isPasswordRevealed ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
              <Box height="54px">
                {isSubmitting && <LinearProgress />}
                {status !== RequestStatus.Requesting && error && (
                  <Typography
                    variant="body1"
                    component="p"
                    color="error"
                    textAlign="center"
                  >
                    {error}
                  </Typography>
                )}
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Link to="/auth/sign-up">Sign Up</Link>
      </Box>
    </Box>
  );
};

export default SignIn;
